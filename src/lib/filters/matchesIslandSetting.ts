import { IslandSettingEnName } from "@/types/IslandSetting";

export const matchesIslandSetting = (
  isIsland: boolean,
  islandSetting: IslandSettingEnName,
): boolean => {
  switch (islandSetting) {
    case "include_islands":
      return true;
    case "exclude_islands":
      return !isIsland;
    case "only_islands":
      return isIsland;
  }
};
