import Village from "@/types/village";

export const fetchVillageFortuneResult = async (): Promise<Village> => {
  const res = await fetch("/api/fortune/result");
  return res.json();
};
