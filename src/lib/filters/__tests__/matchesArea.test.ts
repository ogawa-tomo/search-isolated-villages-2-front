import { matchesArea } from "@/lib/filters/matchesArea";

describe("matchesArea", () => {
  it("全国が指定されたときは、都道府県によらずtrueを返す", () => {
    expect(matchesArea("東京都", "all_country")).toBe(true);
    expect(matchesArea("沖縄県", "all_country")).toBe(true);
  });

  it("都道府県が指定されたときは、一致する都道府県のみtrueを返す", () => {
    expect(matchesArea("東京都", "tokyo")).toBe(true);
    expect(matchesArea("神奈川県", "tokyo")).toBe(false);
  });

  it("地域が指定されたときは、その地域に属する都道府県のみtrueを返す", () => {
    expect(matchesArea("宮城県", "tohoku")).toBe(true);
    expect(matchesArea("東京都", "tohoku")).toBe(false);
  });

  it("地域内の都道府県すべてでtrueを返す(関東の例)", () => {
    const kantoPrefs = [
      "東京都",
      "埼玉県",
      "神奈川県",
      "千葉県",
      "群馬県",
      "栃木県",
      "茨城県",
    ] as const;

    kantoPrefs.forEach((pref) => {
      expect(matchesArea(pref, "kanto")).toBe(true);
    });
    expect(matchesArea("山梨県", "kanto")).toBe(false);
  });

  it("不正なエリア名が指定されたときは例外を投げる", () => {
    expect(() => matchesArea("東京都", "invalid" as never)).toThrow();
  });
});
