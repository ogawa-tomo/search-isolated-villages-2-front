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
  const [faculties, setFaculties] = useState<Faculty[] | undefined | 'error'>(undefined);
  const [pages, setPages] = useState<number | undefined>(undefined);
  const [perPage, setPerPage] = useState<number | undefined>(undefined);

  useEffect(() => {
    setFaculties(undefined);
    fetchFaculties({ facultyCategoryPathName, params: searchParams })
      .then((result) => {
        setFaculties(result.faculties);
        setPages(result.pages);
        setPerPage(result.per_page);
      })
      .catch(() => {
        setFaculties('error');
      })
  }, [facultyCategoryPathName, searchParams])

  if (faculties === 'error') {
    return (
      <div className='text-center'>
        {getFacultyCategoryFromPathName(facultyCategoryPathName).name}の取得に失敗しました
      </div>
    );
  }

  if (faculties === undefined || pages === undefined || !perPage) {
    return (
      <div className="flex justify-center h-24">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (faculties.length === 0) {
    return (
      <div className='text-center'>
        該当する{getFacultyCategoryFromPathName(facultyCategoryPathName).name}が見つかりませんでした
      </div>
    );
  }

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
                <td className="p-2">
                  <p className="font-bold text-xl">
                    {faculty.name}
                  </p>
                  <div className='h-2' />
                  <p className='text-sm'>
                    <span>{faculty.pref} {faculty.city} {faculty.district}</span>
                  </p>
                  <div className='h-2' />
                  <p className='text-sm'>
                    <span>都会度: {faculty.urban_point}</span>
                  </p>
                  <div className='h-2' />
                  <p className='text-sm'>
                    <GoogleMapLink href={faculty.google_map_url} />
                    <div className='inline-block w-2' />
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
