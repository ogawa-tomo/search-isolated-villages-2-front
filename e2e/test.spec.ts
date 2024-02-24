import { test, expect } from '@playwright/test';
import { villagesForFirstPage, villagesForSecondPage } from './villages';
import {
  IWireMockRequest,
  IWireMockResponse,
  WireMock,
} from 'wiremock-captain';

test('タイトルが表示される', async ({ page }) => {
  const wiremockEndpoint = process.env.VILLAGE_API_URL;
  const mock = new WireMock(wiremockEndpoint);

  const paramsForFirstPage = new URLSearchParams({
    region: '北海道',
    populationLowerLimit: '1',
    populationUpperLimit: '10000',
    islandSetting: '離島を含まない',
    keyWords: '',
    page: '1',
  });
  const paramsForSecondPage = new URLSearchParams({
    region: '北海道',
    populationLowerLimit: '1',
    populationUpperLimit: '10000',
    islandSetting: '離島を含まない',
    keyWords: '',
    page: '2',
  });

  const requestForFirstPage: IWireMockRequest = {
    method: 'GET',
    endpoint: `/api/result?${paramsForFirstPage.toString()}`,
  };
  const mockedResponseForFirstPage: IWireMockResponse = {
    status: 200,
    body: {
      pages: 5,
      per_page: 20,
      villages: villagesForFirstPage,
    },
  };
  await mock.register(requestForFirstPage, mockedResponseForFirstPage);

  const requestForSecondPage: IWireMockRequest = {
    method: 'GET',
    endpoint: `/api/result?${paramsForSecondPage.toString()}`,
  };
  const mockedResponseForSecondPage: IWireMockResponse = {
    status: 200,
    body: {
      pages: 5,
      per_page: 20,
      villages: villagesForSecondPage,
    },
  };
  await mock.register(requestForSecondPage, mockedResponseForSecondPage);

  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: '秘境集落探索ツール' })
  ).toBeVisible();

  await page.getByRole('combobox').click();
  const option = await page.waitForSelector(':text("北海道")');
  await option.scrollIntoViewIfNeeded();
  await option.click();
  await page.getByRole('button', { name: '探索' }).click();

  await expect(page.getByRole('heading', { name: '探索結果' })).toBeVisible();
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
