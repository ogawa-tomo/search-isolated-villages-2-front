import type { VillageSearchParams } from "@/types/villageSearchParams"

const fetchVillages = async (params: VillageSearchParams) => {
  const query = new URLSearchParams(params)
  const response = await fetch(
    `http://localhost:5000/api/result?${query}`,{
      method: 'GET',
      cache: 'no-store'
    }
  )
  return response.json()
}

const VillageList = async (searchParams: VillageSearchParams) => {
  const { total, villages } = await fetchVillages(searchParams);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-96">
          <table className="table border-collapse border border-slate-400">
            <tbody>
              {villages.map((village, index) => (
                <tr>
                  <td>
                    {index + 1}位
                  </td>
                  <td className="columns-xs ">
                    <span className="font-bold text-lg">{village.pref} {village.city} {village.district}</span><br />
                    <span className="mr-1">人口: {village.population}人</span>
                    <span>都会度: {village.urban_point}</span><br />
                    <a className="mr-1" href={village.google_map_url} target="_blank">Googleマップ</a>
                    <a href={`http://localhost:5000${village.mesh_map_path}`} target="_blank">人口分布図</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )

}

export default VillageList
