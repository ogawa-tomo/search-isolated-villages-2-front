import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import FacultyFortuneModal from '@/components/FacultyFortuneModal';
import * as FacultyFortuneResultFetchers from '@/lib/fetchFacultyFortuneResult'
import { postOffice } from '../fixtures/post_offices';

const user = userEvent.setup();

jest.mock('src/lib/fetchFacultyFortuneResult');

describe('FacultyFortuneModal', () => {
  it('shows result', async () => {
    jest.spyOn(FacultyFortuneResultFetchers, 'fetchFacultyFortuneResult').mockResolvedValueOnce(postOffice);

    render(<FacultyFortuneModal facultyCategoryPathName='post_office' />)

    await user.click(screen.getByRole('button', { name: '占う' }));
    expect(screen.getByText('今日のラッキー秘境郵便局は…')).toBeInTheDocument();
    expect(screen.getByText('稚内郵便局')).toBeInTheDocument();
  });
});
