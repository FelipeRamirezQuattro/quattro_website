import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;

export async function GET(req: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ posts: [] }, { status: 200 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
  const category = searchParams.get("category");

  let query = supabase
    .from("blog_posts")
    .select(
      "id, title, slug, excerpt, cover_image, category, tags, author, published_at",
    )
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (category) query = query.eq("category", category);

  const { data, error } = await query;

  if (error) {
    console.error("[blog API]", error.message);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }

  return NextResponse.json({ posts: data ?? [] }, { status: 200 });
}
