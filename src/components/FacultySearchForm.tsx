'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import FacultySearchParams from '@/types/facultySearchParams'
import { RegionSelectBox } from './RegionSelectBox';
import { IslandSettingFieldSet } from './IslandSettingFieldSet';
import { FacultyCategoryPathName } from '@/types/FacultyCategory';

type Props = {
  facultyCategoryPathName: FacultyCategoryPathName;
  inputRegion?: string;
  inputIslandSetting?: string;
  inputKeyWords?: string;
}

const defaultValues = {
  region: '',
  islandSetting: '離島を含まない',
  keywords: '',
}

const FacultySearchForm = ({
  facultyCategoryPathName,
  inputRegion = defaultValues.region,
  inputIslandSetting = defaultValues.islandSetting,
  inputKeyWords = defaultValues.keywords,
}: Props) => {
  const [region, setRegion] = useState(inputRegion);
  const [islandSetting, setIslandSetting] = useState(inputIslandSetting);
  const [keyWords, setKeyWords] = useState(inputKeyWords);
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const setDefaultValue = () => {
    setIslandSetting(defaultValues.islandSetting);
    setKeyWords(defaultValues.keywords);
  };

  const searchPath = (facultySearchParams: FacultySearchParams): string => {
    const params = new URLSearchParams(facultySearchParams);
    return `/${facultyCategoryPathName}/?${params.toString()}`;
  };

  const onButtonClick = () => {
    router.push(
      searchPath({
        region,
        islandSetting,
        keyWords,
        page: '1'
      })
    );
  };

  return (
    <>
      <div className="flex flex-col items-center" id='modalRoot'>
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
            <div className='flex justify-end'>
              <div className="modal-action">
                <button className="btn" onClick={setDefaultValue}>
                  デフォルト値に戻す
                </button>
              </div>
              <div className="w-2" />
              <div className="modal-action">
                <form method='dialog'>
                  <button className='btn'>閉じる</button>
                </form>
              </div>
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

export default FacultySearchForm;
