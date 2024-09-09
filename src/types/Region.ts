import { allCountry, prefectures, regions } from "@/lib/regions";

export type Prefecture = (typeof prefectures)[number];

const prefectureJpNames = prefectures.map((prefecture) => prefecture.jpName);

export type PrefectureJpName = (typeof prefectureJpNames)[number];

export type Region = (typeof regions)[number];

const allRegionOptions = [...prefectures, ...regions, allCountry];
