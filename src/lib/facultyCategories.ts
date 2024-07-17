import {
  FacultyCategory,
  FacultyCategoryName,
  FacultyCategoryPathName,
} from '@/types/FacultyCategory';

export const facultyCategoryNames = [
  '郵便局',
  '小学校',
  '駅',
  '廃駅',
  '研究機関',
  '温泉',
  'ニュータウン',
  '道の駅',
] as const;

export const facultyCategoryPathNames = [
  'post_office',
  'elementary_school',
  'station',
  'abandoned_station',
  'research_institute',
  'hot_spring',
  'new_town',
  'michinoeki',
] as const;

export const facultyCategories: readonly FacultyCategory[] = [
  {
    name: '郵便局',
    pathName: 'post_office',
  },
  {
    name: '小学校',
    pathName: 'elementary_school',
  },
  {
    name: '駅',
    pathName: 'station',
  },
  {
    name: '廃駅',
    pathName: 'abandoned_station',
  },
  {
    name: '研究機関',
    pathName: 'research_institute',
  },
  {
    name: '温泉',
    pathName: 'hot_spring',
  },
  {
    name: 'ニュータウン',
    pathName: 'new_town',
  },
  {
    name: '道の駅',
    pathName: 'michinoeki',
  },
];

export const getFacultyCategoryFromName = (
  facultyCategoryName: FacultyCategoryName
): FacultyCategory => {
  const facultyCategory = facultyCategories.find((facultyCategory) => {
    return facultyCategory.name === facultyCategoryName;
  });

  if (facultyCategory === undefined) {
    throw new Error(`施設定義が不正です: ${facultyCategoryName}`);
  }

  return facultyCategory;
};

export const getFacultyCategoryFromPathName = (
  facultyCategoryPathName: FacultyCategoryPathName
): FacultyCategory => {
  const facultyCategory = facultyCategories.find((facultyCategory) => {
    return facultyCategory.pathName === facultyCategoryPathName;
  });

  if (facultyCategory === undefined) {
    throw new Error(`施設定義が不正です: ${facultyCategoryPathName}`);
  }

  return facultyCategory;
};
