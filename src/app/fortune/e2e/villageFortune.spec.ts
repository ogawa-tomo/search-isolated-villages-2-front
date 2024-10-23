import { test, expect } from "@playwright/test";

test("秘境集落占い", async ({ page }) => {
  await page.goto("/fortune");
  await expect(
    page.getByRole("heading", { name: "秘境集落占い" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "占う" }).click();
  await expect(page.getByText(`北海道 稚内市 稚内`)).toBeVisible();
});
