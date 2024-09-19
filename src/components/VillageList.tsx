"use client";

import type VillageSearchParams from "@/types/VillageSearchParams";
import Pagination from "./Pagination";
import { fetchVillages } from "@/lib/fetchVillages";
import Village from "@/types/Village";
import { GoogleMapLink } from "./GoogleMapLink";
import { PopulationDistributionMapLink } from "./PopulationDistributionMapLink";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";

export const VillageList = (searchParams: VillageSearchParams) => {
  const [villages, setVillages] = useState<Village[] | undefined | "error">(
    undefined,
  );
  const [pages, setPages] = useState<number | undefined>(undefined);
  const [perPage, setPerPage] = useState<number | undefined>(undefined);

  useEffect(() => {
    setVillages(undefined);
    fetchVillages(searchParams)
      .then((result) => {
        setVillages(result.villages);
        setPages(result.pages);
        setPerPage(result.per_page);
      })
      .catch(() => {
        setVillages("error");
      });
  }, [searchParams]);

  if (villages === "error") {
    return <div className="text-center">集落の取得に失敗しました</div>;
  }

  if (villages === undefined || pages === undefined || !perPage) {
    return (
      <div className="flex justify-center h-24">
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
      <div className="max-w-sm mx-auto flex flex-col items-center gap-4">
        <table className="w-full border-collapse">
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
              >
                <td className="w-1/5 text-center">
                  {index + rankStart + 1}
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
      <div className="font-bold text-xl">
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
