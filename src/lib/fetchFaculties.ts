"use server";

import { assertAreaEnName } from "@/lib/areas";
import { facultyDataByPathName } from "@/lib/facultyData";
import { filterFaculties } from "@/lib/filters/filterFaculties";
import { assertIslandSettingEnName } from "@/lib/islandSettings";
import { toFaculty } from "@/lib/toFaculty";
import Faculty from "@/types/Faculty";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import type FacultySearchParams from "@/types/FacultySearchParams";

type Response = {
  faculties: Faculty[];
};

export const fetchFaculties = async ({
  facultyCategoryPathName,
  params,
}: {
  facultyCategoryPathName: FacultyCategoryPathName;
  params: FacultySearchParams;
}): Promise<Response> => {
  assertAreaEnName(params.area);
  assertIslandSettingEnName(params.islandSetting);

  const filteredFaculties = filterFaculties(
    facultyDataByPathName[facultyCategoryPathName],
    {
      area: params.area,
      islandSetting: params.islandSetting,
      keywords: params.keywords,
    },
  );

  return {
    faculties: filteredFaculties.map(toFaculty),
  };
};
