'use client';

import type FacultySearchParams from '@/types/facultySearchParams';
import Pagination from './Pagination';
import { fetchFaculties } from '@/lib/fetchFaculties';
import Faculty from '@/types/faculty';
import { FacultyCategoryPathName } from '@/types/FacultyCategory';
import { HorizontalSpacer } from './Spacer';
import { GoogleMapLink } from './GoogleMapLink';
import { PopulationDistributionMapLink } from './PopulationDistributionMapLink';
import { useEffect, useState } from 'react';
import { getFacultyCategoryFromPathName } from '@/lib/facultyCategories';

export const FacultyList = ({ facultyCategoryPathName, searchParams }: { facultyCategoryPathName: FacultyCategoryPathName, searchParams: FacultySearchParams }) => {
  const [faculties, setFaculties] = useState<Faculty[] | undefined>(undefined);
  const [pages, setPages] = useState<number | undefined>(undefined);
  const [perPage, setPerPage] = useState<number | undefined>(undefined);
  const [isFetchError, setIsFetchError] = useState(false)

  useEffect(() => {
    setFaculties(undefined);
    fetchFaculties({ facultyCategoryPathName, params: searchParams })
      .then((result) => {
        setFaculties(result.faculties);
        setPages(result.pages);
        setPerPage(result.per_page);
      })
      .catch((err) => {
        console.log(err);
        setIsFetchError(true);
      })
  }, [facultyCategoryPathName, searchParams])

  if (isFetchError) return (
    <div className='text-center'>
      {getFacultyCategoryFromPathName(facultyCategoryPathName).name}の取得に失敗しました
    </div>
  );

  if (!faculties || !pages || !perPage) return (
    <div className="flex justify-center h-24">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  const currentPage = Number(searchParams.page);
  const rankStart = perPage * (currentPage - 1);

  return (
    <>
      <div className="max-w-sm mx-auto flex flex-col items-center gap-4">
        <table className='w-full border-collapse'>
          <tbody>
            {faculties.map((faculty, index) => (
              <tr key={index} className='border border-slate-400'>
                <td className='w-1/5 text-center'>
                  {index + rankStart + 1}位
                </td>
                <td className="p-1">
                  <p className="font-bold text-xl">
                    {faculty.name}
                  </p>
                  <p className='text-sm'>
                    <span>{faculty.pref} {faculty.city} {faculty.district}</span>
                  </p>
                  <p className='text-sm'>
                    <span>都会度: {faculty.urban_point}</span>
                  </p>
                  <p className='text-sm'>
                    <GoogleMapLink href={faculty.google_map_url} />
                    <HorizontalSpacer size={8} />
                    <PopulationDistributionMapLink href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${faculty.mesh_map_path}`} />
                  </p>
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

export default FacultyList;
