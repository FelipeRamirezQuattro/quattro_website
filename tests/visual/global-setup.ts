import type { FullConfig } from "@playwright/test";
import { routes } from "./routes";

/**
 * `next dev` compiles each route lazily on first request. Running the full
 * suite in parallel against a cold dev server causes a pile-up that blows
 * past per-test timeouts, so we hit every route once, serially, before the
 * real test run starts.
 */
export default async function globalSetup(config: FullConfig) {
  const baseURL =
    config.projects[0]?.use?.baseURL ?? "http://localhost:3100";

  for (const route of routes) {
    try {
      await fetch(`${baseURL}${route.path}`);
    } catch {
      // Will simply compile lazily during the real test if this fails.
    }
  }

  try {
    const res = await fetch(`${baseURL}/blog`);
    const html = await res.text();
    const match = html.match(/href="(\/blog\/[^"]+)"/);
    if (match) {
      await fetch(`${baseURL}${match[1]}`);
    }
  } catch {
    // Blog requires a live DB connection; ignore if unavailable (e.g. CI).
  }
}
