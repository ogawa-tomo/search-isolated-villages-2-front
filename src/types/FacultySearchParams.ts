import { AreaEnName } from "./Area";
import { IslandSettingEnName } from "./IslandSetting";

type FacultySearchParams = {
  area: AreaEnName | "";
  islandSetting: IslandSettingEnName | "";
  keywords: string;
  page: string;
};

export const defaultFacultySearchParams: FacultySearchParams = {
  area: "",
  islandSetting: "exclude_islands",
  keywords: "",
  page: "1",
};

export default FacultySearchParams;
