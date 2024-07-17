'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
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

const FacultySearchForm = ({
  facultyCategoryPathName,
  inputRegion = '',
  inputIslandSetting = '離島を含まない',
  inputKeyWords = '',
}: Props) => {
  const [region, setRegion] = useState(inputRegion);
  const [islandSetting, setIslandSetting] = useState(inputIslandSetting);
  const [keyWords, setKeyWords] = useState(inputKeyWords);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const router = useRouter();

  const appElementObject: { appElement?: HTMLElement } = {}
  if (typeof window === 'object') {
    appElementObject.appElement = document.getElementById('modalRoot') ?? undefined;
  }

  const setDefaultValue = () => {
    setIslandSetting('離島を含まない');
    setKeyWords('');
  };

  const searchPath = (facultySearchParams: FacultySearchParams): string => {
    const params = new URLSearchParams(facultySearchParams);
    return `/${facultyCategoryPathName}/result?${params.toString()}`;
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
          onClick={() => setModalIsOpen(true)}
        >
          詳細条件
        </button>
        <Modal
          isOpen={modalIsOpen}
          className="modal-box mx-auto"
          {...appElementObject}
        >
          <h2>詳細条件</h2>
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
            <button className="btn" onClick={() => setModalIsOpen(false)}>閉じる</button>
          </div>
        </Modal>

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
