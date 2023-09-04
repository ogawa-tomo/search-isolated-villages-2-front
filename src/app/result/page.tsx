import VillageList from "@/components/VillageList";
import { Suspense } from "react";

const Page = async ({ searchParams }) => {
  return (
    <>
      <h1>秘境集落探索ツール</h1>
      <h2>探索結果</h2>
      <div>地域：{searchParams.region}</div>
      <div>人口：{searchParams.population_lower_limit}人～{searchParams.population_upper_limit}人</div>
      <Suspense fallback='loading...'>
        <VillageList {...searchParams} />
      </Suspense>
    </>
  )
}

export default Page;