import type Faculty from "@/types/Faculty";
import {
  IWireMockRequest,
  IWireMockResponse,
  WireMock,
} from "wiremock-captain";

const wiremockEndpoint = process.env.NEXT_PUBLIC_VILLAGE_API_URL;
if (!wiremockEndpoint) {
  throw new Error("NEXT_PUBLIC_VILLAGE_API_URLが設定されていません");
}
const mock = new WireMock(wiremockEndpoint);

const paramsForHokkaido = new URLSearchParams({
  area: "hokkaido",
  islandSetting: "exclude_islands",
  keywords: "",
});

export const mockHokkaido = async () => {
  const postOfficesForHokkaido: Faculty[] = [];
  for (let i = 1; i <= 40; i++) {
    postOfficesForHokkaido.push({
      type: "faculty",
      name: `稚内郵便局${i}`,
      pref: "北海道",
      city: `稚内市${i}`,
      district: `稚内${i}`,
      latitude: 45.0,
      longitude: 145.0,
      urban_point: 100,
      google_map_url: "https://hogehoge.com",
      mesh_map_path: "/hogehoge",
    });
  }
  const requestForHokkaido: IWireMockRequest = {
    method: "GET",
    endpoint: `/api/post_office/result?${paramsForHokkaido.toString()}`,
  };
  const mockedResponseForHokkaido: IWireMockResponse = {
    status: 200,
    body: {
      faculties: postOfficesForHokkaido,
    },
  };
  await mock.register(requestForHokkaido, mockedResponseForHokkaido);
};

export const mockAomori = async () => {
  const postOfficesForAomori: Faculty[] = [];
  for (let i = 1; i <= 20; i++) {
    postOfficesForAomori.push({
      type: "faculty",
      name: `佐井郵便局${i}`,
      pref: "青森県",
      city: `佐井村${i}`,
      district: `佐井${i}`,
      latitude: 45.0,
      longitude: 145.0,
      urban_point: 100,
      google_map_url: "https://hogehoge.com",
      mesh_map_path: "/hogehoge",
    });
  }
  const paramsForAomori = new URLSearchParams({
    area: "aomori",
    islandSetting: "include_islands",
    keywords: "佐井村",
  });
  const requestForAomori: IWireMockRequest = {
    method: "GET",
    endpoint: `/api/post_office/result?${paramsForAomori.toString()}`,
  };
  const mockedResponseForAomori: IWireMockResponse = {
    status: 200,
    body: {
      faculties: postOfficesForAomori,
    },
  };
  await mock.register(requestForAomori, mockedResponseForAomori);
};

export const mockHokkaidoError = async () => {
  const requestForHokkaido: IWireMockRequest = {
    method: "GET",
    endpoint: `/api/post_office/result?${paramsForHokkaido.toString()}`,
  };
  const mockedResponseForHokkaido: IWireMockResponse = {
    status: 500,
  };
  await mock.register(requestForHokkaido, mockedResponseForHokkaido);
};

export const mockHokkaidoEmpty = async () => {
  const requestForHokkaido: IWireMockRequest = {
    method: "GET",
    endpoint: `/api/post_office/result?${paramsForHokkaido.toString()}`,
  };
  const mockedResponseForHokkaidoEmpty: IWireMockResponse = {
    status: 200,
    body: {
      faculties: [],
    },
  };
  await mock.register(requestForHokkaido, mockedResponseForHokkaidoEmpty);
};
