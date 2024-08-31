import { render, screen } from '@testing-library/react';
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

HTMLDialogElement.prototype.showModal = jest.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = true;
});

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
      keywords: '',
      page: '1'
    });

    await user.click(button);
    expect(mockFn).toHaveBeenCalledWith(`/?${params.toString()}`);
  })

  it('地域とオプションを選択して検索する', async () => {
    render(<VillageSearchForm />);

    const regionSelectBox = screen.getByRole('combobox');
    await selectEvent.select(regionSelectBox, '青森県');

    await user.click(screen.getByRole('button', { name: '詳細条件' }));

    expect(screen.getByRole('group', { name: '人口' })).toBeInTheDocument();
    const populationLowerLimitTextbox = screen.getByRole('spinbutton', { name: '最小：' });
    await user.clear(populationLowerLimitTextbox);
    await user.type(populationLowerLimitTextbox, '200');
    const populationUpperLimitTextbox = screen.getByRole('spinbutton', { name: '最大：' });
    await user.clear(populationUpperLimitTextbox);
    await user.type(populationUpperLimitTextbox, '500');

    expect(screen.getByRole('group', { name: '離島設定' })).toBeInTheDocument();
    await user.click(screen.getByLabelText('離島のみ'));

    await user.type(screen.getByRole('textbox', { name: 'キーワード絞り込み' }), '佐井村');

    await user.click(screen.getByRole('button', { name: 'close' }));

    const params = new URLSearchParams({
      region: '青森県',
      populationLowerLimit: '200',
      populationUpperLimit: '500',
      islandSetting: '離島のみ',
      keywords: '佐井村',
      page: '1'
    });

    await user.click(screen.getByRole('button', { name: '探索' }));
    expect(mockFn).toHaveBeenCalledWith(`/?${params.toString()}`);
  })

  it('地域とオプションを選択した後、デフォルト値に戻して検索する', async () => {
    render(<VillageSearchForm />);

    const regionSelectBox = screen.getByRole('combobox');
    await selectEvent.select(regionSelectBox, '青森県');

    await user.click(screen.getByRole('button', { name: '詳細条件' }));

    expect(screen.getByRole('group', { name: '人口' })).toBeInTheDocument();
    const populationLowerLimitTextbox = screen.getByRole('spinbutton', { name: '最小：' });
    await user.clear(populationLowerLimitTextbox);
    await user.type(populationLowerLimitTextbox, '200');
    const populationUpperLimitTextbox = screen.getByRole('spinbutton', { name: '最大：' });
    await user.clear(populationUpperLimitTextbox);
    await user.type(populationUpperLimitTextbox, '500');

    expect(screen.getByRole('group', { name: '離島設定' })).toBeInTheDocument();
    await user.click(screen.getByLabelText('離島のみ'));

    await user.type(screen.getByRole('textbox', { name: 'キーワード絞り込み' }), '佐井村');

    await user.click(screen.getByRole('button', { name: 'デフォルト値に戻す' }));
    await user.click(screen.getByRole('button', { name: 'close' }));

    const params = new URLSearchParams({
      region: '青森県',
      populationLowerLimit: '1',
      populationUpperLimit: '10000',
      islandSetting: '離島を含まない',
      keywords: '',
      page: '1'
    });

    await user.click(screen.getByRole('button', { name: '探索' }));
    expect(mockFn).toHaveBeenCalledWith(`/?${params.toString()}`);
  })

  it('propsがフォームの初期値に反映されている', async () => {
    render(<VillageSearchForm
      inputRegion='青森県'
      inputPopulationLowerLimit='200'
      inputPopulationUpperLimit='500'
      inputIslandSetting='離島のみ'
      inputKeywords='佐井村'
    />);

    expect(screen.getByText('青森県')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '詳細条件' }));

    expect(screen.getByRole('group', { name: '人口' })).toBeInTheDocument();
    const populationLowerLimitTextbox = screen.getByRole('spinbutton', { name: '最小：' });
    expect(populationLowerLimitTextbox).toHaveValue(200);
    const populationUpperLimitTextbox = screen.getByRole('spinbutton', { name: '最大：' });
    expect(populationUpperLimitTextbox).toHaveValue(500);

    expect(screen.getByRole('group', { name: '離島設定' })).toBeInTheDocument();
    expect(screen.getByLabelText('離島のみ')).toBeChecked();

    expect(screen.getByRole('textbox', { name: 'キーワード絞り込み' })).toHaveValue('佐井村');

    await user.click(screen.getByRole('button', { name: 'close' }));

    const params = new URLSearchParams({
      region: '青森県',
      populationLowerLimit: '200',
      populationUpperLimit: '500',
      islandSetting: '離島のみ',
      keywords: '佐井村',
      page: '1'
    });

    await user.click(screen.getByRole('button', { name: '探索' }));
    expect(mockFn).toHaveBeenCalledWith(`/?${params.toString()}`);
  })
});
