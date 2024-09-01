import { prefectures, regions } from '@/lib/regions';
import Select, { StylesConfig } from 'react-select';

const primaryColor = '#009250';
const palePrimaryColor = '#91DBB9';

type RegionOption = {
  value: string;
  label: string;
}

function isRegionOption(value: unknown): value is RegionOption {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const option = value as Record<keyof RegionOption, unknown>;
  if (typeof option.value !== 'string') {
    return false;
  }
  return typeof option.label === 'string';
}

const regionOptions = regions.map((region) => {
  return { value: region, label: region }
});

const prefOptions = prefectures.map((prefecture) => {
  return { value: prefecture, label: prefecture }
})

const groupedOptions = [
  {
    label: '全国',
    value: '全国',
  },
  {
    label: '地域',
    options: regionOptions,
  },
  {
    label: '都道府県',
    options: prefOptions,
  },
];

type Props = {
  region: string,
  onChange: (value: string) => void
}

const colourStyles: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    boxShadow: 'none',
    borderColor: 'green',
    "&:hover": {
      borderColor: 'green',
      backgroundColor: 'green',
      borderRadius: 4,
    },
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: 'green',

  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: 'green',
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused
        ? palePrimaryColor
        : isSelected
          ? primaryColor
          : undefined,
    }
  },
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: 'green'
  })
}

export const RegionSelectBox = ({ region, onChange }: Props) => {
  return (
    <Select
      instanceId="selectbox"
      className="w-64 text-xl text-center"
      placeholder="地域を選択"
      defaultValue={region ? { label: region, value: region } : null}
      isSearchable={false}
      options={groupedOptions}
      components={{
        IndicatorSeparator: () => null,
      }}
      onChange={
        (newOption) => {
          if (isRegionOption(newOption)) onChange(newOption.value)
        }
      }
      styles={colourStyles}
    />
  )
}
