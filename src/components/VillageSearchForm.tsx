'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import VillageSearchParams from '@/types/villageSearchParams';
import { RegionSelectBox } from './RegionSelectBox';
import { IslandSettingFieldSet } from './IslandSettingFieldSet';

const searchPath = (villageSearchParams: VillageSearchParams): string => {
  const params = new URLSearchParams(villageSearchParams);
  return `/result?${params.toString()}`;
};

type Props = {
  inputRegion?: string,
  inputPopulationLowerLimit?: string,
  inputPopulationUpperLimit?: string,
  inputIslandSetting?: string,
  inputKeyWords?: string
}

const VillageSearchForm = ({
  inputRegion = '',
  inputPopulationLowerLimit = '1',
  inputPopulationUpperLimit = '10000',
  inputIslandSetting = '離島を含まない',
  inputKeyWords = '',
}: Props) => {
  const [region, setRegion] = useState(inputRegion);
  const [populationLowerLimit, setPopulationLowerLimit] = useState(inputPopulationLowerLimit);
  const [populationUpperLimit, setPopulationUpperLimit] = useState(inputPopulationUpperLimit);
  const [islandSetting, setIslandSetting] = useState(inputIslandSetting);
  const [keyWords, setKeyWords] = useState(inputKeyWords);
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const setDefaultValue = () => {
    setPopulationLowerLimit('1');
    setPopulationUpperLimit('10000');
    setIslandSetting('離島を含まない');
    setKeyWords('');
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
          onClick={() => {
            modalRef.current?.showModal();
          }}
        >
          詳細条件
        </button>
        <dialog className='modal' ref={modalRef}>
          <div className='modal-box'>
            <h2>詳細条件</h2>
            <br />
            <fieldset>
              <legend>人口</legend>
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
            <br />
            <IslandSettingFieldSet
              defaultValue={islandSetting}
              onChange={setIslandSetting}
            />
            <br />
            <label>
              キーワード絞り込み
              <input
                type="text"
                className="input input-bordered input-sm w-64 rounded-md"
                placeholder="例：〇〇村"
                value={keyWords}
                onChange={(e) => setKeyWords(e.target.value)}
              />
            </label>
            <div className="modal-action">
              <button className="btn" onClick={setDefaultValue}>
                デフォルト値に戻す
              </button>
              {/* <button className="btn" onClick={() => setModalIsOpen(false)}>閉じる</button> */}
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
