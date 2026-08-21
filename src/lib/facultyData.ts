import abandonedStationData from "@/data/faculties/abandoned_station.json";
import elementarySchoolData from "@/data/faculties/elementary_school.json";
import hotSpringData from "@/data/faculties/hot_spring.json";
import michinoekiData from "@/data/faculties/michinoeki.json";
import newTownData from "@/data/faculties/new_town.json";
import postOfficeData from "@/data/faculties/post_office.json";
import researchInstituteData from "@/data/faculties/research_institute.json";
import stationData from "@/data/faculties/station.json";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import FacultyRecord from "@/types/FacultyRecord";

export const facultyDataByPathName: Record<
  FacultyCategoryPathName,
  FacultyRecord[]
> = {
  post_office: postOfficeData as FacultyRecord[],
  elementary_school: elementarySchoolData as FacultyRecord[],
  station: stationData as FacultyRecord[],
  abandoned_station: abandonedStationData as FacultyRecord[],
  research_institute: researchInstituteData as FacultyRecord[],
  hot_spring: hotSpringData as FacultyRecord[],
  new_town: newTownData as FacultyRecord[],
  michinoeki: michinoekiData as FacultyRecord[],
};
