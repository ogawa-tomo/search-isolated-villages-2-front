import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VillageListPresentation } from '@/components/VillageList';
import type VillageSearchParams from '@/types/villageSearchParams';
import { getVillages } from '../fixtures/villages';

describe('VillageListPresentation', () => {
  it('shows villages', () => {
    const villageSearchParams: VillageSearchParams = {
      region: '北海道',
      populationLowerLimit: '1',
      populationUpperLimit: '10000',
      islandSetting: '離島を含まない',
      keyWords: '',
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
