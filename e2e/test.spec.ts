import VillageSearchParams from '@/types/villageSearchParams';
import { test, expect } from '@playwright/test';
import villages from './villages';
import { baseUrl } from './util';
import {
  IWireMockRequest,
  IWireMockResponse,
  WireMock,
} from 'wiremock-captain';

test('タイトルが表示される', async ({ page }) => {
  const params = new URLSearchParams({
    region: '北海道',
    populationLowerLimit: '1',
    populationUpperLimit: '10000',
    islandSetting: '離島を含まない',
    keyWords: '',
    page: '1',
  });

  const wiremockEndpoint = 'http://localhost:8080';
  const mock = new WireMock(wiremockEndpoint);
  const request: IWireMockRequest = {
    method: 'GET',
    endpoint: `/api/result?${params.toString()}`,
  };
  const mockedResponse: IWireMockResponse = {
    status: 200,
    body: {
      pages: 5,
      per_page: 20,
      villages: villages,
    },
  };
  await mock.register(request, mockedResponse);

  await page.goto(baseUrl);
  await expect(
    page.getByRole('heading', { name: '秘境集落探索ツール' })
  ).toBeVisible();

  await page.getByRole('combobox').click();
  const option = await page.waitForSelector(':text("北海道")');
  await option.scrollIntoViewIfNeeded();
  await option.click();
  await page.getByRole('button', { name: '探索' }).click();

  await expect(page).toHaveURL(
    `http://localhost:3000/result?${params.toString()}`
  );

  // const title = page.getByRole('heading', { name: '探索結果' });
  // await title.waitFor();

  await expect(page.getByRole('heading', { name: '探索結果' })).toBeVisible();
  const village = page.getByText('北海道 稚内市1 稚内1');
  await village.waitFor();
  await expect(village).toBeVisible();
});
