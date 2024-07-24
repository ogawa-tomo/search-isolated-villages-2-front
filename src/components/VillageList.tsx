import type VillageSearchParams from '@/types/villageSearchParams';
import Pagination from './Pagination';
import { fetchVillages } from '@/lib/fetchVillages';
import Village from '@/types/village';

export const VillageList = async (searchParams: VillageSearchParams) => {
  const { pages, per_page, villages } = await fetchVillages(searchParams);

  return (
    <VillageListPresentation
      pages={Number(pages)}
      per_page={per_page}
      villages={villages}
      searchParams={searchParams}
    />
  );
};

type VillageListPresentationProps = {
  pages: number;
  per_page: number;
  villages: Village[];
  searchParams: VillageSearchParams;
}

export const VillageListPresentation = ({
  pages,
  per_page,
  villages,
  searchParams,
}: VillageListPresentationProps) => {
  const current_page = Number(searchParams.page);
  const rank_start = per_page * (current_page - 1);

  return (
    <>
      <div className="max-w-sm mx-auto flex flex-col items-center gap-4">
        <table className='w-full border-collapse'>
          <tbody>
            {villages.map((village, index) => (
              <tr key={index} className='border border-slate-400'>
                <td className='w-1/6 text-center'>
                  {index + rank_start + 1}位
                </td>
                <td className="pl-2">
                  <p className="font-bold text-lg">
                    {village.pref} {village.city} {village.district}
                  </p>
                  <p className='text-sm'>
                    <span className="mr-1">人口: {village.population}人</span>
                    <span>都会度: {village.urban_point}</span>
                  </p>
                  <p className='text-sm'>
                    <a
                      className="mr-1"
                      href={village.google_map_url}
                      target="_blank"
                    >
                      Googleマップ
                    </a>
                    <a
                      href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${village.mesh_map_path}`}
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
          path={'/result'}
          queryParams={searchParams}
        />
      </div>
    </>
  );
};

export default VillageList;
