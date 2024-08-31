import type Village from '@/types/village';
import {
  IWireMockRequest,
  IWireMockResponse,
  WireMock,
} from 'wiremock-captain';

const wiremockEndpoint = process.env.NEXT_PUBLIC_VILLAGE_API_URL;
if (!wiremockEndpoint) {
  throw new Error('NEXT_PUBLIC_VILLAGE_API_URLが設定されていません');
}
const mock = new WireMock(wiremockEndpoint);

export const mockVillages = async () => {
  await mockHokkaido1();
  await mockHokkaido2();
  await mockAomori();
};

const mockHokkaido1 = async () => {
  const paramsForHokkaido1 = new URLSearchParams({
    region: '北海道',
    populationLowerLimit: '1',
    populationUpperLimit: '10000',
    islandSetting: '離島を含まない',
    keywords: '',
    page: '1',
  });
  const villagesForHokkaido1: Village[] = [];
  for (let i = 1; i <= 20; i++) {
    villagesForHokkaido1.push({
      pref: '北海道',
      city: `稚内市${i}`,
      district: `稚内${i}`,
      population: 20,
      urban_point: 100,
      google_map_url: 'https://hogehoge.com',
      mesh_map_path: '/hogehoge',
    });
  }
  const requestForHokkaido1: IWireMockRequest = {
    method: 'GET',
    endpoint: `/api/result?${paramsForHokkaido1.toString()}`,
  };
  const mockedResponseForHokkaido1: IWireMockResponse = {
    status: 200,
    body: {
      pages: 5,
      per_page: 20,
      villages: villagesForHokkaido1,
    },
  };
  await mock.register(requestForHokkaido1, mockedResponseForHokkaido1);
};

const mockHokkaido2 = async () => {
  const paramsForHokkaido2 = new URLSearchParams({
    region: '北海道',
    populationLowerLimit: '1',
    populationUpperLimit: '10000',
    islandSetting: '離島を含まない',
    keywords: '',
    page: '2',
  });
  const villagesForHokkaido2: Village[] = [];
  for (let i = 21; i <= 40; i++) {
    villagesForHokkaido2.push({
      pref: '北海道',
      city: `稚内市${i}`,
      district: `稚内${i}`,
      population: 20,
      urban_point: 100,
      google_map_url: 'https://hogehoge.com',
      mesh_map_path: '/hogehoge',
    });
  }
  const requestForHokkaido2: IWireMockRequest = {
    method: 'GET',
    endpoint: `/api/result?${paramsForHokkaido2.toString()}`,
  };
  const mockedResponseForHokkaido2: IWireMockResponse = {
    status: 200,
    body: {
      pages: 5,
      per_page: 20,
      villages: villagesForHokkaido2,
    },
  };
  await mock.register(requestForHokkaido2, mockedResponseForHokkaido2);
};

const mockAomori = async () => {
  const villagesForAomori: Village[] = [];
  for (let i = 1; i <= 20; i++) {
    villagesForAomori.push({
      pref: '青森県',
      city: `佐井村${i}`,
      district: `佐井${i}`,
      population: 20,
      urban_point: 100,
      google_map_url: 'https://hogehoge.com',
      mesh_map_path: '/hogehoge',
    });
  }
  const paramsForAomori = new URLSearchParams({
    region: '青森県',
    populationLowerLimit: '10',
    populationUpperLimit: '500',
    islandSetting: '離島を含む',
    keywords: '佐井村',
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
};
