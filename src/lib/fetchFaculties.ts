"use server";

import Faculty from "@/types/Faculty";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import type FacultySearchParams from "@/types/FacultySearchParams";

type Response = {
  faculties: Faculty[];
  pages: number;
  per_page: number;
};

export const fetchFaculties = async ({
  facultyCategoryPathName,
  params,
}: {
  facultyCategoryPathName: FacultyCategoryPathName;
  params: FacultySearchParams;
}): Promise<Response> => {
  const query = new URLSearchParams(params);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/${
      facultyCategoryPathName
    }/result?${query.toString()}`,
  );
  if (!response.ok) throw response;
  return response.json();
};
