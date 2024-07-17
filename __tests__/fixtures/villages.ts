import Village from '@/types/village';

export const getVillages = (number: number): Village[] => {
  const villages: Village[] = [];
  for (let i = 1; i <= number; i++) {
    const village: Village = {
      pref: '北海道',
      city: '稚内市',
      district: `地区${i}`,
      population: 20,
      urban_point: 100,
      google_map_url: 'https://hogehoge.com',
      mesh_map_path: '/hogehoge',
    };
    villages.push(village);
  }
  return villages;
};

export const village: Village = {
  pref: '北海道',
  city: '稚内市',
  district: '稚内地区',
  population: 20,
  urban_point: 100,
  google_map_url: 'https://hogehoge.com',
  mesh_map_path: '/hogehoge',
};
