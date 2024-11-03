"use client";

import type FacultySearchParams from "@/types/FacultySearchParams";
import Pagination from "@/components/Pagination";
import { fetchFaculties } from "@/lib/fetchFaculties";
import Faculty from "@/types/Faculty";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import { GoogleMapLink } from "@/components/GoogleMapLink";
import { PopulationDistributionMapLink } from "@/components/PopulationDistributionMapLink";
import { useEffect, useState } from "react";
import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import { Loading } from "@/components/Loading";

export const FacultyList = ({
  facultyCategoryPathName,
  searchParams,
}: {
  facultyCategoryPathName: FacultyCategoryPathName;
  searchParams: FacultySearchParams;
}) => {
  const [faculties, setFaculties] = useState<Faculty[] | undefined | "error">(
    undefined,
  );
  const [pages, setPages] = useState<number | undefined>(undefined);
  const [perPage, setPerPage] = useState<number | undefined>(undefined);

  const facultyCategory = getFacultyCategoryFromPathName(
    facultyCategoryPathName,
  );

  useEffect(() => {
    setFaculties(undefined);
    fetchFaculties({ facultyCategoryPathName, params: searchParams })
      .then((result) => {
        setFaculties(result.faculties);
        setPages(result.pages);
        setPerPage(result.per_page);
      })
      .catch(() => {
        setFaculties("error");
      });
  }, [facultyCategoryPathName, searchParams]);

  if (faculties === "error") {
    return (
      <div className="text-center">
        {facultyCategory.name}
        の取得に失敗しました
      </div>
    );
  }

  if (faculties === undefined || pages === undefined || !perPage) {
    return (
      <div className="flex h-24 justify-center">
        <Loading />
      </div>
    );
  }

  if (faculties.length === 0) {
    return (
      <div className="text-center">
        該当する
        {facultyCategory.name}
        が見つかりませんでした
      </div>
    );
  }

  const currentPage = Number(searchParams.page);
  const rankStart = perPage * (currentPage - 1);

  return (
    <>
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4">
        <table className="w-full border-collapse">
          <tbody>
            {faculties.map((faculty, index) => (
              <tr
                key={
                  faculty.name +
                  faculty.pref +
                  faculty.city +
                  faculty.district +
                  faculty.urban_point +
                  faculty.google_map_url
                }
                className="border border-slate-400"
              >
                <td className="w-1/5 text-center">{index + rankStart + 1}位</td>
                <td className="p-2">
                  <FacultyCard faculty={faculty} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          pages={pages}
          path={`/${facultyCategoryPathName}`}
          queryParams={searchParams}
        />
      </div>
    </>
  );
};

const FacultyCard = ({ faculty }: { faculty: Faculty }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-bold">{faculty.name}</div>
      <div className="text-sm">
        <span>
          {faculty.pref} {faculty.city} {faculty.district}
        </span>
      </div>
      <div className="text-sm">
        <span>都会度: {faculty.urban_point}</span>
      </div>
      <div className="text-sm">
        <GoogleMapLink href={faculty.google_map_url} />
        <div className="inline-block w-2" />
        <PopulationDistributionMapLink
          href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${faculty.mesh_map_path}`}
        />
      </div>
    </div>
  );
};

export default FacultyList;
