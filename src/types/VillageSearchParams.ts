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

export default VillageSearchParams;
