import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getVillages } from "@/fixtures/villages";
import ObjectList from "@/components/ObjectList";
import userEvent from "@testing-library/user-event";
import { getPostOffices } from "@/fixtures/post_offices";

describe("ObjectList", () => {
  it("shows villages", async () => {
    const onClickObject = jest.fn();

    const villages = getVillages(20);

    render(
      <ObjectList
        objects={villages}
        selectedObject={undefined}
        rankStart={1}
        onClickObject={onClickObject}
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
    expect(onClickObject).toHaveBeenCalledWith(villages[0]);
  });

  it("shows faculties", async () => {
    const onClickObject = jest.fn();

    const postOffices = getPostOffices(20);

    render(
      <ObjectList
        objects={postOffices}
        selectedObject={undefined}
        rankStart={1}
        onClickObject={onClickObject}
      />,
    );

    const postOfficeNameElements = screen.getAllByText(/稚内郵便局.*/);
    expect(postOfficeNameElements).toHaveLength(20);

    for (const postOffice of postOffices) {
      expect(screen.getByText(postOffice.name)).toBeInTheDocument();
    }

    const firstPostOfficeElement = screen.getByText("稚内郵便局1");

    await userEvent.click(firstPostOfficeElement);
    expect(onClickObject).toHaveBeenCalledWith(postOffices[0]);
  });
});
