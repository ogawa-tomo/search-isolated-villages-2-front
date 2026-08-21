import { matchesArea } from "@/lib/filters/matchesArea";
import { matchesIslandSetting } from "@/lib/filters/matchesIslandSetting";
import { matchesKeywords } from "@/lib/filters/matchesKeywords";
import { AreaEnName, PrefectureJpName } from "@/types/Area";
import { IslandSettingEnName } from "@/types/IslandSetting";

export type CommonFilterTarget = {
  pref: PrefectureJpName;
  city: string;
  district: string;
  isIsland: boolean;
};

export type CommonFilterCriteria = {
  area: AreaEnName;
  islandSetting: IslandSettingEnName;
  keywords: string;
};

export const matchesCommonConditions = (
  target: CommonFilterTarget,
  criteria: CommonFilterCriteria,
): boolean =>
  matchesArea(target.pref, criteria.area) &&
  matchesIslandSetting(target.isIsland, criteria.islandSetting) &&
  matchesKeywords(
    `${target.pref}${target.city}${target.district}`,
    criteria.keywords,
  );
