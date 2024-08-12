'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import VillageSearchParams from '@/types/villageSearchParams';
import { RegionSelectBox } from './RegionSelectBox';
import { IslandSettingFieldSet } from './IslandSettingFieldSet';

const searchPath = (villageSearchParams: VillageSearchParams): string => {
  const params = new URLSearchParams(villageSearchParams);
  return `/?${params.toString()}`;
};

type Props = {
  inputRegion?: string,
  inputPopulationLowerLimit?: string,
  inputPopulationUpperLimit?: string,
  inputIslandSetting?: string,
  inputKeyWords?: string
}

const defaultValues = {
  region: '',
  populationLowerLimit: '1',
  populationUpperLimit: '10000',
  islandSetting: '離島を含まない',
  keywords: '',
}

const VillageSearchForm = ({
  inputRegion = defaultValues.region,
  inputPopulationLowerLimit = defaultValues.populationLowerLimit,
  inputPopulationUpperLimit = defaultValues.populationUpperLimit,
  inputIslandSetting = defaultValues.islandSetting,
  inputKeyWords = defaultValues.keywords,
}: Props) => {
  const [region, setRegion] = useState(inputRegion);
  const [populationLowerLimit, setPopulationLowerLimit] = useState(inputPopulationLowerLimit);
  const [populationUpperLimit, setPopulationUpperLimit] = useState(inputPopulationUpperLimit);
  const [islandSetting, setIslandSetting] = useState(inputIslandSetting);
  const [keyWords, setKeyWords] = useState(inputKeyWords);
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const setDefaultValue = () => {
    setPopulationLowerLimit(defaultValues.populationLowerLimit);
    setPopulationUpperLimit(defaultValues.populationUpperLimit);
    setIslandSetting(defaultValues.islandSetting);
    setKeyWords(defaultValues.keywords);
  };

  const onButtonClick = () => {
    router.push(
      searchPath({
        region,
        populationLowerLimit,
        populationUpperLimit,
        islandSetting,
        keyWords,
        page: '1'
      })
    );
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <RegionSelectBox
          region={region}
          onChange={setRegion}
        />
        <button
          className="btn btn-sm h-10 w-64 rounded-md text-lg my-0.5"
          onClick={() => modalRef.current?.showModal()}
        >
          詳細条件
        </button>
        <dialog className='modal' ref={modalRef}>
          <div className='modal-box'>
            <h2>詳細条件</h2>
            <fieldset className='py-0.5'>
              <legend className='font-bold'>人口</legend>
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
            <IslandSettingFieldSet
              defaultValue={islandSetting}
              onChange={setIslandSetting}
            />
            <p>
              <label>
                <span className='font-bold'>キーワード絞り込み</span>
                <br />
                <input
                  type="text"
                  className="input input-bordered input-sm w-64 rounded-md"
                  placeholder="例：〇〇村"
                  value={keyWords}
                  onChange={(e) => setKeyWords(e.target.value)}
                />
              </label>
            </p>
            <div className="modal-action">
              <button className="btn" onClick={setDefaultValue}>
                デフォルト値に戻す
              </button>
            </div>
          </div>
          <form method='dialog' className='modal-backdrop'>
            <button>close</button>
          </form>
        </dialog>
        <button
          className="btn btn-primary w-64 btn-sm h-10 text-white rounded-md text-xl my-0.5"
          type="button"
          onClick={onButtonClick}
          disabled={!region}
        >
          探索
        </button>
      </div>
    </>
  );
};

export default VillageSearchForm;
