import { islandSettingEnNames, islandSettings } from "@/lib/islandSettings";

export type IslandSetting = (typeof islandSettings)[number];

export type IslandSettingEnName = (typeof islandSettingEnNames)[number];
