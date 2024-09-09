import { islandSettings } from "@/lib/islandSettings";

type Props = {
  defaultValue: string;
  onChange: (value: string) => void;
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
              onChange={(e) => onChange(e.target.value)}
              checked={setting.enName === defaultValue}
            />
            <label htmlFor={setting.enName}>{setting.jpName}</label>
          </span>
        );
      })}
    </fieldset>
  );
};
