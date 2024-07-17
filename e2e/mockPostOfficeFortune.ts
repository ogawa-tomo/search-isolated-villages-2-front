import Faculty from '@/types/faculty';
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

export const mockPostOfficeFortune = async () => {
  const postOffice: Faculty = {
    name: '稚内郵便局',
    pref: '北海道',
    city: '稚内市',
    district: '稚内地区',
    urban_point: 100,
    google_map_url: 'https://hogehoge.com',
    mesh_map_path: '/hogehoge',
  };
  const request: IWireMockRequest = {
    method: 'GET',
    endpoint: `/api/fortune/post_office/result`,
  };
  const mockedResponse: IWireMockResponse = {
    status: 200,
    body: postOffice,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  };
  await mock.register(request, mockedResponse);
};
