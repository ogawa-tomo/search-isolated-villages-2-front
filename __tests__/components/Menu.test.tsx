import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import { Menu } from '@/components/Menu';
import { facultyCategories } from '@/lib/facultyCategories';
import { facultyCategoryPathName } from '@/lib/facultyCategoryPathName';

const user = userEvent.setup();

function assertsNotNull(element: HTMLElement | null): asserts element is HTMLElement {
  if (element !== null) return;

  throw new Error('element is null');
}

describe('Menu', () => {
  it('秘境集落探索、秘境施設占い、このツールについてのリンク', async () => {
    render(<Menu />);

    expect(screen.getByRole('link', { name: '秘境集落探索' })).toHaveProperty('href', 'http://localhost/');
    expect(screen.getByRole('link', { name: '秘境集落占い' })).toHaveProperty('href', 'http://localhost/fortune');
    expect(screen.getByText('秘境施設占い')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'このツールについて' })).toHaveProperty('href', 'http://localhost/about');
  });

  it('秘境施設探索ツールの開閉', async () => {
    render(<Menu />);

    const facultySearchSummary = screen.getByText('秘境施設探索');
    expect(facultySearchSummary).toBeInTheDocument();
    const facultySearchDetails = facultySearchSummary.closest('details');
    assertsNotNull(facultySearchDetails);

    for (const facultyCategory of facultyCategories) {
      expect(within(facultySearchDetails).getByRole('link', { name: facultyCategory })).not.toBeVisible();
    }

    await user.click(facultySearchSummary);
    for (const facultyCategory of facultyCategories) {
      expect(within(facultySearchDetails).getByRole('link', { name: facultyCategory })).toHaveProperty('href', `http://localhost/${facultyCategoryPathName(facultyCategory)}`);
    }

    await user.click(facultySearchSummary);
    for (const facultyCategory of facultyCategories) {
      expect(within(facultySearchDetails).getByRole('link', { name: facultyCategory })).not.toBeVisible();
    }
  });

  it('秘境施設占いの開閉', async () => {
    render(<Menu />);

    const facultyFortuneSummary = screen.getByText('秘境施設占い');
    expect(facultyFortuneSummary).toBeInTheDocument();
    const facultyFortuneDetails = facultyFortuneSummary.closest('details');
    assertsNotNull(facultyFortuneDetails);

    for (const facultyCategory of facultyCategories) {
      expect(within(facultyFortuneDetails).getByRole('link', { name: facultyCategory })).not.toBeVisible();
    }

    await user.click(facultyFortuneSummary);
    for (const facultyCategory of facultyCategories) {
      expect(within(facultyFortuneDetails).getByRole('link', { name: facultyCategory })).toHaveProperty('href', `http://localhost/fortune/${facultyCategoryPathName(facultyCategory)}`);
    }

    await user.click(facultyFortuneSummary);
    for (const facultyCategory of facultyCategories) {
      expect(within(facultyFortuneDetails).getByRole('link', { name: facultyCategory })).not.toBeVisible();
    }
  });
});
