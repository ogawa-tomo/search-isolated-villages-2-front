export const getVillages = async (region: string) => {
  const response = await fetch(
    'http://localhost:3000/api/villages',
    { method: 'GET', cache: 'no-store' }
  )
  return response.json()
}
