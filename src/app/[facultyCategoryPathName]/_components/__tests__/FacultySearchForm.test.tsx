import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import selectEvent from "react-select-event";
import FacultySearchForm from "@/app/[facultyCategoryPathName]/_components/FacultySearchForm";

const user = userEvent.setup();

const mockFn = jest.fn();

HTMLDialogElement.prototype.showModal = jest.fn(function mock(
  this: HTMLDialogElement,
) {
  this.open = true;
});

describe("FacultySearchForm", () => {
  beforeEach(() => {
    mockFn.mockClear();
  });

  it("地域を選択しオプションはデフォルト値で検索する", async () => {
    render(<FacultySearchForm onSearch={mockFn} />);
    const button = screen.getByRole("button", { name: "探索" });
    expect(button).toBeDisabled();

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");
    expect(button).toBeEnabled();

    const params = {
      area: "aomori",
      islandSetting: "exclude_islands",
      keywords: "",
    };

    await user.click(button);
    expect(mockFn).toHaveBeenCalledWith(params);
  });

  it("地域とオプションを選択して検索する", async () => {
    render(<FacultySearchForm onSearch={mockFn} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    expect(screen.getByRole("group", { name: "離島設定" })).toBeInTheDocument();
    await user.click(screen.getByLabelText("離島のみ"));

    await user.type(
      screen.getByRole("textbox", { name: "キーワード絞り込み" }),
      "佐井村",
    );

    await user.click(screen.getByRole("button", { name: "決定" }));

    const params = {
      area: "aomori",
      islandSetting: "only_islands",
      keywords: "佐井村",
    };

    await user.click(screen.getByRole("button", { name: "探索" }));
    expect(mockFn).toHaveBeenCalledWith(params);
  });

  it("地域とオプションを選択した後、デフォルト値に戻して検索する", async () => {
    render(<FacultySearchForm onSearch={mockFn} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    expect(screen.getByRole("group", { name: "離島設定" })).toBeInTheDocument();
    await user.click(screen.getByLabelText("離島のみ"));

    await user.type(
      screen.getByRole("textbox", { name: "キーワード絞り込み" }),
      "佐井村",
    );

    await user.click(
      screen.getByRole("button", { name: "デフォルト値に戻す" }),
    );
    await user.click(screen.getByRole("button", { name: "決定" }));

    const params = {
      area: "aomori",
      islandSetting: "exclude_islands",
      keywords: "",
    };

    await user.click(screen.getByRole("button", { name: "探索" }));
    expect(mockFn).toHaveBeenCalledWith(params);
  });

  it("propsがフォームの初期値に反映されている", async () => {
    render(
      <FacultySearchForm
        onSearch={mockFn}
        inputArea={{ enName: "aomori", jpName: "青森県" }}
        inputIslandSetting={{
          jpName: "離島のみ",
          enName: "only_islands",
        }}
        inputKeywords="佐井村"
      />,
    );

    expect(screen.getByText("青森県")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    expect(screen.getByRole("group", { name: "離島設定" })).toBeInTheDocument();
    expect(screen.getByLabelText("離島のみ")).toBeChecked();

    expect(
      screen.getByRole("textbox", { name: "キーワード絞り込み" }),
    ).toHaveValue("佐井村");

    await user.click(screen.getByRole("button", { name: "決定" }));

    const params = {
      area: "aomori",
      islandSetting: "only_islands",
      keywords: "佐井村",
    };

    await user.click(screen.getByRole("button", { name: "探索" }));
    expect(mockFn).toHaveBeenCalledWith(params);
  });
});
