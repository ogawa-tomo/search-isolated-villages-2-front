'use client';

import Link from "next/link";
import { useState } from "react";
import Select from 'react-select';
import { useRouter } from 'next/navigation'
import villageSearchPath from '@/lib/villageSearchPath'



const regionOptions = [
  { value: '北海道', label: '北海道'},
  { value: '東北', label: '東北'},
  { value: '関東', label: '関東'},
  { value: '北陸', label: '北陸'},
  { value: '中部', label: '中部'},
  { value: '近畿', label: '近畿'},
  { value: '中国', label: '中国'},
  { value: '四国', label: '四国'},
  { value: '九州', label: '九州'},
  { value: '沖縄', label: '沖縄'},
]

const prefOptions = [
  { value: '北海道', label: '北海道' },
  { value: '青森県', label: '青森県' },
  { value: '岩手県', label: '岩手県' },
  { value: '宮城県', label: '宮城県' },
  { value: '秋田県', label: '秋田県' },
  { value: '山形県', label: '山形県' },
  { value: '福島県', label: '福島県' },
  { value: '茨城県', label: '茨城県' },
  { value: '栃木県', label: '栃木県' },
  { value: '群馬県', label: '群馬県' },
  { value: '埼玉県', label: '埼玉県' },
  { value: '千葉県', label: '千葉県' },
  { value: '東京都', label: '東京都' },
  { value: '神奈川県', label: '神奈川県' },
  { value: '新潟県', label: '新潟県' },
  { value: '富山県', label: '富山県' },
  { value: '石川県', label: '石川県' },
  { value: '福井県', label: '福井県' },
  { value: '山梨県', label: '山梨県' },
  { value: '長野県', label: '長野県' },
  { value: '岐阜県', label: '岐阜県' },
  { value: '静岡県', label: '静岡県' },
  { value: '愛知県', label: '愛知県' },
  { value: '三重県', label: '三重県' },
  { value: '滋賀県', label: '滋賀県' },
  { value: '京都府', label: '京都府' },
  { value: '大阪府', label: '大阪府' },
  { value: '兵庫県', label: '兵庫県' },
  { value: '奈良県', label: '奈良県' },
  { value: '和歌山県', label: '和歌山県' },
  { value: '鳥取県', label: '鳥取県' },
  { value: '島根県', label: '島根県' },
  { value: '岡山県', label: '岡山県' },
  { value: '広島県', label: '広島県' },
  { value: '山口県', label: '山口県' },
  { value: '徳島県', label: '徳島県' },
  { value: '香川県', label: '香川県' },
  { value: '愛媛県', label: '愛媛県' },
  { value: '高知県', label: '高知県' },
  { value: '福岡県', label: '福岡県' },
  { value: '佐賀県', label: '佐賀県' },
  { value: '長崎県', label: '長崎県' },
  { value: '熊本県', label: '熊本県' },
  { value: '大分県', label: '大分県' },
  { value: '宮崎県', label: '宮崎県' },
  { value: '鹿児島県', label: '鹿児島県' },
  { value: '沖縄県', label: '沖縄県' }
]

const groupedOptions = [
  {
    label: '全国',
    value: '全国'
  },
  {
    label: '地域',
    options: regionOptions,
  },
  {
    label: '都道府県',
    options: prefOptions,
  },
];

const searchPath = (
  region: string,
  populationLowerLimit: string,
  populationUpperLimit: string,
  islandSetting: string,
  keyWords: string
) => {
  const params = new URLSearchParams()
  params.append('region', region)
  params.append('population_lower_limit', populationLowerLimit)
  params.append('population_upper_limit', populationUpperLimit)
  params.append('island_setting', islandSetting)
  params.append('key_words', keyWords)
  params.append('offset', '0')
  params.append('limit', '20')
  return `/result?${params.toString()}`
}

type VillageSearchFormParams = {
  inputRegion?: string,
  inputPopulationLowerLimit?: string,
  inputPopulationUpperLimit?: string,
  inputIslandSetting?: string,
  inputKeywords?: string
}

const defaultPopulationLowerLimit = '1'
const defaultPopulationUpperLimit = '10000'
const defaultIslandSetting = '離島を含まない'
const defaultKeywords = ''

const VillageSearchForm = (props: VillageSearchFormParams) => {
  const {
    inputRegion = null,
    inputPopulationLowerLimit = defaultPopulationLowerLimit,
    inputPopulationUpperLimit = defaultPopulationUpperLimit,
    inputIslandSetting = defaultIslandSetting,
    inputKeywords = defaultKeywords
  } = props;
  const [region, setRegion] = useState(inputRegion)
  const [populationLowerLimit, setPopulationLowerLimit] = useState(inputPopulationLowerLimit)
  const [populationUpperLimit, setPopulationUpperLimit] = useState(inputPopulationUpperLimit)
  const islandSettings = ['離島を含まない', '離島を含む', '離島のみ']
  const [islandSetting, setIslandSetting] = useState(inputIslandSetting)
  const [keyWords, setKeyWords] = useState(inputKeywords)
  const router = useRouter()

  const setDefaultValue = () => {
    setPopulationLowerLimit(defaultPopulationLowerLimit)
    setPopulationUpperLimit(defaultPopulationUpperLimit)
    setIslandSetting(defaultIslandSetting)
    setKeyWords(defaultKeywords)
  }

  const onButtonClick = () => {
    router.push(searchPath(
      region,
      populationLowerLimit,
      populationUpperLimit,
      islandSetting,
      keyWords
    ))
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <Select
          instanceId="selectbox"
          className="w-64 text-xl text-center my-0.5"
          placeholder='地域を選択'
          defaultValue={region ? { label: region, value: region } : null}
          isSearchable
          options={groupedOptions}
          onChange={({ label, value }) => setRegion(value)}
        />
        <button className="btn btn-sm h-10 w-64 rounded-md text-lg my-0.5" onClick={()=>(document.getElementById('detailed-conditions-modal') as HTMLDialogElement).showModal()}>詳細条件</button>
        <dialog id="detailed-conditions-modal" className="modal">
          <div className="modal-box">
            <h2>詳細条件</h2>
            <br />
            <h3>人口</h3>
            <input
              type="number"
              min="1"
              max="10000"
              className="input input-bordered input-sm w-24 rounded-md invalid:input-error"
              value={populationLowerLimit}
              onChange={(e) => setPopulationLowerLimit(e.target.value)}
            />
            人～
            <input
              type="number"
              min="1"
              max="10000"
              className="input input-bordered input-sm w-24 rounded-md invalid:input-error"
              value={populationUpperLimit}
              onChange={(e) => setPopulationUpperLimit(e.target.value)}
            />
            人
            <br /><br />
            <h3>離島設定</h3>
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
              )
            })}
            <br />

            <h3>キーワード絞り込み</h3>
            <input
              type="text"
              className="input input-bordered input-sm w-64 rounded-md"
              placeholder="例：〇〇村"
              value={keyWords}
              onChange={(e) => setKeyWords(e.target.value)}
            />

            <div className="modal-action">
              <button className="btn" onClick={setDefaultValue}>デフォルト値に戻す</button>
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
  )
}

export default VillageSearchForm
