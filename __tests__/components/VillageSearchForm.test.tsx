import { getByLabelText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import VillageSearchForm from '@/components/VillageSearchForm';
import selectEvent from 'react-select-event';

const user = userEvent.setup();


const mockFn = jest.fn();
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => {
    return { push: mockFn }
  }
}));

describe('VillageSearchForm', () => {

  it('地域を選択しオプションはデフォルト値で検索する', async () => {
    render(<VillageSearchForm />);
    const button = screen.getByRole('button', { name: '探索' });
    expect(button).toBeDisabled();

    const regionSelectBox = screen.getByRole('combobox');
    await selectEvent.select(regionSelectBox, '青森県');
    expect(button).toBeEnabled();

    const params = new URLSearchParams();
    params.append('region', '青森県');
    params.append('population_lower_limit', '1');
    params.append('population_upper_limit', '10000');
    params.append('island_setting', '離島を含まない');
    params.append('key_words', '');
    params.append('page', '1');

    await user.click(button);
    expect(mockFn).toHaveBeenCalledWith(`/result?${params.toString()}`);
  })
});
