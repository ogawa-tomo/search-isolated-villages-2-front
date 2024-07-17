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

export const mockVillageFortune = async () => {
  const village: Village = {
    pref: '北海道',
    city: '稚内市',
    district: '稚内',
    population: 20,
    urban_point: 100,
    google_map_url: 'https://hogehoge.com',
    mesh_map_path: '/hogehoge',
  };
  const request: IWireMockRequest = {
    method: 'GET',
    endpoint: `/api/fortune/result`,
  };
  const mockedResponse: IWireMockResponse = {
    status: 200,
    body: village,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  };
  await mock.register(request, mockedResponse);
};
