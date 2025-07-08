import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getVillages } from "@/fixtures/villages";
import PointList from "@/components/PointList";
import userEvent from "@testing-library/user-event";
import { getPostOffices } from "@/fixtures/post_offices";

describe("PointList", () => {
  it("shows villages", async () => {
    const onClickPoint = jest.fn();

    const villages = getVillages(20);

    render(
      <PointList
        points={villages}
        selectedPoint={undefined}
        rankStart={1}
        onClickPoint={onClickPoint}
      />,
    );

    const villageNameElements = screen.getAllByText(/北海道.*/);
    expect(villageNameElements).toHaveLength(20);

    for (const village of villages) {
      expect(
        screen.getByText(`${village.pref} ${village.city} ${village.district}`),
      ).toBeInTheDocument();
    }

    const firstVillageElement = screen.getByText("北海道 稚内市 地区1");
    await userEvent.click(firstVillageElement);
    expect(onClickPoint).toHaveBeenCalledWith(villages[0]);
  });

  it("shows faculties", async () => {
    const onClickPoint = jest.fn();

    const postOffices = getPostOffices(20);

    render(
      <PointList
        points={postOffices}
        selectedPoint={undefined}
        rankStart={1}
        onClickPoint={onClickPoint}
      />,
    );

    const postOfficeNameElements = screen.getAllByText(/稚内郵便局.*/);
    expect(postOfficeNameElements).toHaveLength(20);

    for (const postOffice of postOffices) {
      expect(screen.getByText(postOffice.name)).toBeInTheDocument();
    }

    const firstPostOfficeElement = screen.getByText("稚内郵便局1");

    await userEvent.click(firstPostOfficeElement);
    expect(onClickPoint).toHaveBeenCalledWith(postOffices[0]);
  });
});
