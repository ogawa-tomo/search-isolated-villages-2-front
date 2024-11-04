"use client";

import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import VillageSearchParams from "@/types/VillageSearchParams";
import { AreaSelectBox } from "@/components/AreaSelectBox";
import { IslandSettingFieldSet } from "@/components/IslandSettingFieldSet";
import { DetailedConditionButton } from "@/components/DetailedConditionButton";
import { Area } from "@/types/Area";
import { assertAreaEnName, getAreaByEnName } from "@/lib/areas";
import { IslandSetting } from "@/types/IslandSetting";
import { getIslandSettingByEnName } from "@/lib/islandSettings";

const searchPath = (villageSearchParams: VillageSearchParams): string => {
  const params = new URLSearchParams(villageSearchParams);
  return `/?${params.toString()}`;
};

type Props = {
  inputArea?: Area;
  inputPopulationLowerLimit?: string;
  inputPopulationUpperLimit?: string;
  inputIslandSetting?: IslandSetting;
  inputKeywords?: string;
};

const defaultValues: {
  area: Area | undefined;
  populationLowerLimit: string;
  populationUpperLimit: string;
  islandSetting: IslandSetting;
  keywords: string;
} = {
  area: undefined,
  populationLowerLimit: "1",
  populationUpperLimit: "10000",
  islandSetting: {
    jpName: "離島を含まない",
    enName: "exclude_islands",
  },
  keywords: "",
};

const VillageSearchForm = ({
  inputArea = defaultValues.area,
  inputPopulationLowerLimit = defaultValues.populationLowerLimit,
  inputPopulationUpperLimit = defaultValues.populationUpperLimit,
  inputIslandSetting = defaultValues.islandSetting,
  inputKeywords = defaultValues.keywords,
}: Props) => {
  const [area, setArea] = useState<Area | undefined>(inputArea);
  const [populationLowerLimit, setPopulationLowerLimit] = useState(
    inputPopulationLowerLimit,
  );
  const [populationUpperLimit, setPopulationUpperLimit] = useState(
    inputPopulationUpperLimit,
  );
  const [islandSetting, setIslandSetting] =
    useState<IslandSetting>(inputIslandSetting);
  const [keywords, setKeywords] = useState(inputKeywords);
  const modalRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onButtonClick = () => {
    if (!area) return;
    router.push(
      searchPath({
        area: area.enName,
        populationLowerLimit,
        populationUpperLimit,
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
    populationLowerLimit !== defaultValues.populationLowerLimit ||
    populationUpperLimit !== defaultValues.populationUpperLimit ||
    islandSetting.enName !== defaultValues.islandSetting.enName ||
    keywords !== defaultValues.keywords;

  return (
    <>
      <div className="flex flex-col items-center">
        <AreaSelectBox area={area} onChange={onAreaChange} />
        <div className="h-3" />
        <DetailedConditionButton
          isModified={isModified}
          onClick={() => {
            modalRef.current?.showModal();
            inputRef.current?.blur();
          }}
        >
          詳細条件
        </DetailedConditionButton>
        <div className="h-3" />
        <dialog className="modal" ref={modalRef}>
          <div className="modal-box">
            <DetailedConditionsModalContent
              populationLowerLimit={populationLowerLimit}
              setPopulationLowerLimit={setPopulationLowerLimit}
              inputRef={inputRef}
              populationUpperLimit={populationUpperLimit}
              setPopulationUpperLimit={setPopulationUpperLimit}
              islandSetting={islandSetting}
              setIslandSetting={setIslandSetting}
              keywords={keywords}
              setKeywords={setKeywords}
            />
          </div>
        </dialog>
        <button
          className="btn btn-primary btn-sm h-10 w-64 rounded-md text-xl text-white"
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
  populationLowerLimit,
  setPopulationLowerLimit,
  inputRef,
  populationUpperLimit,
  setPopulationUpperLimit,
  islandSetting,
  setIslandSetting,
  keywords,
  setKeywords,
}: {
  populationLowerLimit: string;
  setPopulationLowerLimit: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement>;
  populationUpperLimit: string;
  setPopulationUpperLimit: Dispatch<SetStateAction<string>>;
  islandSetting: IslandSetting;
  setIslandSetting: Dispatch<SetStateAction<IslandSetting>>;
  keywords: string;
  setKeywords: Dispatch<SetStateAction<string>>;
}) => {
  const setDefaultValue = () => {
    setPopulationLowerLimit(defaultValues.populationLowerLimit);
    setPopulationUpperLimit(defaultValues.populationUpperLimit);
    setIslandSetting(defaultValues.islandSetting);
    setKeywords(defaultValues.keywords);
  };

  return (
    <>
      <div className="my-4 border-b-2 pb-2 text-2xl font-bold">詳細条件</div>
      <fieldset className="my-4 leading-loose">
        <legend className="font-bold">人口</legend>
        <div>
          <label>
            最小：
            <input
              type="number"
              min="1"
              max="10000"
              className="input input-bordered input-sm w-24 rounded-md invalid:input-error"
              value={populationLowerLimit}
              onChange={(e) => setPopulationLowerLimit(e.target.value)}
              ref={inputRef}
            />
          </label>
          人
        </div>
        <div>
          <label>
            最大：
            <input
              type="number"
              min="1"
              max="10000"
              className="input input-bordered input-sm w-24 rounded-md invalid:input-error"
              value={populationUpperLimit}
              onChange={(e) => setPopulationUpperLimit(e.target.value)}
            />
          </label>
          人
        </div>
      </fieldset>
      <div className="border border-dashed" />
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
            <button className="h-10 w-32 rounded bg-primary-color text-white">
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

export default VillageSearchForm;
