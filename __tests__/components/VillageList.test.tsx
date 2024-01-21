import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VillageListPresentation } from '@/components/VillageList';
import type VillageSearchParams from '@/types/villageSearchParams';
import { getVillages } from '../fixtures/villages';

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

    const villages = getVillages(20);

    render(
      <VillageListPresentation
        pages={5}
        per_page={20}
        villages={villages}
        searchParams={villageSearchParams}
      />
    );

    const villageNameElements = screen.getAllByText(/北海道.*/);
    expect(villageNameElements).toHaveLength(20);
  });
});
