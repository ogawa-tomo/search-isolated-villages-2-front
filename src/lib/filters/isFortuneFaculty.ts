import FacultyRecord from "@/types/FacultyRecord";

const FORTUNE_FACULTY_URBAN_POINT_UPPER_LIMIT = 10000;

export const isFortuneFaculty = (faculty: FacultyRecord): boolean =>
  faculty.urbanPoint < FORTUNE_FACULTY_URBAN_POINT_UPPER_LIMIT;
