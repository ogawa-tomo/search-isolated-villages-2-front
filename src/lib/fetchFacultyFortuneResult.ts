"use server";

import { facultyDataByPathName } from "@/lib/facultyData";
import { isFortuneFaculty } from "@/lib/filters/isFortuneFaculty";
import { toFaculty } from "@/lib/toFaculty";
import Faculty from "@/types/Faculty";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";

export const fetchFacultyFortuneResult = async (
  facultyCategoryPathName: FacultyCategoryPathName,
): Promise<Faculty> => {
  const fortuneFaculties =
    facultyDataByPathName[facultyCategoryPathName].filter(isFortuneFaculty);
  const faculty =
    fortuneFaculties[Math.floor(Math.random() * fortuneFaculties.length)];

  if (faculty === undefined) {
    throw new Error("占い対象の施設が見つかりませんでした");
  }

  return toFaculty(faculty);
};
