'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VillageSearchParams from '@/types/villageSearchParams';
import { RegionSelectBox } from './RegionSelectBox';

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
  const islandSettings = ['離島を含まない', '離島を含む', '離島のみ'];
  const [islandSetting, setIslandSetting] = useState(inputIslandSetting);
  const [keyWords, setKeyWords] = useState(inputKeyWords);
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
          onClick={() =>
            (
              document.getElementById(
                'detailed-conditions-modal'
              ) as HTMLDialogElement
            ).showModal()
          }
        >
          詳細条件
        </button>
        <dialog id="detailed-conditions-modal" className="modal">
          <div className="modal-box">
            <h2>詳細条件</h2>
            <br />
            <fieldset>
              <legend>人口</legend>
              <label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  className="input input-bordered input-sm w-24 rounded-md invalid:input-error"
                  value={populationLowerLimit}
                  onChange={(e) => setPopulationLowerLimit(e.target.value)}
                />
              </label>
              人～
              <label>
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
            </fieldset>
            <br />
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
                      onChange={(e) => setIslandSetting(e.target.value)}
                      checked={setting === islandSetting}
                    />
                    <label htmlFor={setting}>{setting}</label>
                  </span>
                );
              })}
            </fieldset>
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
              <form method="dialog">
                <button className="btn">閉じる</button>
              </form>
            </div>
          </div>
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
