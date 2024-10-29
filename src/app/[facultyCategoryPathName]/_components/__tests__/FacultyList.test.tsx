import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FacultySearchParams from "@/types/FacultySearchParams";
import { getPostOffices } from "@/fixtures/post_offices";
import * as fetchFacultiesResultFetchers from "@/lib/fetchFaculties";
import FacultyList from "@/app/[facultyCategoryPathName]/_components/FacultyList";

jest.mock("src/lib/fetchFaculties");

describe("FacultyList", () => {
  it("shows faculties", async () => {
    const facultySearchParams: FacultySearchParams = {
      area: "hokkaido",
      islandSetting: "exclude_islands",
      keywords: "",
      page: "1",
    };

    const postOffices = getPostOffices(20);

    jest
      .spyOn(fetchFacultiesResultFetchers, "fetchFaculties")
      .mockResolvedValue({
        faculties: postOffices,
        pages: 5,
        per_page: 20,
      });

    render(
      <FacultyList
        facultyCategoryPathName="post_office"
        searchParams={facultySearchParams}
      />,
    );

    const villageNameElements = await screen.findAllByText(/北海道.*/);
    expect(villageNameElements).toHaveLength(20);
    for (let i = 1; i <= 20; i++) {
      expect(screen.getByText(`稚内郵便局${i}`)).toBeInTheDocument();
    }
  });
});
