import { test, expect } from '@playwright/test';
import {
  villagesForAomori,
  villagesForFirstPage,
  villagesForSecondPage,
} from './villages';
import {
  IWireMockRequest,
  IWireMockResponse,
  WireMock,
} from 'wiremock-captain';

test('デフォルトの集落検索', async ({ page }) => {
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

test('パラメータを指定した集落検索', async ({ page }) => {
  const wiremockEndpoint = process.env.VILLAGE_API_URL;
  const mock = new WireMock(wiremockEndpoint);

  const paramsForAomori = new URLSearchParams({
    region: '青森県',
    populationLowerLimit: '10',
    populationUpperLimit: '500',
    islandSetting: '離島を含む',
    keyWords: '佐井村',
    page: '1',
  });

  const requestForAomori: IWireMockRequest = {
    method: 'GET',
    endpoint: `/api/result?${paramsForAomori.toString()}`,
  };
  const mockedResponseForAomori: IWireMockResponse = {
    status: 200,
    body: {
      pages: 5,
      per_page: 20,
      villages: villagesForAomori,
    },
  };
  await mock.register(requestForAomori, mockedResponseForAomori);

  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: '秘境集落探索ツール' })
  ).toBeVisible();

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
  await page.getByRole('button', { name: '閉じる' }).click();
  await page.getByRole('button', { name: '探索' }).click();

  await expect(page.getByRole('heading', { name: '探索結果' })).toBeVisible();
  for (let i = 1; i <= 20; i++) {
    await expect(page.getByText(`青森県 佐井村${i} 佐井${i}`)).toBeVisible();
  }
  await expect(page.getByText('青森県 佐井村21 佐井21')).not.toBeVisible();
});
