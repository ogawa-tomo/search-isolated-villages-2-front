import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import { Menu } from '@/components/Menu';

const user = userEvent.setup();

describe('Menu', () => {
  it('秘境集落探索、秘境施設占い、このツールについてのリンク', async () => {
    render(<Menu />);

    expect(screen.getByRole('link', { name: '秘境集落探索' })).toHaveProperty('href', 'http://localhost/');
    expect(screen.getByRole('link', { name: '秘境集落占い' })).toHaveProperty('href', 'http://localhost/fortune');
    expect(screen.getByText('秘境施設占い')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'このツールについて' })).toHaveProperty('href', 'http://localhost/about');



    const facultyFortuneSummary = screen.getByText('秘境施設占い');
    expect(facultyFortuneSummary).toBeInTheDocument();
    expect(within(facultyFortuneSummary.closest('details')).getByRole('link', { name: '郵便局' })).not.toBeVisible();
    await user.click(facultyFortuneSummary);
    expect(within(facultyFortuneSummary.closest('details')).getByRole('link', { name: '郵便局' })).toHaveProperty('href', 'http://localhost/fortune/post_office');
  });

  it('秘境施設探索ツールの開閉', async () => {
    render(<Menu />);

    const facultySearchSummary = screen.getByText('秘境施設探索');
    expect(facultySearchSummary).toBeInTheDocument();
    expect(within(facultySearchSummary.closest('details')).getByRole('link', { name: '郵便局' })).not.toBeVisible();
    await user.click(facultySearchSummary);
    expect(within(facultySearchSummary.closest('details')).getByRole('link', { name: '郵便局' })).toHaveProperty('href', 'http://localhost/post_office');
    await user.click(facultySearchSummary);
    expect(within(facultySearchSummary.closest('details')).getByRole('link', { name: '郵便局' })).not.toBeVisible();
  });

  it('秘境施設占いの開閉', async () => {
    render(<Menu />);

    const facultyFortuneSummary = screen.getByText('秘境施設占い');
    expect(facultyFortuneSummary).toBeInTheDocument();
    expect(within(facultyFortuneSummary.closest('details')).getByRole('link', { name: '郵便局' })).not.toBeVisible();
    await user.click(facultyFortuneSummary);
    expect(within(facultyFortuneSummary.closest('details')).getByRole('link', { name: '郵便局' })).toHaveProperty('href', 'http://localhost/fortune/post_office');
    await user.click(facultyFortuneSummary);
    expect(within(facultyFortuneSummary.closest('details')).getByRole('link', { name: '郵便局' })).not.toBeVisible();
  });
});
