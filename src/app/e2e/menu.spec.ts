import { test, expect } from "@playwright/test";

test("メニュー", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("button", { name: "close" })
    .click({ position: { x: 10, y: 10 } });

  await page.getByLabel("メニュー").click();
  await page.getByRole("link", { name: "このツールについて" }).click();
  await expect(
    page.getByRole("heading", { name: "このツールについて" }),
  ).toBeVisible();

  await page.getByLabel("メニュー").click();
  await page.getByRole("link", { name: "秘境集落探索", exact: true }).click();
  await expect(
    page.getByRole("heading").getByAltText("秘境集落探索ツール"),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "close" })
    .click({ position: { x: 10, y: 10 } });

  await page.getByLabel("メニュー").click();
  await expect(page.getByRole("link", { name: "郵便局" })).not.toBeVisible();
  await page.getByText("秘境施設探索").locator("visible=true").click();
  await page.getByRole("link", { name: "郵便局" }).click();
  await expect(
    page.getByRole("heading", { name: "秘境郵便局探索ツール" }),
  ).toBeVisible();
});
