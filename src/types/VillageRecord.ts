import { PrefectureJpName } from "./Area";

type VillageRecord = {
  pref: PrefectureJpName;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  population: number;
  size: number;
  urbanPoint: number;
  isIsland: boolean;
};

export default VillageRecord;
