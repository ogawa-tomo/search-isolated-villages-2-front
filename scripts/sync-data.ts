import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import dotenv from "dotenv";

import { facultyCategoryPathNames } from "@/lib/facultyCategories";
import { PrefectureJpName } from "@/types/Area";
import FacultyRecord from "@/types/FacultyRecord";
import VillageRecord from "@/types/VillageRecord";

dotenv.config({ path: ".env.local" });

const YEAR = 2020;

if (!process.env.BACKEND_INPUT_DATA_DIR) {
  throw new Error("環境変数 BACKEND_INPUT_DATA_DIR を設定してください");
}
const BACKEND_INPUT_DATA_DIR = process.env.BACKEND_INPUT_DATA_DIR;

const DATA_DIR = path.resolve(__dirname, "..", "src", "data");

const readCsv = (csvPath: string): Record<string, string>[] => {
  const csv = fs.readFileSync(csvPath, "utf8");
  return parse(csv, { columns: true, skip_empty_lines: true });
};

const writeJson = (jsonPath: string, data: unknown): void => {
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(data));
};

const syncVillages = (): void => {
  const rows = readCsv(
    path.join(BACKEND_INPUT_DATA_DIR, "villages", String(YEAR), "villages.csv"),
  );

  const records: VillageRecord[] = rows.map((row) => ({
    pref: row.pref as PrefectureJpName,
    city: row.city ?? "",
    district: row.district ?? "",
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    population: Number(row.population),
    size: Number(row.size),
    urbanPoint: Number(row.urban_point),
    isIsland: row.is_island === "True",
  }));

  writeJson(path.join(DATA_DIR, "villages.json"), records);
  console.log(`villages.json: ${records.length}件`);
};

const syncFaculties = (): void => {
  for (const facultyCategoryPathName of facultyCategoryPathNames) {
    const rows = readCsv(
      path.join(
        BACKEND_INPUT_DATA_DIR,
        facultyCategoryPathName,
        String(YEAR),
        `${facultyCategoryPathName}.csv`,
      ),
    );

    const records: FacultyRecord[] = rows.map((row) => ({
      name: row.name ?? "",
      pref: row.pref as PrefectureJpName,
      city: row.city ?? "",
      district: row.district ?? "",
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
      urbanPoint: Number(row.urban_point),
      isIsland: row.is_island === "True",
    }));

    writeJson(
      path.join(DATA_DIR, "faculties", `${facultyCategoryPathName}.json`),
      records,
    );
    console.log(
      `faculties/${facultyCategoryPathName}.json: ${records.length}件`,
    );
  }
};

syncVillages();
syncFaculties();
