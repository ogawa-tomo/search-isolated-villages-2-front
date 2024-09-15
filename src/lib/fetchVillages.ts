"use server";

import Village from "@/types/Village";
import type VillageSearchParams from "@/types/VillageSearchParams";

type Response = {
  villages: Village[];
  pages: number;
  per_page: number;
};

export const fetchVillages = async (
  params: VillageSearchParams,
): Promise<Response> => {
  const query = new URLSearchParams(params);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/result?${query.toString()}`,
  );
  if (!response.ok) throw response;
  return response.json();
};
