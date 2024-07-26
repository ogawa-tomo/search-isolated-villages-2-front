import type FacultySearchParams from '@/types/facultySearchParams';
import Pagination from './Pagination';
import { fetchFaculties } from '@/lib/fetchFaculties';

import Faculty from '@/types/faculty';
import { FacultyCategoryPathName } from '@/types/FacultyCategory';
import Link from 'next/link';
import { HorizontalSpacer } from './Spacer';

export const FacultyList = async ({ facultyCategoryPathName, searchParams }: { facultyCategoryPathName: FacultyCategoryPathName, searchParams: FacultySearchParams }) => {
  const { pages, per_page, faculties } = await fetchFaculties({ facultyCategoryPathName, params: searchParams });

  return (
    <FacultyListPresentation
      facultyCategoryPathName={facultyCategoryPathName}
      pages={Number(pages)}
      per_page={per_page}
      faculties={faculties}
      searchParams={searchParams}
    />
  );
};

type FacultyListPresentationProps = {
  facultyCategoryPathName: string;
  pages: number;
  per_page: number;
  faculties: Faculty[];
  searchParams: FacultySearchParams;
}

export const FacultyListPresentation = ({
  facultyCategoryPathName,
  pages,
  per_page,
  faculties,
  searchParams,
}: FacultyListPresentationProps) => {
  const current_page = Number(searchParams.page);
  const rank_start = per_page * (current_page - 1);

  return (
    <>
      <div className="max-w-sm mx-auto flex flex-col items-center gap-4">
        <table className='w-full border-collapse'>
          <tbody>
            {faculties.map((faculty, index) => (
              <tr key={index} className='border border-slate-400'>
                <td className='w-1/5 text-center'>
                  {index + rank_start + 1}位
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
                    <Link
                      className="link link-primary"
                      href={faculty.google_map_url}
                      target="_blank"
                    >
                      Googleマップ
                    </Link>
                    <HorizontalSpacer size={8} />
                    <Link
                      className="link link-primary"
                      href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${faculty.mesh_map_path}`}
                      target="_blank"
                    >
                      人口分布図
                    </Link>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          current_page={current_page}
          pages={pages}
          path={`/${facultyCategoryPathName}/result`}
          queryParams={searchParams}
        />
      </div>
    </>
  );
};

export default FacultyList;
