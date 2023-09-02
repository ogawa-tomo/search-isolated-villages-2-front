import { json } from "stream/consumers"

export const getVillages = async (region: string) => {
  const query = new URLSearchParams({ region })
  const response = await fetch(
    `http://localhost:5000/api/result?${query}`,{
      method: 'GET',
      cache: 'no-store'
    }
  )
  return response.json()
}
