import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { village } from "@/fixtures/villages";
import VillageFortuneModal from "@/app/fortune/_components/VillageFortuneModal";
import * as VillageFortuneResultFetchers from "@/lib/fetchVillageFortuneResult";

const user = userEvent.setup();

jest.mock("src/lib/fetchVillageFortuneResult");

HTMLDialogElement.prototype.showModal = jest.fn(function mock(
  this: HTMLDialogElement,
) {
  this.open = true;
});

describe("VillageFortuneModal", () => {
  it("shows result", async () => {
    jest
      .spyOn(VillageFortuneResultFetchers, "fetchVillageFortuneResult")
      .mockResolvedValueOnce(village);

    render(<VillageFortuneModal />);

    await user.click(screen.getByRole("button", { name: "占う" }));
    expect(screen.getByText("今日のラッキー秘境集落は…")).toBeInTheDocument();
    expect(screen.getByText("北海道 稚内市 稚内地区")).toBeInTheDocument();
  });
});
