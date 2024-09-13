import {
  assertIslandSettingEnName,
  islandSettings,
} from "@/lib/islandSettings";
import { IslandSetting, IslandSettingEnName } from "@/types/IslandSetting";

type Props = {
  defaultValue: IslandSetting;
  onChange: (value: IslandSettingEnName) => void;
};

export const IslandSettingFieldSet = ({ defaultValue, onChange }: Props) => {
  return (
    <fieldset className="leading-loose">
      <legend className="font-bold">離島設定</legend>
      {islandSettings.map((setting) => {
        return (
          <span
            key={setting.enName}
            className="mr-4 flex flex-row items-center"
          >
            <input
              id={setting.enName}
              type="radio"
              className="radio radio-sm mr-2"
              value={setting.enName}
              onChange={(e) => {
                assertIslandSettingEnName(e.target.value);
                onChange(e.target.value);
              }}
              checked={setting.enName === defaultValue.enName}
            />
            <label htmlFor={setting.enName}>{setting.jpName}</label>
          </span>
        );
      })}
    </fieldset>
  );
};
