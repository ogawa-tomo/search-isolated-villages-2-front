import { test, expect } from "@playwright/test";
import {
  mockHokkaido,
  mockAomori,
  mockHokkaidoError,
  mockHokkaidoEmpty,
} from "@/mocks/mockPostOffices";

test("デフォルトの郵便局検索", async ({ page }) => {
  await mockHokkaido();
  await page.goto("/post_office");
  await expect(
    page.getByRole("heading", { name: "秘境郵便局探索ツール" }),
  ).toBeVisible();

  await page.getByText("地域を選択").click();
  const option = await page.waitForSelector(':text("北海道")');
  await option.scrollIntoViewIfNeeded();
  await option.click();
  await page.getByRole("button", { name: "探索" }).click();

  for (let i = 1; i <= 20; i++) {
    await expect(
      page.getByText(`稚内郵便局${i}`, { exact: true }),
    ).toBeVisible();
  }
  await expect(page.getByText("稚内郵便局21")).not.toBeVisible();

  await page.getByLabel("次のページへ").first().click();
  for (let i = 21; i <= 40; i++) {
    await expect(
      page.getByText(`稚内郵便局${i}`, { exact: true }),
    ).toBeVisible();
  }
  await expect(page.getByText("稚内郵便局41")).not.toBeVisible();
});

test("パラメータを指定した郵便局検索", async ({ page }) => {
  await mockAomori();
  await page.goto("/post_office");
  await expect(
    page.getByRole("heading", { name: "秘境郵便局探索ツール" }),
  ).toBeVisible();

  await page.getByText("地域を選択").click();
  const option = await page.waitForSelector(':text("青森県")');
  await option.scrollIntoViewIfNeeded();
  await option.click();

  await page.getByRole("button", { name: "詳細条件" }).click();

  await page.getByRole("radio", { name: "離島を含む" }).click();
  await page
    .getByRole("textbox", { name: "キーワード絞り込み" })
    .fill("佐井村");
  await page.getByRole("button", { name: "決定" }).click();
  await page.getByRole("button", { name: "探索" }).click();

  for (let i = 1; i <= 20; i++) {
    await expect(
      page.getByText(`佐井郵便局${i}`, { exact: true }),
    ).toBeVisible();
  }
  await expect(page.getByText("佐井郵便局21")).not.toBeVisible();
});

test("郵便局の取得に失敗した場合", async ({ page }) => {
  await mockHokkaidoError();
  await page.goto("/post_office");

  await page.getByText("地域を選択").click();
  const option = await page.waitForSelector(':text("北海道")');
  await option.scrollIntoViewIfNeeded();
  await option.click();
  await page.getByRole("button", { name: "探索" }).click();

  await expect(page.getByText("郵便局の取得に失敗しました。")).toBeVisible();

  await page.getByRole("button", { name: "閉じる" }).click();
  await expect(page.getByRole("button", { name: "探索" })).toBeEnabled();
});

test("条件に合う郵便局が見つからなかった場合", async ({ page }) => {
  await mockHokkaidoEmpty();
  await page.goto("/post_office");

  await page.getByText("地域を選択").click();
  const option = await page.waitForSelector(':text("北海道")');
  await option.scrollIntoViewIfNeeded();
  await option.click();
  await page.getByRole("button", { name: "探索" }).click();

  await expect(
    page.getByText("条件に合う郵便局が見つかりませんでした。"),
  ).toBeVisible();

  await page.getByRole("button", { name: "閉じる" }).click();
  await expect(page.getByRole("button", { name: "探索" })).toBeEnabled();
});
