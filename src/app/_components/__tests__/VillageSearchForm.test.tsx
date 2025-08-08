import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import VillageSearchForm from "@/app/_components/VillageSearchForm";
import selectEvent from "react-select-event";

const user = userEvent.setup();

const mockFn = jest.fn();

HTMLDialogElement.prototype.showModal = jest.fn(function mock(
  this: HTMLDialogElement,
) {
  this.open = true;
});

describe("VillageSearchForm", () => {
  beforeEach(() => {
    mockFn.mockClear();
  });

  it("地域を選択しオプションはデフォルト値で検索する", async () => {
    render(<VillageSearchForm onSearch={mockFn} />);
    const button = screen.getByRole("button", { name: "探索" });
    expect(button).toBeDisabled();

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");
    expect(button).toBeEnabled();

    const params = {
      area: "aomori",
      populationLowerLimit: "1",
      populationUpperLimit: "10000",
      islandSetting: "exclude_islands",
      keywords: "",
    };

    await user.click(button);
    expect(mockFn).toHaveBeenCalledWith(params);
  });

  it("地域とオプションを選択して検索する", async () => {
    render(<VillageSearchForm onSearch={mockFn} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    expect(screen.getByRole("group", { name: "人口" })).toBeInTheDocument();
    const populationLowerLimitTextbox = screen.getByRole("spinbutton", {
      name: "最小：",
    });
    await user.clear(populationLowerLimitTextbox);
    await user.type(populationLowerLimitTextbox, "200");
    const populationUpperLimitTextbox = screen.getByRole("spinbutton", {
      name: "最大：",
    });
    await user.clear(populationUpperLimitTextbox);
    await user.type(populationUpperLimitTextbox, "500");

    expect(screen.getByRole("group", { name: "離島設定" })).toBeInTheDocument();
    await user.click(screen.getByLabelText("離島のみ"));

    await user.type(
      screen.getByRole("textbox", { name: "キーワード絞り込み" }),
      "佐井村",
    );

    await user.click(screen.getByRole("button", { name: "決定" }));

    const params = {
      area: "aomori",
      populationLowerLimit: "200",
      populationUpperLimit: "500",
      islandSetting: "only_islands",
      keywords: "佐井村",
    };

    await user.click(screen.getByRole("button", { name: "探索" }));
    expect(mockFn).toHaveBeenCalledWith(params);
  });

  it("地域とオプションを選択した後、デフォルト値に戻して検索する", async () => {
    render(<VillageSearchForm onSearch={mockFn} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    expect(screen.getByRole("group", { name: "人口" })).toBeInTheDocument();
    const populationLowerLimitTextbox = screen.getByRole("spinbutton", {
      name: "最小：",
    });
    await user.clear(populationLowerLimitTextbox);
    await user.type(populationLowerLimitTextbox, "200");
    const populationUpperLimitTextbox = screen.getByRole("spinbutton", {
      name: "最大：",
    });
    await user.clear(populationUpperLimitTextbox);
    await user.type(populationUpperLimitTextbox, "500");

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
      populationLowerLimit: "1",
      populationUpperLimit: "10000",
      islandSetting: "exclude_islands",
      keywords: "",
    };

    await user.click(screen.getByRole("button", { name: "探索" }));
    expect(mockFn).toHaveBeenCalledWith(params);
  });

  it("propsがフォームの初期値に反映されている", async () => {
    render(
      <VillageSearchForm
        inputArea={{ enName: "aomori", jpName: "青森県" }}
        inputPopulationLowerLimit="200"
        inputPopulationUpperLimit="500"
        inputIslandSetting={{
          jpName: "離島のみ",
          enName: "only_islands",
        }}
        inputKeywords="佐井村"
        onSearch={mockFn}
      />,
    );

    expect(screen.getByText("青森県")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    expect(screen.getByRole("group", { name: "人口" })).toBeInTheDocument();
    const populationLowerLimitTextbox = screen.getByRole("spinbutton", {
      name: "最小：",
    });
    expect(populationLowerLimitTextbox).toHaveValue(200);
    const populationUpperLimitTextbox = screen.getByRole("spinbutton", {
      name: "最大：",
    });
    expect(populationUpperLimitTextbox).toHaveValue(500);

    expect(screen.getByRole("group", { name: "離島設定" })).toBeInTheDocument();
    expect(screen.getByLabelText("離島のみ")).toBeChecked();

    expect(
      screen.getByRole("textbox", { name: "キーワード絞り込み" }),
    ).toHaveValue("佐井村");

    await user.click(screen.getByRole("button", { name: "決定" }));

    const params = {
      area: "aomori",
      populationLowerLimit: "200",
      populationUpperLimit: "500",
      islandSetting: "only_islands",
      keywords: "佐井村",
    };

    await user.click(screen.getByRole("button", { name: "探索" }));
    expect(mockFn).toHaveBeenCalledWith(params);
  });

  it("人口の最小値が最大値より大きい場合、探索ボタンは無効になる", async () => {
    render(<VillageSearchForm onSearch={mockFn} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    const populationLowerLimitTextbox = screen.getByRole("spinbutton", {
      name: "最小：",
    });
    await user.clear(populationLowerLimitTextbox);
    await user.type(populationLowerLimitTextbox, "200");
    const populationUpperLimitTextbox = screen.getByRole("spinbutton", {
      name: "最大：",
    });
    await user.clear(populationUpperLimitTextbox);
    await user.type(populationUpperLimitTextbox, "100");

    expect(
      screen.getByText("最大値が最小値より小さいです"),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "決定" })).toBeDisabled();
  });

  it("人口の最小値が1人未満の場合、探索ボタンは無効になる", async () => {
    render(<VillageSearchForm onSearch={mockFn} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    const populationLowerLimitTextbox = screen.getByRole("spinbutton", {
      name: "最小：",
    });
    await user.clear(populationLowerLimitTextbox);
    await user.type(populationLowerLimitTextbox, "0");
    const populationUpperLimitTextbox = screen.getByRole("spinbutton", {
      name: "最大：",
    });
    await user.clear(populationUpperLimitTextbox);
    await user.type(populationUpperLimitTextbox, "100");

    expect(screen.getByText("最小値が1人未満です")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "決定" })).toBeDisabled();
  });

  it("人口の最大値が1人未満の場合、探索ボタンは無効になる", async () => {
    render(<VillageSearchForm onSearch={mockFn} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    const populationLowerLimitTextbox = screen.getByRole("spinbutton", {
      name: "最小：",
    });
    await user.clear(populationLowerLimitTextbox);
    await user.type(populationLowerLimitTextbox, "10");
    const populationUpperLimitTextbox = screen.getByRole("spinbutton", {
      name: "最大：",
    });
    await user.clear(populationUpperLimitTextbox);
    await user.type(populationUpperLimitTextbox, "0");

    expect(screen.getByText("最大値が1人未満です")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "決定" })).toBeDisabled();
  });

  it("人口の最小値が10000人を超えている場合、探索ボタンは無効になる", async () => {
    render(<VillageSearchForm onSearch={mockFn} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    const populationLowerLimitTextbox = screen.getByRole("spinbutton", {
      name: "最小：",
    });
    await user.clear(populationLowerLimitTextbox);
    await user.type(populationLowerLimitTextbox, "10001");

    expect(
      screen.getByText("最小値が10000人を超えています"),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "決定" })).toBeDisabled();
  });

  it("人口の最大値が10000人を超えている場合、探索ボタンは無効になる", async () => {
    render(<VillageSearchForm onSearch={mockFn} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    const populationUpperLimitTextbox = screen.getByRole("spinbutton", {
      name: "最大：",
    });
    await user.clear(populationUpperLimitTextbox);
    await user.type(populationUpperLimitTextbox, "10001");

    expect(
      screen.getByText("最大値が10000人を超えています"),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "決定" })).toBeDisabled();
  });

  it("人口の最小値が空欄の場合、探索ボタンは無効になる", async () => {
    render(<VillageSearchForm onSearch={mockFn} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    const populationLowerLimitTextbox = screen.getByRole("spinbutton", {
      name: "最小：",
    });
    await user.clear(populationLowerLimitTextbox);
    const populationUpperLimitTextbox = screen.getByRole("spinbutton", {
      name: "最大：",
    });
    await user.clear(populationUpperLimitTextbox);
    await user.type(populationUpperLimitTextbox, "100");

    expect(screen.getByRole("button", { name: "決定" })).toBeDisabled();
  });

  it("人口の最大値が空欄の場合、探索ボタンは無効になる", async () => {
    render(<VillageSearchForm onSearch={mockFn} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    const populationLowerLimitTextbox = screen.getByRole("spinbutton", {
      name: "最小：",
    });
    await user.clear(populationLowerLimitTextbox);
    await user.type(populationLowerLimitTextbox, "100");
    const populationUpperLimitTextbox = screen.getByRole("spinbutton", {
      name: "最大：",
    });
    await user.clear(populationUpperLimitTextbox);

    expect(screen.getByRole("button", { name: "決定" })).toBeDisabled();
  });
});
