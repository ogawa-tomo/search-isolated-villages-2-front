import { getGoogleMapUrl } from "@/lib/getGoogleMapUrl";
import { roundToDigits } from "@/lib/rounding";
import Faculty from "@/types/Faculty";
import FacultyRecord from "@/types/FacultyRecord";

const URBAN_POINT_DIGITS = 2;

export const toFaculty = (faculty: FacultyRecord): Faculty => ({
  type: "faculty",
  name: faculty.name,
  pref: faculty.pref,
  city: faculty.city,
  district: faculty.district,
  latitude: faculty.latitude,
  longitude: faculty.longitude,
  urban_point: roundToDigits(faculty.urbanPoint, URBAN_POINT_DIGITS),
  google_map_url: getGoogleMapUrl(faculty.latitude, faculty.longitude),
});
