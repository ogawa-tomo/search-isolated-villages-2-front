import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import selectEvent from "react-select-event";
import FacultySearchPage from "@/app/[facultyCategoryPathName]/_components/FacultySearchPage";
import { fetchFaculties } from "@/lib/fetchFaculties";
import { facultyCategories } from "@/lib/facultyCategories";
import { getPostOffices } from "@/fixtures/post_offices";

// jest.mockの第一引数はSWCによるパスエイリアス解決の対象外のため、
// 実際のimport文（@/...）ではなく相対パスで指定する必要がある
jest.mock("../../../../lib/fetchFaculties");
jest.mock("../../../../components/BaseMap", () => ({
  BaseMap: () => null,
}));

// UIから設定した条件が実際のフィルタ処理まで正しく伝わることを検証するテスト用の固定データ。
// jest.mockはJSON importにも同様に効くため、実データではなくこの固定データに差し替えられる。
jest.mock("../../../../data/faculties/post_office.json", () => [
  {
    name: "佐井郵便局",
    pref: "青森県",
    city: "佐井村",
    district: "牛滝",
    latitude: 41,
    longitude: 140,
    urbanPoint: 100,
    isIsland: true,
  },
  {
    // 離島設定「離島のみ」で除外されることを確認する用（他の条件は1件目と同じ）
    name: "佐井郵便局2",
    pref: "青森県",
    city: "佐井村",
    district: "長後",
    latitude: 41,
    longitude: 140,
    urbanPoint: 100,
    isIsland: false,
  },
  {
    // キーワードで除外されることを確認する用
    name: "弘前郵便局",
    pref: "青森県",
    city: "弘前市",
    district: "城東",
    latitude: 41,
    longitude: 140,
    urbanPoint: 100,
    isIsland: false,
  },
  {
    // 地域で除外されることを確認する用
    name: "稚内郵便局",
    pref: "北海道",
    city: "稚内市",
    district: "中央",
    latitude: 45,
    longitude: 140,
    urbanPoint: 100,
    isIsland: false,
  },
]);

const mockedFetchFaculties = jest.mocked(fetchFaculties);

const postOfficeCategory = facultyCategories.find(
  (category) => category.pathName === "post_office",
)!;

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
  render(<FacultySearchPage facultyCategory={postOfficeCategory} />);

  const areaSelectBox = screen.getByRole("combobox");
  await selectEvent.select(areaSelectBox, "北海道");
  await user.click(screen.getByRole("button", { name: "探索" }));
};

describe("FacultySearchPage", () => {
  beforeEach(() => {
    mockedFetchFaculties.mockReset();
  });

  // フォーム操作の手数が多く、並列実行時のリソース競合でデフォルトの5秒タイムアウトを超えることがあるため延長する
  it("フォームで指定した条件（地域・離島設定・キーワード）で実際に絞り込まれる", async () => {
    // このテストだけはfetchFacultiesの自動モックを外し、実装（と上でモックした固定データ）を使う
    mockedFetchFaculties.mockImplementation(
      jest.requireActual("../../../../lib/fetchFaculties").fetchFaculties,
    );

    render(<FacultySearchPage facultyCategory={postOfficeCategory} />);

    const areaSelectBox = screen.getByRole("combobox");
    await selectEvent.select(areaSelectBox, "青森県");

    await user.click(screen.getByRole("button", { name: "詳細条件" }));
    await user.click(screen.getByLabelText("離島のみ"));
    await user.type(
      screen.getByRole("textbox", { name: "キーワード絞り込み" }),
      "佐井村",
    );
    await user.click(screen.getByRole("button", { name: "決定" }));
    await user.click(screen.getByRole("button", { name: "探索" }));

    expect(await screen.findByText("佐井郵便局")).toBeInTheDocument();
    expect(screen.queryByText("佐井郵便局2")).not.toBeInTheDocument();
    expect(screen.queryByText("弘前郵便局")).not.toBeInTheDocument();
    expect(screen.queryByText("稚内郵便局")).not.toBeInTheDocument();
  }, 15000);

  it("郵便局の取得に成功した場合、検索結果を一覧表示する", async () => {
    mockedFetchFaculties.mockResolvedValue({ faculties: getPostOffices(2) });

    await searchHokkaido();

    expect(await screen.findByText("稚内郵便局1")).toBeInTheDocument();
    expect(screen.getByText("稚内郵便局2")).toBeInTheDocument();
  });

  it("郵便局の取得に失敗した場合、エラーメッセージを表示する", async () => {
    mockedFetchFaculties.mockRejectedValue(new Error("failed"));

    await searchHokkaido();

    expect(
      await screen.findByText("郵便局の取得に失敗しました。", {
        exact: false,
      }),
    ).toBeInTheDocument();
  });

  it("条件に合う郵便局が見つからなかった場合、メッセージを表示する", async () => {
    mockedFetchFaculties.mockResolvedValue({ faculties: [] });

    await searchHokkaido();

    expect(
      await screen.findByText("条件に合う郵便局が見つかりませんでした。"),
    ).toBeInTheDocument();
  });
});
