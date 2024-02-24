import type Village from '@/types/village';

export const villagesForFirstPage: Village[] = [];
for (let i = 1; i <= 20; i++) {
  villagesForFirstPage.push({
    pref: '北海道',
    city: `稚内市${i}`,
    district: `稚内${i}`,
    population: 20,
    urban_point: 100,
    google_map_url: 'https://hogehoge.com',
    mesh_map_path: '/hogehoge',
  });
}

export const villagesForSecondPage: Village[] = [];
for (let i = 21; i <= 40; i++) {
  villagesForSecondPage.push({
    pref: '北海道',
    city: `稚内市${i}`,
    district: `稚内${i}`,
    population: 20,
    urban_point: 100,
    google_map_url: 'https://hogehoge.com',
    mesh_map_path: '/hogehoge',
  });
}

export const villagesForAomori: Village[] = [];
for (let i = 1; i <= 20; i++) {
  villagesForAomori.push({
    pref: '青森県',
    city: `佐井村${i}`,
    district: `佐井${i}`,
    population: 20,
    urban_point: 100,
    google_map_url: 'https://hogehoge.com',
    mesh_map_path: '/hogehoge',
  });
}
