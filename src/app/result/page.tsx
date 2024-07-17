import Loading from "@/components/Loading";
import VillageList from "@/components/VillageList";
import VillageSearchForm from "@/components/VillageSearchForm";
import VillageSearchParams from "@/types/villageSearchParams";
import { Suspense } from "react";

const Page = async ({ searchParams }: { searchParams: VillageSearchParams }) => {
  return (
    <>
      <VillageSearchForm
        inputRegion={searchParams.region}
        inputPopulationLowerLimit={searchParams.populationLowerLimit}
        inputPopulationUpperLimit={searchParams.populationUpperLimit}
        inputIslandSetting={searchParams.islandSetting}
        inputKeyWords={searchParams.keyWords}
      />
      <h2 className="text-center">探索結果</h2>
      <Suspense fallback={<Loading />}>
        <VillageList {...searchParams} />
      </Suspense>
    </>
  );
};

export default Page;
