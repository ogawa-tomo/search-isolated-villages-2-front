import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FacultySearchParams from '@/types/facultySearchParams';
import { getPostOffices } from '../fixtures/post_offices';
import { FacultyListPresentation } from '@/components/FacultyList';

describe('FacultyListPresentation', () => {
  it('shows faculties', () => {
    const facultySearchParams: FacultySearchParams = {
      region: '北海道',
      islandSetting: '離島を含まない',
      keyWords: '',
      page: '1',
    };

    const postOffices = getPostOffices(20);

    render(
      <FacultyListPresentation
        facultyCategoryPathName='post_office'
        pages={5}
        per_page={20}
        faculties={postOffices}
        searchParams={facultySearchParams}
      />
    );

    const villageNameElements = screen.getAllByText(/北海道.*/);
    expect(villageNameElements).toHaveLength(20);
    for (let i = 1; i <= 20; i++) {
      expect(screen.getByText(`稚内郵便局${i}`)).toBeInTheDocument();
    }
  });
});
