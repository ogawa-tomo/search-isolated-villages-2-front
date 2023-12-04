import Loading from "@/components/Loading";
import VillageList from "@/components/VillageList";
import VillageSearchForm from "@/components/VillageSearchForm";
import { Suspense } from "react";

const Page = async ({ searchParams }) => {
  return (
    <>
      <VillageSearchForm
        inputRegion={searchParams.region}
        inputPopulationLowerLimit={searchParams.population_lower_limit}
        inputPopulationUpperLimit={searchParams.population_upper_limit}
        inputIslandSetting={searchParams.island_setting}
        inputKeywords={searchParams.key_words}
      />
      <h2 className="text-center">探索結果</h2>
      <Suspense fallback={<Loading />}>
        <VillageList {...searchParams} />
      </Suspense>
    </>
  );
};

export default Page;
