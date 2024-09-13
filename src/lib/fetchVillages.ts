import type VillageSearchParams from "@/types/VillageSearchParams";

export const fetchVillages = async (params: VillageSearchParams) => {
  const query = new URLSearchParams(params);
  const response = await fetch(`/api/result?${query.toString()}`);
  return response.json();
};
