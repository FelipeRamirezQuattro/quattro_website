/**
 * One-time import: WordPress blog posts -> the app's `blog_posts` MySQL table.
 *
 * Source: a MySQL database loaded from the WordPress SQL dump
 * (legacy/u773276129_quattroapps.sql). This script never reads the dump
 * file directly — load it into a throwaway MySQL database first:
 *
 *   mysql -h 127.0.0.1 -u root -e "CREATE DATABASE IF NOT EXISTS wp_source"
 *   mysql -h 127.0.0.1 -u root wp_source < legacy/u773276129_quattroapps.sql
 *
 * Target: the app's own DB_* env vars (same connection as lib/db.ts),
 * loaded from .env.local. Override the source connection with WP_DB_*
 * env vars if it isn't local root MySQL on the default port.
 *
 * Run with: npm run migrate:blog
 */
import mysql from "mysql2/promise";
import { randomUUID } from "crypto";

process.loadEnvFile?.(".env.local");

interface WpPostRow {
  ID: number;
  post_title: string;
  post_name: string;
  post_excerpt: string;
  post_content: string;
  post_date: Date;
  author_name: string | null;
  category_name: string | null;
  tag_names: string | null;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–");
}

/** Strips WPBakery/VC shortcodes and converts the remaining HTML to plain Markdown-ish text. */
function cleanContent(raw: string): string {
  let text = raw;

  // WPBakery/Visual Composer shortcode tags, e.g. [vc_row][vc_column]...[/vc_column]
  text = text.replace(/\[\/?[a-zA-Z][a-zA-Z0-9_-]*(?:\s+[^\]]*)?\]/g, "");

  // Block-level tags -> blank-line separated text
  text = text.replace(/<\/(p|div|h[1-6]|li)>/gi, "\n\n");
  text = text.replace(/<br\s*\/?>/gi, "\n");

  // Headings -> markdown headings
  text = text.replace(/<h1[^>]*>/gi, "\n\n# ");
  text = text.replace(/<h2[^>]*>/gi, "\n\n## ");
  text = text.replace(/<h3[^>]*>/gi, "\n\n### ");
  text = text.replace(/<h[4-6][^>]*>/gi, "\n\n#### ");

  // Lists -> markdown bullets
  text = text.replace(/<li[^>]*>/gi, "\n- ");

  // Emphasis
  text = text.replace(/<\/?(strong|b)[^>]*>/gi, "**");
  text = text.replace(/<\/?(em|i)[^>]*>/gi, "*");

  // Links -> markdown links
  text = text.replace(
    /<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi,
    "[$2]($1)",
  );

  // Drop anything else: images, iframes, spans, divs, scripts, styles...
  text = text.replace(/<script[\s\S]*?<\/script>/gi, "");
  text = text.replace(/<style[\s\S]*?<\/style>/gi, "");
  text = text.replace(/<[^>]+>/g, "");

  text = decodeEntities(text);

  // Collapse excess whitespace left behind by the strips above.
  text = text
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text;
}

function flagReason(content: string): string | null {
  if (content.length < 100) return "very short after cleaning";
  if (/<\/?[a-zA-Z][^>]*>/.test(content)) return "leftover HTML tags";

  // Markdown links look like [text](url) — strip those before checking for
  // stray shortcode brackets so legitimate links don't get flagged.
  const withoutMarkdownLinks = content.replace(/\[[^\]]*\]\([^)]*\)/g, "");
  if (/\[\/?[a-zA-Z_][\w-]*[\s\]]/.test(withoutMarkdownLinks)) {
    return "leftover shortcode brackets";
  }
  return null;
}

async function main() {
  const sourcePool = mysql.createPool({
    host: process.env.WP_DB_HOST || "127.0.0.1",
    port: process.env.WP_DB_PORT ? parseInt(process.env.WP_DB_PORT) : 3306,
    user: process.env.WP_DB_USER || "root",
    password: process.env.WP_DB_PASSWORD || "",
    database: process.env.WP_DB_NAME || "wp_source",
    charset: "utf8mb4",
  });

  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USER;
  const dbName = process.env.DB_NAME;
  if (!dbHost || !dbUser || !dbName) {
    throw new Error(
      "Target database is not configured — set DB_HOST/DB_USER/DB_NAME in .env.local",
    );
  }

  const targetPool = mysql.createPool({
    host: dbHost,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: dbUser,
    password: process.env.DB_PASSWORD,
    database: dbName,
    ssl: process.env.DB_SSL === "true" ? {} : undefined,
    charset: "utf8mb4",
  });

  const [rows] = await sourcePool.query<mysql.RowDataPacket[]>(
    `SELECT
       p.ID, p.post_title, p.post_name, p.post_excerpt, p.post_content, p.post_date,
       u.display_name AS author_name,
       (SELECT t.name FROM wp_term_relationships tr
          JOIN wp_term_taxonomy tt ON tt.term_taxonomy_id = tr.term_taxonomy_id
          JOIN wp_terms t ON t.term_id = tt.term_id
          WHERE tr.object_id = p.ID AND tt.taxonomy = 'category'
          LIMIT 1) AS category_name,
       (SELECT GROUP_CONCAT(t.name SEPARATOR '||') FROM wp_term_relationships tr
          JOIN wp_term_taxonomy tt ON tt.term_taxonomy_id = tr.term_taxonomy_id
          JOIN wp_terms t ON t.term_id = tt.term_id
          WHERE tr.object_id = p.ID AND tt.taxonomy = 'post_tag') AS tag_names
     FROM wp_posts p
     LEFT JOIN wp_users u ON u.ID = p.post_author
     WHERE p.post_type = 'post' AND p.post_status = 'publish'
     ORDER BY p.post_date ASC`,
  );
  const posts = rows as unknown as WpPostRow[];

  const [existingRows] = await targetPool.query<mysql.RowDataPacket[]>(
    "SELECT slug FROM blog_posts",
  );
  const existingSlugs = new Set(
    (existingRows as { slug: string }[]).map((r) => r.slug),
  );

  let migrated = 0;
  let skipped = 0;
  const flagged: { slug: string; reason: string }[] = [];

  for (const post of posts) {
    if (existingSlugs.has(post.post_name)) {
      skipped++;
      continue;
    }

    const content = cleanContent(post.post_content);
    const excerpt =
      decodeEntities(cleanContent(post.post_excerpt)) ||
      content.slice(0, 200).trim() + (content.length > 200 ? "…" : "");
    const reason = flagReason(content);
    if (reason) flagged.push({ slug: post.post_name, reason });

    const tags = post.tag_names ? post.tag_names.split("||") : null;

    await targetPool.query(
      `INSERT INTO blog_posts
         (id, title, slug, excerpt, content, category, tags, author, published, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        randomUUID(),
        decodeEntities(post.post_title),
        post.post_name,
        excerpt,
        content,
        post.category_name,
        tags ? JSON.stringify(tags) : null,
        post.author_name || "Quattro Team",
        true,
        post.post_date,
      ],
    );
    migrated++;
  }

  console.log(`\nFound ${posts.length} published WordPress posts.`);
  console.log(`Migrated: ${migrated}`);
  console.log(`Skipped (slug already exists): ${skipped}`);
  if (flagged.length > 0) {
    console.log(`\nFlagged for manual review (${flagged.length}):`);
    for (const f of flagged) console.log(`  - ${f.slug}: ${f.reason}`);
  } else {
    console.log("\nNothing flagged for manual review.");
  }

  await sourcePool.end();
  await targetPool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
