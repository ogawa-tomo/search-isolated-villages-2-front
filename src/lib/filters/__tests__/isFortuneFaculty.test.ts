import { isFortuneFaculty } from "@/lib/filters/isFortuneFaculty";
import FacultyRecord from "@/types/FacultyRecord";

const buildFaculty = (
  override: Partial<FacultyRecord> = {},
): FacultyRecord => ({
  name: "根室線 初田牛駅",
  pref: "北海道",
  city: "根室市",
  district: "初田牛",
  latitude: 43.2,
  longitude: 145.32,
  urbanPoint: 237.3,
  isIsland: false,
  ...override,
});

describe("isFortuneFaculty", () => {
  it("都会度が10000未満の施設はtrue", () => {
    expect(isFortuneFaculty(buildFaculty({ urbanPoint: 9999.99 }))).toBe(true);
  });

  it("都会度が10000ちょうどの施設はfalse", () => {
    expect(isFortuneFaculty(buildFaculty({ urbanPoint: 10000 }))).toBe(false);
  });

  it("都会度が10000を超える施設はfalse", () => {
    expect(isFortuneFaculty(buildFaculty({ urbanPoint: 20000 }))).toBe(false);
  });
});
