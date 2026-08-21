import { test, expect } from "@playwright/test";

const PER_PAGE = 20;

// 検索1回あたり1万件超の実データをフィルタ・シリアライズするため、
// デフォルトのアサーションタイムアウト(5秒)では不安定になる
const SEARCH_RESULT_TIMEOUT = 15000;

test("デフォルトの郵便局検索", async ({ page }) => {
  await page.goto("/post_office");
  await expect(
    page.getByRole("heading", { name: "秘境郵便局探索ツール" }),
  ).toBeVisible();

  await page.getByText("地域を選択").click();
  const option = await page.waitForSelector(':text("北海道")');
  await option.scrollIntoViewIfNeeded();
  await option.click();
  await page.getByRole("button", { name: "探索" }).click();

  const rows = page.locator("table tbody tr");
  await expect(rows).toHaveCount(PER_PAGE, { timeout: SEARCH_RESULT_TIMEOUT });
  const firstPageContents = await rows.allTextContents();

  await page.getByLabel("次のページへ").first().click();
  await expect(rows).toHaveCount(PER_PAGE, { timeout: SEARCH_RESULT_TIMEOUT });
  const secondPageContents = await rows.allTextContents();

  expect(secondPageContents).not.toEqual(firstPageContents);
});
