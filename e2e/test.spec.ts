import VillageSearchParams from '@/types/villageSearchParams';
import { test, expect } from '@playwright/test';
import villages from './villages';
import { baseUrl } from './util';

test('タイトルが表示される', async ({ page }) => {
  // const params: VillageSearchParams = {
  //   region: '北海道',
  //   population_lower_limit: '1',
  //   population_upper_limit: '10000',
  //   island_setting: '離島を含まない',
  //   key_words: '',
  //   page: '1',
  // };
  // await page.route('http://localhost:5000/api/result?', async (route) => {
  //   await route.fulfill({
  //     json: {
  //       pages: 5,
  //       per_page: 20,
  //       villages: villages,
  //     },
  //   });
  // });

  await page.goto(baseUrl);
  await expect(
    page.getByRole('heading', { name: '秘境集落探索ツール' })
  ).toBeVisible();
});
