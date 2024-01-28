import { getByLabelText, render, screen, waitFor } from '@testing-library/react';
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
  beforeEach(() => {
    mockFn.mockClear();
  })

  it('地域を選択しオプションはデフォルト値で検索する', async () => {
    render(<VillageSearchForm />);
    const button = screen.getByRole('button', { name: '探索' });
    expect(button).toBeDisabled();

    const regionSelectBox = screen.getByRole('combobox');
    await selectEvent.select(regionSelectBox, '青森県');
    expect(button).toBeEnabled();

    const params = new URLSearchParams({
      region: '青森県',
      populationLowerLimit: '1',
      populationUpperLimit: '10000',
      islandSetting: '離島を含まない',
      keyWords: '',
      page: '1'
    });

    await user.click(button);
    expect(mockFn).toHaveBeenCalledWith(`/result?${params.toString()}`);
  })

  it('地域とオプションを選択して検索する', async () => {
    render(<VillageSearchForm />);
    const button = screen.getByRole('button', { name: '探索' });
    const regionSelectBox = screen.getByRole('combobox');
    await selectEvent.select(regionSelectBox, '青森県');

    const openOptionModalButton = screen.getByRole('button', { name: '詳細条件' });
    await user.click(openOptionModalButton);

    expect(screen.getByRole('group', { name: '人口' })).toBeInTheDocument();
    const populationLowerLimitTextbox = screen.getByRole('spinbutton', { name: '最小：' });
    await user.type(populationLowerLimitTextbox, '200')
    const populationUpperLimitTextbox = screen.getByRole('spinbutton', { name: '最大：' });
    await user.type(populationUpperLimitTextbox, '500')

    expect(screen.getByRole('group', { name: '離島設定' })).toBeInTheDocument();
    await user.click(screen.getByLabelText('離島のみ'));





    expect(screen.getByRole('button', { name: 'デフォルト値に戻す' })).toBeInTheDocument();

    const params = new URLSearchParams({
      region: '青森県',
      populationLowerLimit: '1',
      populationUpperLimit: '10000',
      islandSetting: '離島を含まない',
      keyWords: '',
      page: '1'
    });

    // await user.click(button);
    // expect(mockFn).toHaveBeenCalledWith(`/result?${params.toString()}`);
  })
});
