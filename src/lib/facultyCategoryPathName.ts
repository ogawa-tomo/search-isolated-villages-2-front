import { FacultyCategoryName } from '@/types/FacultyCategory';

export const facultyCategoryPathName = (
  facultyCategoryName: FacultyCategoryName
): string => {
  switch (facultyCategoryName) {
    case '郵便局':
      return 'post_office';
    case '小学校':
      return 'elementary_school';
    case '駅':
      return 'station';
    case '廃駅':
      return 'abandoned_station';
    case '研究機関':
      return 'research_institute';
    case '温泉':
      return 'hot_spring';
    case 'ニュータウン':
      return 'new_town';
    case '道の駅':
      return 'michinoeki';
  }
};
