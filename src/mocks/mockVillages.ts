import type Village from "@/types/Village";
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

export const mockVillages = async () => {
  await mockHokkaido();
  await mockAomori();
};

const mockHokkaido = async () => {
  const paramsForHokkaido1 = new URLSearchParams({
    area: "hokkaido",
    populationLowerLimit: "1",
    populationUpperLimit: "10000",
    islandSetting: "exclude_islands",
    keywords: "",
  });
  const villagesForHokkaido: Village[] = [];
  for (let i = 1; i <= 40; i++) {
    villagesForHokkaido.push({
      type: "village",
      latitude: 45.0,
      longitude: 145.0,
      pref: "北海道",
      city: `稚内市${i}`,
      district: `稚内${i}`,
      population: 20,
      urban_point: 100,
      google_map_url: "https://hogehoge.com",
      mesh_map_path: "/hogehoge",
    });
  }
  const requestForHokkaido: IWireMockRequest = {
    method: "GET",
    endpoint: `/api/result?${paramsForHokkaido1.toString()}`,
  };
  const mockedResponseForHokkaido1: IWireMockResponse = {
    status: 200,
    body: {
      villages: villagesForHokkaido,
    },
  };
  await mock.register(requestForHokkaido, mockedResponseForHokkaido1);
};

const mockAomori = async () => {
  const villagesForAomori: Village[] = [];
  for (let i = 1; i <= 20; i++) {
    villagesForAomori.push({
      type: "village",
      latitude: 45.0,
      longitude: 145.0,
      pref: "青森県",
      city: `佐井村${i}`,
      district: `佐井${i}`,
      population: 20,
      urban_point: 100,
      google_map_url: "https://hogehoge.com",
      mesh_map_path: "/hogehoge",
    });
  }
  const paramsForAomori = new URLSearchParams({
    area: "aomori",
    populationLowerLimit: "10",
    populationUpperLimit: "500",
    islandSetting: "include_islands",
    keywords: "佐井村",
  });
  const requestForAomori: IWireMockRequest = {
    method: "GET",
    endpoint: `/api/result?${paramsForAomori.toString()}`,
  };
  const mockedResponseForAomori: IWireMockResponse = {
    status: 200,
    body: {
      villages: villagesForAomori,
    },
  };
  await mock.register(requestForAomori, mockedResponseForAomori);
};
