"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import FacultySearchParams from "@/types/facultySearchParams";
import { AreaSelectBox } from "./AreaSelectBox";
import { IslandSettingFieldSet } from "./IslandSettingFieldSet";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import { DetailedConditionButton } from "./DetailedConditionButton";
import { Area } from "@/types/Area";
import { assertAreaEnName, getAreaByEnName } from "@/lib/areas";
import { IslandSetting } from "@/types/IslandSetting";
import { getIslandSettingByEnName } from "@/lib/islandSettings";

type Props = {
  facultyCategoryPathName: FacultyCategoryPathName;
  inputArea?: Area;
  inputIslandSetting?: IslandSetting;
  inputKeywords?: string;
};

const defaultValues: {
  area: Area | undefined;
  islandSetting: IslandSetting;
  keywords: string;
} = {
  area: undefined,
  islandSetting: {
    jpName: "離島を含まない",
    enName: "exclude_islands",
  },
  keywords: "",
};

const FacultySearchForm = ({
  facultyCategoryPathName,
  inputArea = defaultValues.area,
  inputIslandSetting = defaultValues.islandSetting,
  inputKeywords = defaultValues.keywords,
}: Props) => {
  const [area, setArea] = useState(inputArea);
  const [islandSetting, setIslandSetting] =
    useState<IslandSetting>(inputIslandSetting);
  const [keywords, setKeywords] = useState(inputKeywords);
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const searchPath = (facultySearchParams: FacultySearchParams): string => {
    const params = new URLSearchParams(facultySearchParams);
    return `/${facultyCategoryPathName}/?${params.toString()}`;
  };

  const onButtonClick = () => {
    if (!area) return;
    router.push(
      searchPath({
        area: area.enName,
        islandSetting: islandSetting.enName,
        keywords,
        page: "1",
      }),
    );
  };

  const onAreaChange = (optionValue: string) => {
    assertAreaEnName(optionValue);
    const area = getAreaByEnName(optionValue);
    setArea(area);
  };

  const isModified =
    islandSetting !== defaultValues.islandSetting ||
    keywords !== defaultValues.keywords;

  return (
    <>
      <div className="flex flex-col items-center" id="modalRoot">
        <AreaSelectBox area={area} onChange={onAreaChange} />
        <div className="h-3" />
        <DetailedConditionButton
          isModified={isModified}
          onClick={() => modalRef.current?.showModal()}
        >
          詳細条件
        </DetailedConditionButton>
        <dialog className="modal" ref={modalRef}>
          <div className="modal-box">
            <DetailedConditionsModalContent
              islandSetting={islandSetting}
              setIslandSetting={setIslandSetting}
              keywords={keywords}
              setKeywords={setKeywords}
            />
          </div>
        </dialog>
        <div className="h-3" />
        <button
          className="btn btn-primary w-64 btn-sm h-10 text-white rounded-md text-xl"
          type="button"
          onClick={onButtonClick}
          disabled={!area}
        >
          探索
        </button>
      </div>
    </>
  );
};

const DetailedConditionsModalContent = ({
  islandSetting,
  setIslandSetting,
  keywords,
  setKeywords,
}: {
  islandSetting: IslandSetting;
  setIslandSetting: Dispatch<SetStateAction<IslandSetting>>;
  keywords: string;
  setKeywords: Dispatch<SetStateAction<string>>;
}) => {
  const setDefaultValue = () => {
    setIslandSetting(defaultValues.islandSetting);
    setKeywords(defaultValues.keywords);
  };

  return (
    <>
      <div className="text-2xl font-bold pb-2 border-b-2 my-4">詳細条件</div>

      <div className="my-4">
        <IslandSettingFieldSet
          defaultValue={islandSetting}
          onChange={(value) =>
            setIslandSetting(getIslandSettingByEnName(value))
          }
        />
      </div>
      <div className="border border-dashed" />
      <div className="my-4 leading-loose">
        <label>
          <span className="font-bold">キーワード絞り込み</span>
          <br />
          <input
            type="text"
            className="input input-bordered input-sm w-64 rounded-md"
            placeholder="例：〇〇村"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </label>
      </div>
      <div className="border border-dashed" />
      <div className="flex justify-between">
        <div className="modal-action">
          <form method="dialog">
            <button className="bg-primary-color w-32 h-10 text-white rounded">
              決定
            </button>
          </form>
        </div>
        <div className="modal-action">
          <button className="text-gray-500 underline" onClick={setDefaultValue}>
            デフォルト値に戻す
          </button>
        </div>
      </div>
    </>
  );
};

export default FacultySearchForm;
