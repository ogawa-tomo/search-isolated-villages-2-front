import { PrefectureJpName } from "./Area";

type Faculty = {
  type: "faculty";
  name: string;
  pref: PrefectureJpName;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  urban_point: number;
  google_map_url: string;
};

export default Faculty;
