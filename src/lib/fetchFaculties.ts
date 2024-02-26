import type FacultySearchParams from '@/types/facultySearchParams';

export const fetchFaculties = async ({
  faculty,
  params,
}: {
  faculty: string;
  params: FacultySearchParams;
}) => {
  const query = new URLSearchParams(params);
  const response = await fetch(
    `${process.env.VILLAGE_API_URL}/api/${faculty}/result?${query.toString()}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );
  return response.json();
};
