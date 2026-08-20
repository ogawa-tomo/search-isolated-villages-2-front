import VillageRecord from "@/types/VillageRecord";

export const isFortuneVillage = (village: VillageRecord): boolean => {
  const isTinyAndUrbanPointLow =
    village.population <= 50 && village.urbanPoint < 30000;
  const isSmallAndUrbanPointModerate =
    village.population <= 500 &&
    village.size <= 10 &&
    village.urbanPoint < 10000;

  return isTinyAndUrbanPointLow || isSmallAndUrbanPointModerate;
};
