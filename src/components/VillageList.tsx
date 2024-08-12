'use client';

import type VillageSearchParams from '@/types/villageSearchParams';
import Pagination from './Pagination';
import { fetchVillages } from '@/lib/fetchVillages';
import Village from '@/types/village';
import { HorizontalSpacer } from './Spacer';
import { GoogleMapLink } from './GoogleMapLink';
import { PopulationDistributionMapLink } from './PopulationDistributionMapLink';
import { useEffect, useRef, useState } from 'react';

export const VillageList = (searchParams: VillageSearchParams) => {
  const [villages, setVillages] = useState<Village[] | undefined>(undefined);
  const [pages, setPages] = useState<number | undefined>(undefined);
  const [perPage, setPerPage] = useState<number | undefined>(undefined);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVillages(undefined);
    fetchVillages(searchParams)
      .then((result) => {
        setVillages(result.villages);
        setPages(result.pages);
        setPerPage(result.per_page);
      })
  }, [searchParams])

  if (!villages || !pages || !perPage) return (
    <div className="flex justify-center h-36">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  const currentPage = Number(searchParams.page);
  const rankStart = perPage * (currentPage - 1);

  return (
    <>
      <div className="max-w-sm mx-auto flex flex-col items-center gap-4" ref={targetRef}>
        <table className='w-full border-collapse' >
          <tbody>
            {villages.map((village, index) => (
              <tr key={index} className='border border-slate-400'>
                <td className='w-1/5 text-center'>
                  {index + rankStart + 1}位
                </td>
                <td className='p-1'>
                  <p className="font-bold text-xl">
                    {village.pref} {village.city} {village.district}
                  </p>
                  <p className='text-sm'>
                    <span>人口: {village.population}人</span>
                    <HorizontalSpacer size={8} />
                    <span>都会度: {village.urban_point}</span>
                  </p>
                  <p className='text-sm'>
                    <GoogleMapLink href={village.google_map_url} />
                    <HorizontalSpacer size={8} />
                    <PopulationDistributionMapLink href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${village.mesh_map_path}`} />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          pages={pages}
          path={'/'}
          queryParams={searchParams}
        />
      </div>
    </>
  );
};

export default VillageList;
