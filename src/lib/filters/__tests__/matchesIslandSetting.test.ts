import { matchesIslandSetting } from "@/lib/filters/matchesIslandSetting";

describe("matchesIslandSetting", () => {
  it("離島を含む が指定されたときは、離島かどうかによらずtrueを返す", () => {
    expect(matchesIslandSetting(true, "include_islands")).toBe(true);
    expect(matchesIslandSetting(false, "include_islands")).toBe(true);
  });

  it("離島を含まない が指定されたときは、離島でない場合のみtrueを返す", () => {
    expect(matchesIslandSetting(false, "exclude_islands")).toBe(true);
    expect(matchesIslandSetting(true, "exclude_islands")).toBe(false);
  });

  it("離島のみ が指定されたときは、離島の場合のみtrueを返す", () => {
    expect(matchesIslandSetting(true, "only_islands")).toBe(true);
    expect(matchesIslandSetting(false, "only_islands")).toBe(false);
  });
});
