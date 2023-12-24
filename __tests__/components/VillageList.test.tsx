import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VillageListPresentation } from '@/components/VillageList';
import type VillageSearchParams from '@/types/villageSearchParams';

describe('VillageListPresentation', () => {
  it('shows villages', () => {
    const villageSearchParams: VillageSearchParams = {
      region: '北海道',
      population_lower_limit: '1',
      population_upper_limit: '10000',
      island_setting: '離島を含まない',
      key_words: '',
      page: '1',
    };

    const villages = [
      {
        pref: '北海道',
        city: '稚内市',
        district: '稚内',
        population: 20,
        urban_point: 100,
        google_map_url: 'https://hogehoge.com',
        mesh_map_path: '/hogehoge',
      },
      {
        pref: '北海道',
        city: '稚内市',
        district: '稚内',
        population: 20,
        urban_point: 110,
        google_map_url: 'https://hogehoge.com',
        mesh_map_path: '/hogehoge',
      },
    ];

    render(
      <VillageListPresentation
        pages={1}
        per_page={20}
        villages={villages}
        searchParams={villageSearchParams}
      />
    );

    const villageNameElements = screen.getAllByText(/北海道.*/);
    expect(villageNameElements).toHaveLength(2);
  });
});
