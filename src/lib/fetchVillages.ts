import type VillageSearchParams from "@/types/villageSearchParams";

export const fetchVillages = async (params: VillageSearchParams) => {
  const query = new URLSearchParams(params);
  const response = await fetch(`/api/result?${query.toString()}`);
  return response.json();
};
