import type Village from '@/types/village';

const villages: Village[] = [];
for (let i = 0; i < 100; i++) {
  villages.push({
    pref: '北海道',
    city: `稚内市${i}`,
    district: `稚内${i}`,
    population: 20,
    urban_point: 100,
    google_map_url: 'https://hogehoge.com',
    mesh_map_path: '/hogehoge',
  });
}

export default villages;
