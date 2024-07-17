import {
  facultyCategoryNames,
  facultyCategoryPathNames,
} from '@/lib/facultyCategories';

export type FacultyCategoryName = (typeof facultyCategoryNames)[number];

export type FacultyCategoryPathName = (typeof facultyCategoryPathNames)[number];

export type FacultyCategory = {
  name: FacultyCategoryName;
  pathName: FacultyCategoryPathName;
};
