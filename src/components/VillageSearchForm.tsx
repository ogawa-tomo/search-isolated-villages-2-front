'use client';

import Link from "next/link";
import { useState } from "react";
import Select from 'react-select';
import { useRouter } from 'next/navigation'



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
  return `/result?${params.toString()}`
}

const VillageSearchForm = () => {
  const [region, setRegion] = useState(null)
  const [populationLowerLimit, setPopulationLowerLimit] = useState('1')
  const [populationUpperLimit, setPopulationUpperLimit] = useState('10000')
  const islandSettings = ['離島を含まない', '離島を含む', '離島のみ']
  const [islandSetting, setIslandSetting] = useState('離島を含まない')
  const [keyWords, setKeyWords] = useState('')
  const router = useRouter()

  return (
    <>
      <Select
        placeholder='地域を選択'
        defaultValue={null}
        isSearchable
        options={groupedOptions}
        onChange={({ label, value }) => setRegion(value)}
      />
      人口：
      <input
        type="number"
        value={populationLowerLimit}
        onChange={(e) => setPopulationLowerLimit(e.target.value)}
      />
      人～
      <input
        type="number"
        value={populationUpperLimit}
        onChange={(e) => setPopulationUpperLimit(e.target.value)}
      />
      人
      <br />
      離島設定：
      {islandSettings.map((setting) => {
        return (
          <span key={setting}>
            <input
              id={setting}
              type="radio"
              value={setting}
              onChange={(e) => setIslandSetting(e.target.value)}
              checked={setting === islandSetting}
            />
            <label htmlFor={setting}>{setting}</label>
          </span>
        )
      })}
      <br />

      キーワード絞り込み：
      <input
        type="text"
        value={keyWords}
        onChange={(e) => setKeyWords(e.target.value)}
      />

      <br />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        type="button"
        onClick={() => router.push(searchPath(
          region,
          populationLowerLimit,
          populationUpperLimit,
          islandSetting,
          keyWords
        ))}
        disabled={!region}
      >
        探索
      </button>
    </>
  )
}

export default VillageSearchForm
