export const getVillages = async (region: string) => {
  const query = new URLSearchParams({ region })
  const response = await fetch(
    `http://localhost:3000/api/villages?${query}`,
    { method: 'GET', cache: 'no-store' }
  )
  return response.json()
}
