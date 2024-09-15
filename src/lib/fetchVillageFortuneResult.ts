"use server";

import Village from "@/types/Village";

export const fetchVillageFortuneResult = async (): Promise<Village> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/fortune/result`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) throw response;
  return response.json();
};
