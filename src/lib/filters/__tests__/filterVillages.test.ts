import { filterVillages } from "@/lib/filters/filterVillages";
import VillageRecord from "@/types/VillageRecord";

const buildVillage = (
  override: Partial<VillageRecord> = {},
): VillageRecord => ({
  pref: "東京都",
  city: "小笠原村",
  district: "南鳥島",
  latitude: 24.29,
  longitude: 153.97,
  population: 9,
  size: 1,
  urbanPoint: 25.99,
  isIsland: true,
  ...override,
});

const baseCriteria = {
  area: "all_country" as const,
  islandSetting: "include_islands" as const,
  keywords: "",
  populationLowerLimit: 0,
  populationUpperLimit: 10000,
};

describe("filterVillages", () => {
  it("人口が範囲内(下限・上限を含む)の集落のみ抽出する", () => {
    const villages = [
      buildVillage({ population: 9 }),
      buildVillage({ population: 100 }),
      buildVillage({ population: 200 }),
    ];

    const result = filterVillages(villages, {
      ...baseCriteria,
      populationLowerLimit: 9,
      populationUpperLimit: 100,
    });

    expect(result.map((v) => v.population)).toEqual([9, 100]);
  });

  it("人口が範囲外の集落を除外する", () => {
    const villages = [
      buildVillage({ population: 8 }),
      buildVillage({ population: 101 }),
    ];

    const result = filterVillages(villages, {
      ...baseCriteria,
      populationLowerLimit: 9,
      populationUpperLimit: 100,
    });

    expect(result).toEqual([]);
  });

  it("都道府県が一致する集落のみ抽出する", () => {
    const tokyo = buildVillage({ pref: "東京都" });
    const okinawa = buildVillage({ pref: "沖縄県" });

    const result = filterVillages([tokyo, okinawa], {
      ...baseCriteria,
      area: "tokyo",
    });

    expect(result).toEqual([tokyo]);
  });

  it("エリア(地域)が一致する集落のみ抽出する", () => {
    const kanagawa = buildVillage({ pref: "神奈川県" });
    const okinawa = buildVillage({ pref: "沖縄県" });

    const result = filterVillages([kanagawa, okinawa], {
      ...baseCriteria,
      area: "kanto",
    });

    expect(result).toEqual([kanagawa]);
  });

  it("離島設定に一致する集落のみ抽出する", () => {
    const island = buildVillage({ isIsland: true });
    const mainland = buildVillage({ isIsland: false });

    const result = filterVillages([island, mainland], {
      ...baseCriteria,
      islandSetting: "only_islands",
    });

    expect(result).toEqual([island]);
  });

  it("キーワードに一致する集落のみ抽出する", () => {
    const match = buildVillage({ district: "南鳥島" });
    const notMatch = buildVillage({ district: "字波照間" });

    const result = filterVillages([match, notMatch], {
      ...baseCriteria,
      keywords: "南鳥島",
    });

    expect(result).toEqual([match]);
  });
});
