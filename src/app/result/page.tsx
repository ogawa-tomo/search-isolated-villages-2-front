import VillageList from "@/components/VillageList";
import { Suspense } from "react";

const Page = async ({ searchParams }) => {
  return (
    <>
      <h1>秘境集落探索ツール</h1>
      <h2>探索結果</h2>
      <div>{searchParams.region}</div>
      <div>{searchParams.popLowerLimit}</div>
      <Suspense fallback='loading...'>
        <VillageList {...searchParams} />
      </Suspense>
    </>
  )
}

export default Page;