import { FacultyCategoryPathName } from '@/types/FacultyCategory';
import type FacultySearchParams from '@/types/facultySearchParams';

export const fetchFaculties = async ({
  facultyCategoryPathName,
  params,
}: {
  facultyCategoryPathName: FacultyCategoryPathName;
  params: FacultySearchParams;
}) => {
  const query = new URLSearchParams(params);
  const response = await fetch(
    `/api/${facultyCategoryPathName}/result?${query.toString()}`
  );
  return response.json();
};
