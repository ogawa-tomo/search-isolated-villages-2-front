import { AreaEnName } from "./Area";

type VillageSearchParams = {
  area: AreaEnName | "";
  populationLowerLimit: string;
  populationUpperLimit: string;
  islandSetting: string;
  keywords: string;
  page: string;
};

export default VillageSearchParams;
