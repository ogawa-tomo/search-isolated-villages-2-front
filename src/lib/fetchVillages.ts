"use server";

import villagesData from "@/data/villages.json";
import { assertAreaEnName } from "@/lib/areas";
import { filterVillages } from "@/lib/filters/filterVillages";
import { assertIslandSettingEnName } from "@/lib/islandSettings";
import { toVillage } from "@/lib/toVillage";
import Village from "@/types/Village";
import type VillageSearchParams from "@/types/VillageSearchParams";
import VillageRecord from "@/types/VillageRecord";

const villages = villagesData as VillageRecord[];

export type FetchVillagesResponse = {
  villages: Village[];
};

export const fetchVillages = async (
  params: VillageSearchParams,
): Promise<FetchVillagesResponse> => {
  assertAreaEnName(params.area);
  assertIslandSettingEnName(params.islandSetting);

  const filteredVillages = filterVillages(villages, {
    area: params.area,
    islandSetting: params.islandSetting,
    keywords: params.keywords,
    populationLowerLimit: Number(params.populationLowerLimit),
    populationUpperLimit: Number(params.populationUpperLimit),
  });

  return {
    villages: filteredVillages.map(toVillage),
  };
};
