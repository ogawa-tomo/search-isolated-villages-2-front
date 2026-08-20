import {
  CommonFilterCriteria,
  matchesCommonConditions,
} from "@/lib/filters/matchesCommonConditions";
import FacultyRecord from "@/types/FacultyRecord";

export const filterFaculties = (
  faculties: readonly FacultyRecord[],
  criteria: CommonFilterCriteria,
): FacultyRecord[] =>
  faculties.filter((faculty) => matchesCommonConditions(faculty, criteria));
