import { test, expect } from "@playwright/test";

test("秘境郵便局占い", async ({ page }) => {
  await page.goto("/fortune/post_office");
  await expect(
    page.getByRole("heading", { name: "秘境郵便局占い" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "占う" }).click();
  await expect(page.getByText("稚内郵便局")).toBeVisible();
});
