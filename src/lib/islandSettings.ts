import { IslandSettingEnName } from "@/types/IslandSetting";

export const islandSettings = [
  {
    jpName: "離島を含まない",
    enName: "exclude_islands",
  },
  {
    jpName: "離島を含む",
    enName: "include_islands",
  },
  {
    jpName: "離島のみ",
    enName: "only_islands",
  },
] as const;

export const islandSettingEnNames = islandSettings.map(
  (setting) => setting.enName,
);

export const getIslandSettingByEnName = (enName: IslandSettingEnName) => {
  const setting = islandSettings.find((setting) => setting.enName === enName);
  if (!setting) throw new Error("離島設定名ではありません");

  return setting;
};

export function assertIslandSettingEnName(
  name: string,
): asserts name is IslandSettingEnName {
  if ((islandSettingEnNames as string[]).includes(name)) return;

  throw new Error("離島設定名ではありません");
}
