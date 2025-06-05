"use server";

import Village from "@/types/Village";
import type VillageSearchParams from "@/types/VillageSearchParams";

export type FetchVillagesResponse = {
  villages: Village[];
  pages: number;
  per_page: number;
};

export const fetchVillages = async (
  params: VillageSearchParams,
): Promise<FetchVillagesResponse> => {
  const query = new URLSearchParams(params);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/result?${query.toString()}`,
  );
  if (!response.ok) throw response;
  return response.json();
};
