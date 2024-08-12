import VillageList from "@/components/VillageList";
import VillageSearchForm from "@/components/VillageSearchForm";
import logo from "@/public/top_logo.png";
import VillageSearchParams from "@/types/villageSearchParams";
import Image from "next/image";

export default function Page({ searchParams }: { searchParams: VillageSearchParams }) {
  return (
    <>
      <Image
        className="m-auto"
        src={logo}
        alt="logo"
        width={300}
        height={300}
      />
      <p className="text-center">
        秘境集落を探索し、秘境度を人口分布データをもとに<br />評価して地域別にランキングで出力します。
      </p>
      <VillageSearchForm
        inputRegion={searchParams.region}
        inputPopulationLowerLimit={searchParams.populationLowerLimit}
        inputPopulationUpperLimit={searchParams.populationUpperLimit}
        inputIslandSetting={searchParams.islandSetting}
        inputKeyWords={searchParams.keyWords}
      />
      <div className="h-5" />
      {searchParams.region && <VillageList {...searchParams} />}

    </>
  );
}
