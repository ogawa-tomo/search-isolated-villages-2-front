import { PrefectureJpName } from "./Region";

type Faculty = {
  name: string;
  pref: PrefectureJpName;
  city: string;
  district: string;
  urban_point: number;
  google_map_url: string;
  mesh_map_path: string;
};

export default Faculty;
