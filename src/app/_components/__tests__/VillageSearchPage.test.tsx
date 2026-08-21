import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import selectEvent from "react-select-event";
import VillageSearchPage from "@/app/_components/VillageSearchPage";
import { fetchVillages } from "@/lib/fetchVillages";
import { getVillages } from "@/fixtures/villages";

// jest.mockの第一引数はSWCによるパスエイリアス解決の対象外のため、
// 実際のimport文（@/...）ではなく相対パスで指定する必要がある
jest.mock("../../../lib/fetchVillages");
jest.mock("../../../components/BaseMap", () => ({
  BaseMap: () => null,
}));

// UIから設定した条件が実際のフィルタ処理まで正しく伝わることを検証するテスト用の固定データ。
// jest.mockはJSON importにも同様に効くため、実データではなくこの固定データに差し替えられる。
jest.mock("../../../data/villages.json", () => [
  {
    pref: "青森県",
    city: "佐井村",
    district: "牛滝",
    latitude: 41,
    longitude: 140,
    population: 50,
    size: 5,
    urbanPoint: 100,
    isIsland: true,
  },
  {
    // 離島設定「離島のみ」で除外されることを確認する用（他の条件は1件目と同じ）
    pref: "青森県",
    city: "佐井村",
    district: "長後",
    latitude: 41,
    longitude: 140,
    population: 50,
    size: 5,
    urbanPoint: 100,
    isIsland: false,
  },
  {
    // 人口の範囲・キーワードで除外されることを確認する用
    pref: "青森県",
    city: "弘前市",
    district: "城東",
    latitude: 41,
    longitude: 140,
    population: 5000,
    size: 5,
    urbanPoint: 100,
    isIsland: false,
  },
  {
    // 地域で除外されることを確認する用
    pref: "北海道",
    city: "稚内市",
    district: "中央",
    latitude: 45,
    longitude: 140,
    population: 50,
    size: 5,
    urbanPoint: 100,
    isIsland: false,
  },
]);

const mockedFetchVillages = jest.mocked(fetchVillages);

const user = userEvent.setup();

HTMLDialogElement.prototype.showModal = jest.fn(function mock(
  this: HTMLDialogElement,
) {
  this.open = true;
});
HTMLDialogElement.prototype.close = jest.fn(function mock(
  this: HTMLDialogElement,
) {
  this.open = false;
});

const searchHokkaido = async () => {
  render(<VillageSearchPage />);

  const areaSelectBox = screen.getByRole("combobox");
  await selectEvent.select(areaSelectBox, "北海道");
  await user.click(screen.getByRole("button", { name: "探索" }));
};

describe("VillageSearchPage", () => {
  beforeEach(() => {
    mockedFetchVillages.mockReset();
  });

  // フォーム操作の手数が多く、並列実行時のリソース競合でデフォルトの5秒タイムアウトを超えることがあるため延長する
  it("フォームで指定した条件（地域・人口範囲・離島設定・キーワード）で実際に絞り込まれる", async () => {
    // このテストだけはfetchVillagesの自動モックを外し、実装（と上でモックした固定データ）を使う
    mockedFetchVillages.mockImplementation(
      jest.requireActual("../../../lib/fetchVillages").fetchVillages,
    );

    render(<VillageSearchPage />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));

    const populationLowerLimitTextbox = screen.getByRole("spinbutton", {
      name: "最小：",
    });
    await user.clear(populationLowerLimitTextbox);
    await user.type(populationLowerLimitTextbox, "1");
    const populationUpperLimitTextbox = screen.getByRole("spinbutton", {
      name: "最大：",
    });
    await user.clear(populationUpperLimitTextbox);
    await user.type(populationUpperLimitTextbox, "100");

    await user.click(screen.getByLabelText("離島のみ"));

    await user.type(
      screen.getByRole("textbox", { name: "キーワード絞り込み" }),
      "佐井村",
    );

    await user.click(screen.getByRole("button", { name: "決定" }));
    await user.click(screen.getByRole("button", { name: "探索" }));

    expect(await screen.findByText("青森県 佐井村 牛滝")).toBeInTheDocument();
    expect(screen.queryByText("青森県 佐井村 長後")).not.toBeInTheDocument();
    expect(screen.queryByText("青森県 弘前市 城東")).not.toBeInTheDocument();
    expect(screen.queryByText("北海道 稚内市 中央")).not.toBeInTheDocument();
  }, 15000);

  it("集落の取得に成功した場合、検索結果を一覧表示する", async () => {
    mockedFetchVillages.mockResolvedValue({ villages: getVillages(2) });

    await searchHokkaido();

    expect(await screen.findByText("北海道 稚内市 地区1")).toBeInTheDocument();
    expect(screen.getByText("北海道 稚内市 地区2")).toBeInTheDocument();
  });

  it("集落の取得に失敗した場合、エラーメッセージを表示する", async () => {
    mockedFetchVillages.mockRejectedValue(new Error("failed"));

    await searchHokkaido();

    expect(
      await screen.findByText("集落の取得に失敗しました。", { exact: false }),
    ).toBeInTheDocument();
  });

  it("条件に合う集落が見つからなかった場合、メッセージを表示する", async () => {
    mockedFetchVillages.mockResolvedValue({ villages: [] });

    await searchHokkaido();

    expect(
      await screen.findByText("条件に合う集落が見つかりませんでした。"),
    ).toBeInTheDocument();
  });
});
