import { PrefectureJpName } from "./Area";

type Village = {
  type: "village";
  pref: PrefectureJpName;
  city: string;
  district: string;
  population: number;
  latitude: number;
  longitude: number;
  urban_point: number;
  google_map_url: string;
};

export default Village;
