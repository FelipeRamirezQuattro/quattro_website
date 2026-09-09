import mysql from "mysql2/promise";
import { randomUUID } from "crypto";
import type { BlogPost, Lead } from "@/types";

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

export const pool =
  dbHost && dbUser && dbName
    ? mysql.createPool({
        host: dbHost,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        user: dbUser,
        password: dbPassword,
        database: dbName,
        ssl: process.env.DB_SSL === "true" ? {} : undefined,
        charset: "utf8mb4",
        waitForConnections: true,
        connectionLimit: 10,
      })
    : null;

const ER_DUP_ENTRY = "ER_DUP_ENTRY";

export async function getPublishedBlogPosts(opts: {
  limit: number;
  category?: string | null;
}): Promise<Partial<BlogPost>[]> {
  if (!pool) return [];

  const params: unknown[] = [];
  let sql =
    "SELECT id, title, slug, excerpt, cover_image, category, tags, author, published_at " +
    "FROM blog_posts WHERE published = 1";

  if (opts.category) {
    sql += " AND category = ?";
    params.push(opts.category);
  }

  sql += " ORDER BY published_at DESC LIMIT ?";
  params.push(opts.limit);

  const [rows] = await pool.query(sql, params);
  return (rows as Record<string, unknown>[]).map(rowToBlogPost);
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  if (!pool) return null;

  const [rows] = await pool.query(
    "SELECT * FROM blog_posts WHERE slug = ? AND published = 1 LIMIT 1",
    [slug],
  );
  const row = (rows as Record<string, unknown>[])[0];
  return row ? (rowToBlogPost(row) as BlogPost) : null;
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  if (!pool) return [];

  const [rows] = await pool.query(
    "SELECT slug FROM blog_posts WHERE published = 1",
  );
  return (rows as { slug: string }[]).map((row) => row.slug);
}

function rowToBlogPost(row: Record<string, unknown>): Partial<BlogPost> {
  return {
    ...row,
    tags: typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags,
    published: row.published === undefined ? undefined : Boolean(row.published),
  } as Partial<BlogPost>;
}

export async function insertLead(
  lead: Omit<Lead, "id" | "created_at">,
): Promise<void> {
  if (!pool) throw new Error("Database is not configured");

  await pool.query(
    "INSERT INTO leads (id, name, email, phone, company, service, message, source) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      randomUUID(),
      lead.name,
      lead.email,
      lead.phone ?? null,
      lead.company ?? null,
      lead.service ?? null,
      lead.message,
      lead.source ?? "website",
    ],
  );
}

export async function insertNewsletterSubscriber(
  email: string,
  name?: string | null,
): Promise<{ alreadySubscribed: boolean }> {
  if (!pool) throw new Error("Database is not configured");

  try {
    await pool.query(
      "INSERT INTO newsletter_subscribers (id, email, name) VALUES (?, ?, ?)",
      [randomUUID(), email, name ?? null],
    );
    return { alreadySubscribed: false };
  } catch (err) {
    if (
      err instanceof Error &&
      "code" in err &&
      (err as { code?: string }).code === ER_DUP_ENTRY
    ) {
      return { alreadySubscribed: true };
    }
    throw err;
  }
}
