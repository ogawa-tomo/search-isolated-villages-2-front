import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import { village } from '../fixtures/villages';
import VillageFortuneModal from '@/components/VillageFortuneModal';
import { Middleware, SWRConfig, SWRResponse } from "swr"

const user = userEvent.setup();

const testMiddleware: Middleware = () => {
  return (): SWRResponse<any, any> => {
    return {
      data: village,
      error: undefined,
      mutate: (_) => Promise.resolve(),
      isValidating: false,
      isLoading: false,
    }
  }
}

const MockedVillageFortuneModal = () => {
  return (
    <SWRConfig value={{ use: [testMiddleware] }}>
      <VillageFortuneModal />
    </SWRConfig>
  )
}

describe('VillageFortuneModal', () => {
  it('shows result', async () => {
    render(<MockedVillageFortuneModal />)

    await user.click(screen.getByRole('button', { name: '占う' }));
    expect(screen.getByText('今日のラッキー秘境集落は…')).toBeInTheDocument();
    expect(screen.getByText('北海道 稚内市 稚内地区')).toBeInTheDocument();
  });
});
