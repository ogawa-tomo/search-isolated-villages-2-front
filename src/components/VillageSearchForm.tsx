'use client';

import Link from "next/link";
import { useState } from "react";
import Select from 'react-select';

const options = [
  { value: '北海道', label: '北海道' },
  { value: '青森県', label: '青森県' },
  { value: '秋田県', label: '秋田県' },
]

const VillageSearchForm = () => {
  const [region, setRegion] = useState(options[0])

  return (
    <>
      <h2>探索条件</h2>
      <Select
        options={options}
        defaultValue={region}
        onChange={(value) => value ? setRegion(value) : null}
      />
      <div>{region.value}</div> 
      <Link href={{ pathname: "result", query: { region: region.value }}}>探索結果</Link>
    </>
  )


}

export default VillageSearchForm
