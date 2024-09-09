import { getRegionByEnName, prefectures, regions } from "@/lib/regions";
import clsx from "clsx";
import Select from "react-select";

type RegionOption = {
  value: string;
  label: string;
};

function isRegionOption(value: unknown): value is RegionOption {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const option = value as Record<keyof RegionOption, unknown>;
  if (typeof option.value !== "string") {
    return false;
  }
  return typeof option.label === "string";
}

const regionOptions: { value: string; label: string }[] = regions.map(
  (region) => {
    return { value: region.enName, label: region.jpName };
  },
);

const prefOptions: { value: string; label: string }[] = prefectures.map(
  (prefecture) => {
    return { value: prefecture.enName, label: prefecture.jpName };
  },
);

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
  region: string;
  onChange: (value: string) => void;
};

export const RegionSelectBox = ({ region, onChange }: Props) => {
  const regionObj = region ? getRegionByEnName(region) : "";
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
      className="w-64 text-xl text-center"
      placeholder="地域を選択"
      defaultValue={
        regionObj
          ? {
              label: regionObj.jpName as string,
              value: regionObj.enName as string,
            }
          : null
      }
      isSearchable={false}
      options={groupedOptions}
      components={{
        IndicatorSeparator: () => null,
      }}
      onChange={(newOption) => {
        if (isRegionOption(newOption)) onChange(newOption.value);
      }}
    />
  );
};
