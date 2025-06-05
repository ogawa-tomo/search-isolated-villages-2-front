import { PrefectureJpName } from "./Area";

type Village = {
  pref: PrefectureJpName;
  city: string;
  district: string;
  population: number;
  latitude: number;
  longitude: number;
  urban_point: number;
  google_map_url: string;
  mesh_map_path: string;
};

export default Village;
