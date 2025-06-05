import { Loading } from "@/components/Loading";
import Pagination from "@/components/Pagination";
import type VillageSearchParams from "@/types/VillageSearchParams";
import Village from "@/types/Village";
import { GoogleMapLink } from "@/components/GoogleMapLink";
import { PopulationDistributionMapLink } from "@/components/PopulationDistributionMapLink";

export type FetchedVillages =
  | Village[]
  | "beforeSearch"
  | "searching"
  | "error";

export const VillageList = ({
  villages,
  setSelectedVillage,
  searchParams,
  pages,
  perPage,
}: {
  villages: FetchedVillages;
  setSelectedVillage: (village: Village | undefined) => void;
  searchParams: VillageSearchParams;
  pages: number | undefined;
  perPage: number | undefined;
}) => {
  if (villages === "beforeSearch") {
    return <div className="text-center">ここに集落が表示されます</div>;
  }

  if (villages === "error") {
    return <div className="text-center">集落の取得に失敗しました</div>;
  }

  if (villages === "searching" || !pages || !perPage) {
    return (
      <div className="flex h-24 justify-center">
        <Loading />
      </div>
    );
  }
  if (villages.length === 0) {
    return (
      <div className="text-center">該当する集落が見つかりませんでした</div>
    );
  }

  const currentPage = Number(searchParams.page);
  const rankStart = perPage * (currentPage - 1);

  return (
    <>
      <div className="mx-auto flex flex-col items-center">
        <table className="block w-80 border-collapse p-2">
          <tbody>
            {villages.map((village, index) => (
              <tr
                key={
                  village.pref +
                  village.city +
                  village.district +
                  village.urban_point +
                  village.google_map_url
                }
                className="border border-slate-400"
                onClick={() => setSelectedVillage(village)}
              >
                <td className="w-1/5 text-center">
                  {index + 1 + rankStart}
                  <span className="text-xs">位</span>
                </td>
                <td className="p-2">
                  <VillageCard village={village} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          pages={pages}
          path={"/"}
          queryParams={searchParams}
        />
      </div>
    </>
  );
};

const VillageCard = ({ village }: { village: Village }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-bold">
        {village.pref} {village.city} {village.district}
      </div>
      <div className="text-sm">
        <span>人口: {village.population}人</span>
        <div className="inline-block w-4" />
        <span>都会度: {village.urban_point}</span>
      </div>
      <div className="text-sm">
        <GoogleMapLink href={village.google_map_url} />
        <div className="inline-block w-2" />
        <PopulationDistributionMapLink
          href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${village.mesh_map_path}`}
        />
      </div>
    </div>
  );
};

export default VillageList;
