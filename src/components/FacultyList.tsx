import type FacultySearchParams from '@/types/facultySearchParams';
import Pagination from './Pagination';
import { fetchFaculties } from '@/lib/fetchFaculties';

import Faculty from '@/types/faculty';

export const FacultyList = async ({ faculty, searchParams }: { faculty: string, searchParams: FacultySearchParams }) => {
  const { pages, per_page, faculties } = await fetchFaculties({ faculty, params: searchParams });

  return (
    <FacultyListPresentation
      facultyName={faculty}
      pages={Number(pages)}
      per_page={per_page}
      faculties={faculties}
      searchParams={searchParams}
    />
  );
};

type FacultyListPresentationProps = {
  facultyName: string;
  pages: number;
  per_page: number;
  faculties: Faculty[];
  searchParams: FacultySearchParams;
}

export const FacultyListPresentation = ({
  facultyName,
  pages,
  per_page,
  faculties,
  searchParams,
}: FacultyListPresentationProps) => {
  const current_page = Number(searchParams.page);
  const rank_start = per_page * (current_page - 1);

  return (
    <>
      <div className="max-w-sm mx-auto flex flex-col items-center">
        <table className='w-full border-collapse'>
          <tbody>
            {faculties.map((faculty, index) => (
              <tr key={index} className='border border-slate-400'>
                <td className='w-1/6 text-center'>
                  {index + rank_start + 1}位
                </td>
                <td className="pl-2">
                  <p className="font-bold text-lg">
                    {faculty.name}
                  </p>
                  <p className='text-sm'>
                    <span className="mr-1">{faculty.pref} {faculty.city} {faculty.district}</span>
                  </p>
                  <p className='text-sm'>
                    <span>都会度: {faculty.urban_point}</span>
                  </p>
                  <p className='text-sm'>
                    <a
                      className="mr-1"
                      href={faculty.google_map_url}
                      target="_blank"
                    >
                      Googleマップ
                    </a>
                    <a
                      href={`http://localhost:5000${faculty.mesh_map_path}`}
                      target="_blank"
                    >
                      人口分布図
                    </a>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          current_page={current_page}
          pages={pages}
          path={`/${facultyName}/result`}
          queryParams={searchParams}
        />
      </div>
    </>
  );
};

export default FacultyList;
