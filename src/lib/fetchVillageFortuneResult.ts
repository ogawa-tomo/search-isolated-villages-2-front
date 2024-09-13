import Village from "@/types/Village";

export const fetchVillageFortuneResult = async (): Promise<Village> => {
  const res = await fetch("/api/fortune/result");
  return res.json();
};
