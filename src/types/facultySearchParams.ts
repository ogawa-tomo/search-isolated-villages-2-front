import { AreaEnName } from "./Area";
import { IslandSettingEnName } from "./IslandSetting";

type FacultySearchParams = {
  area: AreaEnName | "";
  islandSetting: IslandSettingEnName | "";
  keywords: string;
  page: string;
};

export default FacultySearchParams;
