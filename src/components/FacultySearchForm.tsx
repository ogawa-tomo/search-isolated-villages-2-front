'use client';

import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import FacultySearchParams from '@/types/facultySearchParams'
import { RegionSelectBox } from './RegionSelectBox';
import { IslandSettingFieldSet } from './IslandSettingFieldSet';
import { FacultyCategoryPathName } from '@/types/FacultyCategory';
import { DetailedConditionButton } from './DetailedConditionButton';

type Props = {
  facultyCategoryPathName: FacultyCategoryPathName;
  inputRegion?: string;
  inputIslandSetting?: string;
  inputKeywords?: string;
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
  inputKeywords = defaultValues.keywords,
}: Props) => {
  const [region, setRegion] = useState(inputRegion);
  const [islandSetting, setIslandSetting] = useState(inputIslandSetting);
  const [keywords, setKeywords] = useState(inputKeywords);
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const searchPath = (facultySearchParams: FacultySearchParams): string => {
    const params = new URLSearchParams(facultySearchParams);
    return `/${facultyCategoryPathName}/?${params.toString()}`;
  };

  const onButtonClick = () => {
    router.push(
      searchPath({
        region,
        islandSetting,
        keywords,
        page: '1'
      })
    );
  };

  const isModified =
    islandSetting !== defaultValues.islandSetting ||
    keywords !== defaultValues.keywords;

  return (
    <>
      <div className="flex flex-col items-center" id='modalRoot'>
        <RegionSelectBox
          region={region}
          onChange={setRegion}
        />
        <div className='h-3' />
        <DetailedConditionButton
          isModified={isModified}
          onClick={() => modalRef.current?.showModal()}
        >
          詳細条件
        </DetailedConditionButton>
        <dialog className='modal' ref={modalRef}>
          <div className='modal-box'>
            <DetailedConditionsModalContent
              islandSetting={islandSetting}
              setIslandSetting={setIslandSetting}
              keywords={keywords}
              setKeywords={setKeywords}
            />
          </div>
        </dialog>
        <div className='h-3' />
        <button
          className="btn btn-primary w-64 btn-sm h-10 text-white rounded-md text-xl"
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

const DetailedConditionsModalContent = ({
  islandSetting,
  setIslandSetting,
  keywords,
  setKeywords,
}: {
  islandSetting: string;
  setIslandSetting: Dispatch<SetStateAction<string>>;
  keywords: string;
  setKeywords: Dispatch<SetStateAction<string>>;
}) => {
  const setDefaultValue = () => {
    setIslandSetting(defaultValues.islandSetting);
    setKeywords(defaultValues.keywords);
  };

  return (
    <>
      <div className='text-2xl font-bold pb-2 border-b-2 my-4'>詳細条件</div>

      <div className='my-4'>
        <IslandSettingFieldSet
          defaultValue={islandSetting}
          onChange={setIslandSetting}
        />
      </div>
      <div className='border border-dashed' />
      <div className='my-4 leading-loose'>
        <label>
          <span className='font-bold'>キーワード絞り込み</span>
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
      <div className='border border-dashed' />
      <div className='flex justify-between'>
        <div className="modal-action">
          <form method='dialog'>
            <button className='bg-primary-color w-32 h-10 text-white rounded'>決定</button>
          </form>
        </div>
        <div className="modal-action">
          <button className='text-gray-500 underline' onClick={setDefaultValue}>
            デフォルト値に戻す
          </button>
        </div>
      </div>
    </>
  )
}

export default FacultySearchForm;
