import { AreaEnName } from "./Area";
import { IslandSettingEnName } from "./IslandSetting";

type FacultySearchParams = {
  area: AreaEnName | "";
  islandSetting: IslandSettingEnName | "";
  keywords: string;
};

export const defaultFacultySearchParams: FacultySearchParams = {
  area: "",
  islandSetting: "exclude_islands",
  keywords: "",
};

export default FacultySearchParams;
