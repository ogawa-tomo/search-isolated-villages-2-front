import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import type VillageSearchParams from "@/types/VillageSearchParams";
import { getVillages } from "@/fixtures/villages";
import VillageList from "@/app/_components/VillageView";
import * as FetchVillagesResultFetchers from "@/lib/fetchVillages";

jest.mock("src/lib/fetchVillages");

describe("VillageList", () => {
  it("shows villages", async () => {
    const villageSearchParams: VillageSearchParams = {
      area: "hokkaido",
      populationLowerLimit: "1",
      populationUpperLimit: "10000",
      islandSetting: "exclude_islands",
      keywords: "",
      page: "1",
    };

    const villages = getVillages(20);

    jest.spyOn(FetchVillagesResultFetchers, "fetchVillages").mockResolvedValue({
      villages: villages,
      pages: 5,
      per_page: 20,
    });

    render(<VillageList {...villageSearchParams} />);

    const villageNameElements = await screen.findAllByText(/北海道.*/);
    expect(villageNameElements).toHaveLength(20);
  });
});
