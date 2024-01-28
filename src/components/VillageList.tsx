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
      <div className="flex flex-col items-center">
        <div className="w-96">
          <table className="table border-collapse border border-slate-400">
            <tbody>
              {villages.map((village, index) => (
                <tr key={index}>
                  <td>{index + rank_start + 1}位</td>
                  <td className="columns-xs ">
                    <span className="font-bold text-lg">
                      {village.pref} {village.city} {village.district}
                    </span>
                    <br />
                    <span className="mr-1">人口: {village.population}人</span>
                    <span>都会度: {village.urban_point}</span>
                    <br />
                    <a
                      className="mr-1"
                      href={village.google_map_url}
                      target="_blank"
                    >
                      Googleマップ
                    </a>
                    <a
                      href={`http://localhost:5000${village.mesh_map_path}`}
                      target="_blank"
                    >
                      人口分布図
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          current_page={current_page}
          pages={pages}
          params={searchParams}
        />
      </div>
    </>
  );
};

export default VillageList;
