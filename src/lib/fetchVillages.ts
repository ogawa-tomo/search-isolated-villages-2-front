import type VillageSearchParams from '@/types/villageSearchParams';

export const fetchVillages = async (params: VillageSearchParams) => {
  const query = new URLSearchParams(params);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/result?${query.toString()}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );
  return response.json();
};
