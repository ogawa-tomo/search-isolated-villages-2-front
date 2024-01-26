const islandSettings = ['離島を含まない', '離島を含む', '離島のみ'];

type Props = {
  defaultValue: string,
  onChange: (value: string) => void
}

export const IslandSettingFieldSet = ({ defaultValue, onChange }: Props) => {
  return (
    <fieldset>
      <legend>離島設定</legend>
      {islandSettings.map((setting) => {
        return (
          <span key={setting} className="mr-4 flex flex-row items-center">
            <input
              id={setting}
              type="radio"
              className="radio radio-sm mr-2"
              value={setting}
              onChange={(e) => onChange(e.target.value)}
              checked={setting === defaultValue}
            />
            <label htmlFor={setting}>{setting}</label>
          </span>
        );
      })}
    </fieldset>
  )
}