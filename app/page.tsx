'use client';

import Link from "next/link";
import { useState } from "react";
import Select from 'react-select';

const options = [
  { value: '北海道', label: '北海道' },
  { value: '青森県', label: '青森県' },
  { value: '秋田県', label: '秋田県' },
]

export default function Page() {
  const [region, setRegion] = useState(options[0])
  const query = { region }

  return (
    <>
      <h1>秘境集落探索ツール</h1>
      <h2>探索条件</h2>
      <Select
        options={options}
        defaultValue={region}
        onChange={(value) => value ? setRegion(region) : null}
      />
      <div>{region.value}</div> 
      <Link href={{ pathname: "result", query: { region: region.value }}}>探索結果</Link>
    </>
  )
}
