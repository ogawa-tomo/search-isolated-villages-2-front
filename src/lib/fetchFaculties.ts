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
    `${
      process.env.NEXT_PUBLIC_VILLAGE_API_URL
    }/api/${facultyCategoryPathName}/result?${query.toString()}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );
  return response.json();
};
