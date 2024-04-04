import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import { Middleware, SWRConfig, SWRResponse } from "swr"
import { postOffice } from '../fixtures/post_offices';
import FacultyFortuneModal from '@/components/FacultyFortuneModal';

const user = userEvent.setup();

const testMiddleware: Middleware = () => {
  return (): SWRResponse<any, any> => {
    return {
      data: postOffice,
      error: undefined,
      mutate: (_) => Promise.resolve(),
      isValidating: false,
      isLoading: false,
    }
  }
}

const MockedFacultyFortuneModal = () => {
  return (
    <SWRConfig value={{ use: [testMiddleware] }}>
      <FacultyFortuneModal
        faculty='post_office'
      />
    </SWRConfig>
  )
}

describe('FacultyFortuneModal', () => {
  it('shows result', async () => {
    render(<MockedFacultyFortuneModal />)

    await user.click(screen.getByRole('button', { name: '占う' }));
    expect(screen.getByText('今日のラッキー秘境郵便局は…')).toBeInTheDocument();
    expect(screen.getByText('稚内郵便局')).toBeInTheDocument();
  });
});
