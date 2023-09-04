import type { villageSearchParams } from "@/types/villageSearchParams"

const fetchVillages = async (params: villageSearchParams) => {
  const query = new URLSearchParams(params)
  const response = await fetch(
    `http://localhost:5000/api/result?${query}`,{
      method: 'GET',
      cache: 'no-store'
    }
  )
  return response.json()
}

const VillageList = async (searchParams: villageSearchParams) => {
  const villages = await fetchVillages(searchParams);

  return (
    <>
      {villages.map((village, index) => (
        <p key={index}>
          {index + 1}位<br />
          {village.pref} {village.city} {village.district}<br />
          人口: {village.population}人<br />
          都会度: {village.urban_point}<br />
          <a href={village.google_map_url} target="_blank">Googleマップ</a><br />
          <a href={`http://localhost:5000${village.mesh_map_path}`} target="_blank">人口分布図</a>
        </p>
      ))}
    </>
  )

}

export default VillageList