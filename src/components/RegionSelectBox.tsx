import { prefectures, regions } from '@/lib/regions';
import Select from 'react-select';

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

export const RegionSelectBox = ({ region, onChange }: Props) => {
  return (
    <Select
      instanceId="selectbox"
      className="w-64 text-xl text-center my-0.5"
      placeholder="地域を選択"
      defaultValue={region ? { label: region, value: region } : null}
      isSearchable
      options={groupedOptions}
      onChange={(newValue) => onChange(newValue?.value ?? '')}
    />
  )
}