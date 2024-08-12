import { test, expect } from '@playwright/test';

test('デフォルトの集落検索', async ({ page }) => {
  await page.goto('/');
  // ロゴを画像にしたのでいったんコメントアウト
  // await expect(
  //   page.getByRole('heading', { name: '秘境集落探索ツール' })
  // ).toBeVisible();

  await page.getByRole('combobox').click();
  const option = await page.waitForSelector(':text("北海道")');
  await option.scrollIntoViewIfNeeded();
  await option.click();
  await page.getByRole('button', { name: '探索' }).click();

  for (let i = 1; i <= 20; i++) {
    await expect(page.getByText(`北海道 稚内市${i} 稚内${i}`)).toBeVisible();
  }
  await expect(page.getByText('北海道 稚内市21 稚内21')).not.toBeVisible();

  await page.getByRole('link', { name: '2' }).click();
  for (let i = 21; i <= 40; i++) {
    await expect(page.getByText(`北海道 稚内市${i} 稚内${i}`)).toBeVisible();
  }
  await expect(page.getByText('北海道 稚内市41 稚内41')).not.toBeVisible();
});

test('パラメータを指定した集落検索', async ({ page }) => {
  await page.goto('/');
  // ロゴを画像にしたのでいったんコメントアウト
  // await expect(
  //   page.getByRole('heading', { name: '秘境集落探索ツール' })
  // ).toBeVisible();

  await page.getByRole('combobox').click();
  const option = await page.waitForSelector(':text("青森県")');
  await option.scrollIntoViewIfNeeded();
  await option.click();

  await page.getByRole('button', { name: '詳細条件' }).click();

  await page.getByRole('spinbutton', { name: '最小：' }).fill('10');
  await page.getByRole('spinbutton', { name: '最大：' }).fill('500');
  await page.getByRole('radio', { name: '離島を含む' }).click();
  await page
    .getByRole('textbox', { name: 'キーワード絞り込み' })
    .fill('佐井村');
  await page.locator('body').click({ position: { x: 0, y: 0 } });
  await page.getByRole('button', { name: '探索' }).click();

  for (let i = 1; i <= 20; i++) {
    await expect(page.getByText(`青森県 佐井村${i} 佐井${i}`)).toBeVisible();
  }
  await expect(page.getByText('青森県 佐井村21 佐井21')).not.toBeVisible();
});
