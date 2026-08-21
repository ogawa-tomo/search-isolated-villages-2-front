import { formatRoundedFloat } from "@/lib/rounding";

const GOOGLE_MAP_URL_COORDINATE_DIGITS = 4;

export const getGoogleMapUrl = (
  latitude: number,
  longitude: number,
): string => {
  const lat = formatRoundedFloat(latitude, GOOGLE_MAP_URL_COORDINATE_DIGITS);
  const lon = formatRoundedFloat(longitude, GOOGLE_MAP_URL_COORDINATE_DIGITS);

  return `https://maps.google.com/maps?q=${lat},${lon}&t=k`;
};
