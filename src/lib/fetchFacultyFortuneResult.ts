"use server";

import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import Faculty from "@/types/Faculty";

export const fetchFacultyFortuneResult = async (
  facultyCategoryPathName: FacultyCategoryPathName,
): Promise<Faculty> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/fortune/${facultyCategoryPathName}/result`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) throw response;
  return response.json();
};
