import { PrefectureJpName } from "./Area";

type FacultyRecord = {
  name: string;
  pref: PrefectureJpName;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  urbanPoint: number;
  isIsland: boolean;
};

export default FacultyRecord;
