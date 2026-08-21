import { filterFaculties } from "@/lib/filters/filterFaculties";
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

const baseCriteria = {
  area: "all_country" as const,
  islandSetting: "include_islands" as const,
  keywords: "",
};

describe("filterFaculties", () => {
  it("都道府県が一致する施設のみ抽出する", () => {
    const tokyo = buildFaculty({ pref: "東京都" });
    const okinawa = buildFaculty({ pref: "沖縄県" });

    const result = filterFaculties([tokyo, okinawa], {
      ...baseCriteria,
      area: "tokyo",
    });

    expect(result).toEqual([tokyo]);
  });

  it("エリア(地域)が一致する施設のみ抽出する", () => {
    const kanagawa = buildFaculty({ pref: "神奈川県" });
    const okinawa = buildFaculty({ pref: "沖縄県" });

    const result = filterFaculties([kanagawa, okinawa], {
      ...baseCriteria,
      area: "kanto",
    });

    expect(result).toEqual([kanagawa]);
  });

  it("離島設定に一致する施設のみ抽出する", () => {
    const island = buildFaculty({ isIsland: true });
    const mainland = buildFaculty({ isIsland: false });

    const result = filterFaculties([island, mainland], {
      ...baseCriteria,
      islandSetting: "only_islands",
    });

    expect(result).toEqual([island]);
  });

  it("キーワードに一致する施設のみ抽出する", () => {
    const match = buildFaculty({ district: "初田牛" });
    const notMatch = buildFaculty({ district: "安牛" });

    const result = filterFaculties([match, notMatch], {
      ...baseCriteria,
      keywords: "初田牛",
    });

    expect(result).toEqual([match]);
  });
});
