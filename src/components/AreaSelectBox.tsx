import { prefectures, regions } from "@/lib/areas";
import { Area } from "@/types/Area";
import clsx from "clsx";
import Select from "react-select";

const regionOptions = regions.map((region) => {
  return { value: region.enName, label: region.jpName };
});

const prefOptions = prefectures.map((prefecture) => {
  return { value: prefecture.enName, label: prefecture.jpName };
});

const groupedOptions = [
  {
    label: "全国",
    value: "all_country",
  },
  {
    label: "地域",
    options: regionOptions,
  },
  {
    label: "都道府県",
    options: prefOptions,
  },
];

type Props = {
  area?: Area;
  onChange: (value: string) => void;
};

export const AreaSelectBox = ({ area, onChange }: Props) => {
  return (
    <Select
      unstyled
      classNames={{
        control: () =>
          "border border-primary-color rounded-md hover:bg-lightened-primary-color",
        option: (state) => {
          return clsx(
            state.isSelected
              ? "bg-primary-color text-white"
              : state.isFocused
                ? "bg-lightened-primary-color"
                : "bg-white",
            "py-2",
          );
        },
        singleValue: () => "text-primary-color",
        dropdownIndicator: () => "px-2 text-primary-color",
        placeholder: () => "text-primary-color",
        groupHeading: () => "bg-white text-sm py-2 text-gray-400",
        menuList: () => "border border-grey-400 rounded-md my-1",
      }}
      instanceId="selectbox"
      className="w-64 text-center text-xl"
      placeholder="地域を選択"
      defaultValue={
        area
          ? {
              label: area.jpName as string,
              value: area.enName as string,
            }
          : null
      }
      isSearchable={false}
      options={groupedOptions}
      components={{
        IndicatorSeparator: () => null,
      }}
      onChange={(newOption) => {
        newOption && onChange(newOption.value);
      }}
    />
  );
};
