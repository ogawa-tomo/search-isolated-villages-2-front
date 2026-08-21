import { getGoogleMapUrl } from "@/lib/getGoogleMapUrl";
import { roundToDigits } from "@/lib/rounding";
import Village from "@/types/Village";
import VillageRecord from "@/types/VillageRecord";

const URBAN_POINT_DIGITS = 2;

export const toVillage = (village: VillageRecord): Village => ({
  type: "village",
  pref: village.pref,
  city: village.city,
  district: village.district,
  population: village.population,
  latitude: village.latitude,
  longitude: village.longitude,
  urban_point: roundToDigits(village.urbanPoint, URBAN_POINT_DIGITS),
  google_map_url: getGoogleMapUrl(village.latitude, village.longitude),
});
