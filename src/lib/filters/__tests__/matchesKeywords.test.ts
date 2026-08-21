import { matchesKeywords } from "@/lib/filters/matchesKeywords";

describe("matchesKeywords", () => {
  it("キーワードが空文字のときは常にtrueを返す", () => {
    expect(matchesKeywords("東京都小笠原村南鳥島", "")).toBe(true);
  });

  it("キーワードが住所に部分一致するときはtrueを返す", () => {
    expect(matchesKeywords("東京都小笠原村南鳥島", "小笠原")).toBe(true);
  });

  it("キーワードが住所に含まれないときはfalseを返す", () => {
    expect(matchesKeywords("東京都小笠原村南鳥島", "沖縄")).toBe(false);
  });

  it("スペース区切りの複数キーワードがすべて含まれるときのみtrueを返す", () => {
    expect(matchesKeywords("東京都小笠原村南鳥島", "東京都 南鳥島")).toBe(true);
    expect(matchesKeywords("東京都小笠原村南鳥島", "東京都 沖縄")).toBe(false);
  });
});
