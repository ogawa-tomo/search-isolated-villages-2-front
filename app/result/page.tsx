'use client'

import { useSearchParams } from 'next/navigation'

export default function Page() {

  const params = useSearchParams()
  return (
    <>
      <h1>秘境集落探索ツール</h1>
      <h2>探索結果</h2>
      <div>{params.get('region')}</div>
    </>
  )
}