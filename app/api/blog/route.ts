import { NextRequest, NextResponse } from "next/server";
import { getPublishedBlogPosts, pool } from "@/lib/db";

export const revalidate = 3600;

export async function GET(req: NextRequest) {
  if (!pool) {
    return NextResponse.json({ posts: [] }, { status: 200 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
  const category = searchParams.get("category");

  try {
    const posts = await getPublishedBlogPosts({ limit, category });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("[blog API]", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
