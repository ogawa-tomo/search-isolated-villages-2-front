import {
  CommonFilterCriteria,
  matchesCommonConditions,
} from "@/lib/filters/matchesCommonConditions";
import VillageRecord from "@/types/VillageRecord";

// バックエンド(webif.py)がAPIパラメータとして受け付けず、常にこの範囲で固定している
const VILLAGE_SIZE_LOWER_LIMIT = 0;
const VILLAGE_SIZE_UPPER_LIMIT = 100;

export type VillageFilterCriteria = CommonFilterCriteria & {
  populationLowerLimit: number;
  populationUpperLimit: number;
};

export const filterVillages = (
  villages: readonly VillageRecord[],
  criteria: VillageFilterCriteria,
): VillageRecord[] =>
  villages.filter(
    (village) =>
      matchesCommonConditions(village, criteria) &&
      criteria.populationLowerLimit <= village.population &&
      village.population <= criteria.populationUpperLimit &&
      VILLAGE_SIZE_LOWER_LIMIT <= village.size &&
      village.size <= VILLAGE_SIZE_UPPER_LIMIT,
  );
