import { isFortuneVillage } from "@/lib/filters/isFortuneVillage";
import VillageRecord from "@/types/VillageRecord";

const buildVillage = (
  override: Partial<VillageRecord> = {},
): VillageRecord => ({
  pref: "東京都",
  city: "小笠原村",
  district: "南鳥島",
  latitude: 24.29,
  longitude: 153.97,
  population: 9,
  size: 1,
  urbanPoint: 25.99,
  isIsland: true,
  ...override,
});

describe("isFortuneVillage", () => {
  it("人口50人以下かつ都会度30000未満の集落はtrue", () => {
    expect(
      isFortuneVillage(buildVillage({ population: 50, urbanPoint: 29999 })),
    ).toBe(true);
  });

  it("人口50人以下でも都会度が30000以上ならfalse(もう一方の条件も満たさない場合)", () => {
    expect(
      isFortuneVillage(
        buildVillage({ population: 50, size: 11, urbanPoint: 30000 }),
      ),
    ).toBe(false);
  });

  it("人口500人以下かつ面積10以下かつ都会度10000未満の集落はtrue", () => {
    expect(
      isFortuneVillage(
        buildVillage({ population: 500, size: 10, urbanPoint: 9999 }),
      ),
    ).toBe(true);
  });

  it("人口が501人だと2つ目の条件を満たさない", () => {
    expect(
      isFortuneVillage(
        buildVillage({ population: 501, size: 10, urbanPoint: 9999 }),
      ),
    ).toBe(false);
  });

  it("面積が11だと2つ目の条件を満たさない", () => {
    expect(
      isFortuneVillage(
        buildVillage({ population: 500, size: 11, urbanPoint: 9999 }),
      ),
    ).toBe(false);
  });

  it("都会度が10000ちょうどだと2つ目の条件を満たさない", () => {
    expect(
      isFortuneVillage(
        buildVillage({ population: 500, size: 10, urbanPoint: 10000 }),
      ),
    ).toBe(false);
  });

  it("どちらの条件も満たさない集落はfalse", () => {
    expect(
      isFortuneVillage(
        buildVillage({ population: 1000, size: 20, urbanPoint: 50000 }),
      ),
    ).toBe(false);
  });
});
