import VillageList from "@/app/components/VillageList";
import VillageSearchForm from "@/app/components/VillageSearchForm";
import { getAreaByEnName } from "@/lib/areas";
import { getIslandSettingByEnName } from "@/lib/islandSettings";
import logo from "@/public/top_logo.png";
import VillageSearchParams from "@/types/VillageSearchParams";
import Image from "next/image";

export default function Page({
  searchParams,
}: {
  searchParams: VillageSearchParams;
}) {
  // herokuのサーバーをスリープ状態から起こすためにリクエストを投げる
  fetch(process.env.NEXT_PUBLIC_VILLAGE_API_URL ?? "", {
    next: { revalidate: 3600 },
  });

  return (
    <>
      <h1>
        <Image
          className="m-auto"
          src={logo}
          alt="秘境集落探索ツール"
          width={300}
        />
      </h1>
      <p className="mx-auto my-4 w-[280px] text-center leading-relaxed sm:w-[390px]">
        秘境集落を探索し、人口分布データをもとに秘境度を評価して地域別に
        <br className="sm:hidden" />
        ランキングで出力します。
      </p>
      <VillageSearchForm
        inputArea={
          searchParams.area ? getAreaByEnName(searchParams.area) : undefined
        }
        inputPopulationLowerLimit={searchParams.populationLowerLimit}
        inputPopulationUpperLimit={searchParams.populationUpperLimit}
        inputIslandSetting={
          searchParams.islandSetting
            ? getIslandSettingByEnName(searchParams.islandSetting)
            : undefined
        }
        inputKeywords={searchParams.keywords}
      />
      <div className="h-5" />
      {searchParams.area && <VillageList {...searchParams} />}
    </>
  );
}
