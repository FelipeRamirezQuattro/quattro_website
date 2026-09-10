/**
 * One-time import: download the WordPress media library's images into
 * public/images/legacy/, then wire each migrated blog post's cover_image
 * to its WordPress featured image, if it had one.
 *
 * Source: the WP tables already imported into the Hostinger DB (same
 * connection as the app itself — DB_* env vars from .env.local).
 *
 * Run with: npm run fetch:images
 */
import mysql from "mysql2/promise";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { Readable } from "stream";
import { finished } from "stream/promises";
import path from "path";

process.loadEnvFile?.(".env.local");

const OUTPUT_DIR = path.join(process.cwd(), "public", "images", "legacy");
const CONCURRENCY = 8;

interface Attachment {
  ID: number;
  guid: string;
}

function filenameFor(guid: string, id: number, used: Set<string>): string {
  const base = decodeURIComponent(path.basename(new URL(guid).pathname))
    .toLowerCase()
    .replace(/[^a-z0-9.\-]/g, "-");
  const name = used.has(base) ? `${id}-${base}` : base;
  used.add(name);
  return name;
}

async function download(url: string, destPath: string): Promise<boolean> {
  const candidates = url.startsWith("http://")
    ? [url.replace(/^http:/, "https:"), url]
    : [url];

  for (const candidate of candidates) {
    try {
      const res = await fetch(candidate);
      if (!res.ok || !res.body) continue;
      await finished(
        Readable.fromWeb(res.body as never).pipe(createWriteStream(destPath)),
      );
      return true;
    } catch {
      // try next candidate
    }
  }
  return false;
}

async function runWithConcurrency<T>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<void>,
) {
  let index = 0;
  async function next(): Promise<void> {
    const i = index++;
    if (i >= items.length) return;
    await worker(items[i]);
    return next();
  }
  await Promise.all(Array.from({ length: limit }, () => next()));
}

async function main() {
  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USER;
  const dbName = process.env.DB_NAME;
  if (!dbHost || !dbUser || !dbName) {
    throw new Error(
      "Database is not configured — set DB_HOST/DB_USER/DB_NAME in .env.local",
    );
  }

  const pool = mysql.createPool({
    host: dbHost,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: dbUser,
    password: process.env.DB_PASSWORD,
    database: dbName,
    ssl: process.env.DB_SSL === "true" ? {} : undefined,
    charset: "utf8mb4",
  });

  await mkdir(OUTPUT_DIR, { recursive: true });

  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT ID, guid FROM wp_posts WHERE post_type='attachment' AND post_mime_type LIKE 'image/%'",
  );
  const attachments = rows as unknown as Attachment[];

  const used = new Set<string>();
  const fileById = new Map<number, string>();
  for (const a of attachments) fileById.set(a.ID, filenameFor(a.guid, a.ID, used));

  let downloaded = 0;
  const failed: { id: number; guid: string }[] = [];

  await runWithConcurrency(attachments, CONCURRENCY, async (a) => {
    const filename = fileById.get(a.ID)!;
    const dest = path.join(OUTPUT_DIR, filename);
    const ok = await download(a.guid, dest);
    if (ok) downloaded++;
    else failed.push({ id: a.ID, guid: a.guid });
  });

  console.log(`\nDownloaded ${downloaded}/${attachments.length} images into public/images/legacy/`);
  if (failed.length > 0) {
    console.log(`Failed (${failed.length}):`);
    for (const f of failed) console.log(`  - [${f.id}] ${f.guid}`);
  }

  // Wire up blog post cover images from each post's WP featured image.
  const [posts] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT ID, post_name FROM wp_posts WHERE post_type='post' AND post_status='publish'",
  );
  const [thumbMeta] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT post_id, meta_value FROM wp_postmeta WHERE meta_key='_thumbnail_id'",
  );
  const thumbByPostId = new Map<number, number>(
    (thumbMeta as { post_id: number; meta_value: string }[]).map((r) => [
      r.post_id,
      parseInt(r.meta_value),
    ]),
  );

  let covered = 0;
  for (const post of posts as { ID: number; post_name: string }[]) {
    const attachmentId = thumbByPostId.get(post.ID);
    const filename = attachmentId ? fileById.get(attachmentId) : undefined;
    if (!filename) continue;

    const [result] = await pool.query<mysql.ResultSetHeader>(
      "UPDATE blog_posts SET cover_image = ? WHERE slug = ?",
      [`/images/legacy/${filename}`, post.post_name],
    );
    if (result.affectedRows > 0) covered++;
  }
  console.log(`\nSet cover_image on ${covered} migrated blog post(s).`);

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
