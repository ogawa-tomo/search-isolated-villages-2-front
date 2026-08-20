import {
  allCountry,
  getRegionByPrefecture,
  prefectures,
  regions,
} from "@/lib/areas";
import { AreaEnName, PrefectureJpName } from "@/types/Area";

export const matchesArea = (
  pref: PrefectureJpName,
  area: AreaEnName,
): boolean => {
  if (area === allCountry.enName) return true;

  const prefecture = prefectures.find(
    (prefecture) => prefecture.enName === area,
  );
  if (prefecture !== undefined) return pref === prefecture.jpName;

  const region = regions.find((region) => region.enName === area);
  if (region !== undefined)
    return getRegionByPrefecture(pref) === region.jpName;

  throw new Error(`エリアが不正です: ${area}`);
};
