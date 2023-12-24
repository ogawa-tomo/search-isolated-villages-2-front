import type VillageSearchParams from '@/types/villageSearchParams';

export const fetchVillages = async (params: VillageSearchParams) => {
  const query = new URLSearchParams(params);
  const response = await fetch(`http://localhost:5000/api/result?${query}`, {
    method: 'GET',
    cache: 'no-store',
  });
  return response.json();
};
