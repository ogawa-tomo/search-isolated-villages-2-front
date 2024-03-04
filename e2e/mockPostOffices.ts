import type Faculty from '@/types/faculty';
import {
  IWireMockRequest,
  IWireMockResponse,
  WireMock,
} from 'wiremock-captain';

const wiremockEndpoint = process.env.NEXT_PUBLIC_VILLAGE_API_URL;
const mock = new WireMock(wiremockEndpoint);

export const mockPostOffices = async () => {
  await mockHokkaido1();
  await mockHokkaido2();
  await mockAomori();
};

const mockHokkaido1 = async () => {
  const paramsForHokkaido1 = new URLSearchParams({
    region: '北海道',
    islandSetting: '離島を含まない',
    keyWords: '',
    page: '1',
  });
  const postOfficesForHokkaido1: Faculty[] = [];
  for (let i = 1; i <= 20; i++) {
    postOfficesForHokkaido1.push({
      name: `稚内郵便局${i}`,
      pref: '北海道',
      city: `稚内市${i}`,
      district: `稚内${i}`,
      urban_point: 100,
      google_map_url: 'https://hogehoge.com',
      mesh_map_path: '/hogehoge',
    });
  }
  const requestForHokkaido1: IWireMockRequest = {
    method: 'GET',
    endpoint: `/api/post_office/result?${paramsForHokkaido1.toString()}`,
  };
  const mockedResponseForHokkaido1: IWireMockResponse = {
    status: 200,
    body: {
      pages: 5,
      per_page: 20,
      faculties: postOfficesForHokkaido1,
    },
  };
  await mock.register(requestForHokkaido1, mockedResponseForHokkaido1);
};

const mockHokkaido2 = async () => {
  const paramsForHokkaido2 = new URLSearchParams({
    region: '北海道',
    islandSetting: '離島を含まない',
    keyWords: '',
    page: '2',
  });
  const postOfficesForHokkaido2: Faculty[] = [];
  for (let i = 21; i <= 40; i++) {
    postOfficesForHokkaido2.push({
      name: `稚内郵便局${i}`,
      pref: '北海道',
      city: `稚内市${i}`,
      district: `稚内${i}`,
      urban_point: 100,
      google_map_url: 'https://hogehoge.com',
      mesh_map_path: '/hogehoge',
    });
  }
  const requestForHokkaido2: IWireMockRequest = {
    method: 'GET',
    endpoint: `/api/post_office/result?${paramsForHokkaido2.toString()}`,
  };
  const mockedResponseForHokkaido2: IWireMockResponse = {
    status: 200,
    body: {
      pages: 5,
      per_page: 20,
      faculties: postOfficesForHokkaido2,
    },
  };
  await mock.register(requestForHokkaido2, mockedResponseForHokkaido2);
};

const mockAomori = async () => {
  const postOfficesForAomori: Faculty[] = [];
  for (let i = 1; i <= 20; i++) {
    postOfficesForAomori.push({
      name: `佐井郵便局${i}`,
      pref: '青森県',
      city: `佐井村${i}`,
      district: `佐井${i}`,
      urban_point: 100,
      google_map_url: 'https://hogehoge.com',
      mesh_map_path: '/hogehoge',
    });
  }
  const paramsForAomori = new URLSearchParams({
    region: '青森県',
    islandSetting: '離島を含む',
    keyWords: '佐井村',
    page: '1',
  });
  const requestForAomori: IWireMockRequest = {
    method: 'GET',
    endpoint: `/api/post_office/result?${paramsForAomori.toString()}`,
  };
  const mockedResponseForAomori: IWireMockResponse = {
    status: 200,
    body: {
      pages: 5,
      per_page: 20,
      faculties: postOfficesForAomori,
    },
  };
  await mock.register(requestForAomori, mockedResponseForAomori);
};
