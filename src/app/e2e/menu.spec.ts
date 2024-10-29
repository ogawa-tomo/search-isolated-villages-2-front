import { test, expect } from "@playwright/test";

test("メニュー", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "秘境集落占い" }).click();
  await expect(
    page.getByRole("heading", { name: "秘境集落占い" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "このツールについて" }).click();
  await expect(
    page.getByRole("heading", { name: "このツールについて" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "秘境集落探索", exact: true }).click();
  // ロゴを画像にしたのでいったんコメントアウト
  // await expect(
  //   page.getByRole('heading', { name: '秘境集落探索ツール' })
  // ).toBeVisible();

  await expect(page.getByRole("link", { name: "郵便局" })).not.toBeVisible();
  await page.getByText("秘境施設探索").locator("visible=true").click();
  await page.getByRole("link", { name: "郵便局" }).click();
  await expect(
    page.getByRole("heading", { name: "秘境郵便局探索ツール" }),
  ).toBeVisible();
  await page.getByText("秘境施設探索").locator("visible=true").click();
  await expect(page.getByRole("link", { name: "郵便局" })).not.toBeVisible();

  await page.getByText("秘境施設占い").locator("visible=true").click();
  await page.getByRole("link", { name: "郵便局" }).click();
  await expect(
    page.getByRole("heading", { name: "秘境郵便局占い" }),
  ).toBeVisible();
  await page.getByText("秘境施設占い").locator("visible=true").click();
  await expect(page.getByRole("link", { name: "郵便局" })).not.toBeVisible();
});

test("メニュー（モバイル）", async ({ page }) => {
  page.setViewportSize({
    width: 412,
    height: 732,
  });

  await page.goto("/");

  await page.getByRole("button").nth(0).click();
  await page.getByRole("link", { name: "秘境集落占い" }).click();
  await expect(
    page.getByRole("heading", { name: "秘境集落占い" }),
  ).toBeVisible();

  await page.getByRole("button").nth(0).click();
  await page.getByRole("link", { name: "このツールについて" }).click();
  await expect(
    page.getByRole("heading", { name: "このツールについて" }),
  ).toBeVisible();

  await page.getByRole("button").nth(0).click();
  await page.getByRole("link", { name: "秘境集落探索", exact: true }).click();
  // ロゴを画像にしたのでいったんコメントアウト
  // await expect(
  //   page.getByRole('heading', { name: '秘境集落探索ツール' })
  // ).toBeVisible();

  await page.getByRole("button").nth(0).click();
  await expect(page.getByRole("link", { name: "郵便局" })).not.toBeVisible();
  await page.getByText("秘境施設探索").locator("visible=true").click();
  await page.getByRole("link", { name: "郵便局" }).click();
  await expect(
    page.getByRole("heading", { name: "秘境郵便局探索ツール" }),
  ).toBeVisible();
  await page.getByRole("button").nth(0).click();
  await page.getByText("秘境施設探索").locator("visible=true").click();
  await expect(page.getByRole("link", { name: "郵便局" })).not.toBeVisible();

  await page.getByText("秘境施設占い").locator("visible=true").click();
  await page.getByRole("link", { name: "郵便局" }).click();
  await expect(
    page.getByRole("heading", { name: "秘境郵便局占い" }),
  ).toBeVisible();
  await page.getByRole("button").nth(0).click();
  await page.getByText("秘境施設占い").locator("visible=true").click();
  await expect(page.getByRole("link", { name: "郵便局" })).not.toBeVisible();
});
