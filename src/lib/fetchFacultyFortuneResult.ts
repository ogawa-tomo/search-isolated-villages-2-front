import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import Faculty from "@/types/Faculty";

export const fetchFacultyFortuneResult = async (
  facultyCategoryPathName: FacultyCategoryPathName,
): Promise<Faculty> => {
  const res = await fetch(`/api/fortune/${facultyCategoryPathName}/result`);
  return res.json();
};
