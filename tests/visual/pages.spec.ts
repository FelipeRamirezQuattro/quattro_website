import { test, expect } from "@playwright/test";
import { settle } from "./utils";
import { routes } from "./routes";

for (const route of routes) {
  test(`${route.name} matches baseline`, async ({ page }) => {
    await page.goto(route.path);
    await settle(page);
    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      fullPage: true,
      animations: "disabled",
    });
  });
}
