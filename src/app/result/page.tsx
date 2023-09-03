import VillageList from "@/components/VillageList";
import { Suspense } from "react";
import { villageSearchParams } from "@/types/villageSearchParams";

const fetchVillages = async (params: villageSearchParams) => {
  const query = new URLSearchParams(params)
  const response = await fetch(
    `http://localhost:5000/api/result?${query}`,{
      method: 'GET',
      cache: 'no-store'
    }
  )
  return response.json()
}

const Page = async ({ searchParams }) => {
  return (
    <>
      <h1>秘境集落探索ツール</h1>
      <h2>探索結果</h2>
      <div>{searchParams.region}</div>
      <Suspense fallback='loading...'>
        <VillageList region={searchParams.region} />
      </Suspense>
    </>
  )
}

export default Page;