import type { Page } from "@playwright/test";

/**
 * Lets Framer Motion entrance animations and the JS-driven stat count-up
 * finish before a screenshot is taken, so snapshots aren't flaky.
 */
export async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);
}
