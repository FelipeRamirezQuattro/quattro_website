import { test, expect } from "@playwright/test";
import { settle } from "./utils";

// Blog content is pulled live from the MySQL DB, which CI has no
// credentials for, so these only run in local/dev environments.
test.skip(!!process.env.CI, "Blog pages require a live DB connection not available in CI");

test("blog listing matches baseline", async ({ page }) => {
  await page.goto("/blog");
  await settle(page);
  await expect(page).toHaveScreenshot("blog-listing.png", {
    fullPage: true,
    animations: "disabled",
  });
});

test("blog post detail matches baseline", async ({ page }) => {
  await page.goto("/blog");
  await settle(page);
  await page.locator('a[href^="/blog/"]').first().click();
  await page.waitForURL(/\/blog\/.+/);
  await settle(page);
  await expect(page).toHaveScreenshot("blog-post.png", {
    fullPage: true,
    animations: "disabled",
  });
});
