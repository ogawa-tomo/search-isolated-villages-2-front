import {
  allCountry,
  areaEnNames,
  areas,
  prefectures,
  regions,
} from "@/lib/areas";

export type Prefecture = (typeof prefectures)[number];

const prefectureJpNames = prefectures.map((prefecture) => prefecture.jpName);

export type PrefectureJpName = (typeof prefectureJpNames)[number];

export type Region = (typeof regions)[number];

export type Area = (typeof areas)[number];

const areaJpNames = areas.map((area) => area.jpName);

export type AreaJpName = (typeof areaJpNames)[number];

export type AreaEnName = (typeof areaEnNames)[number];
