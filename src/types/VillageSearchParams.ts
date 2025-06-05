import { AreaEnName } from "./Area";
import { IslandSettingEnName } from "./IslandSetting";

type VillageSearchParams = {
  area: AreaEnName | "";
  populationLowerLimit: string;
  populationUpperLimit: string;
  islandSetting: IslandSettingEnName | "";
  keywords: string;
  page: string;
};

export const defaultVillageSearchParams: VillageSearchParams = {
  area: "",
  populationLowerLimit: "1",
  populationUpperLimit: "10000",
  islandSetting: "exclude_islands",
  keywords: "",
  page: "1",
};

export default VillageSearchParams;
