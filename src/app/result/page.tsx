import VillageList from "@/components/VillageList";
import VillageSearchForm from "@/components/VillageSearchForm";
import { Suspense } from "react";

const Page = async ({ searchParams }) => {
  return (
    <>
      <VillageSearchForm
        defaultRegion={searchParams.region}
        defaultPopulationLowerLimit={searchParams.population_lower_limit}
        defaultPopulationUpperLimit={searchParams.population_upper_limit}
        defaultIslandSetting={searchParams.island_setting}
        defaultKeywords={searchParams.key_words}
      />
      <h2 className="text-center">探索結果</h2>
      <Suspense fallback='loading...'>
        <VillageList {...searchParams} />
      </Suspense>
    </>
  )
}

export default Page;