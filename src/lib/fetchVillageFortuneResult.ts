"use server";

import villagesData from "@/data/villages.json";
import { isFortuneVillage } from "@/lib/filters/isFortuneVillage";
import { toVillage } from "@/lib/toVillage";
import Village from "@/types/Village";
import VillageRecord from "@/types/VillageRecord";

const villages = villagesData as VillageRecord[];

export const fetchVillageFortuneResult = async (): Promise<Village> => {
  const fortuneVillages = villages.filter(isFortuneVillage);
  const village =
    fortuneVillages[Math.floor(Math.random() * fortuneVillages.length)];

  if (village === undefined) {
    throw new Error("占い対象の集落が見つかりませんでした");
  }

  return toVillage(village);
};
