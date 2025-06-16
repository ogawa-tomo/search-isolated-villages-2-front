import VillageSearchParams from "@/types/VillageSearchParams";
import Village from "@/types/Village";
import useSWR, { Fetcher } from "swr";

export type FetchVillagesResponse = {
  villages: Village[];
  pages: number;
  per_page: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useVillages2 = ({
  searchParams,
}: {
  searchParams: VillageSearchParams;
}) => {
  const query = new URLSearchParams(searchParams);
  const url = searchParams.area
    ? `${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/result?${query.toString()}`
    : null;
  const { data, error, isLoading } = useSWR<FetchVillagesResponse, Error>(
    url,
    fetcher,
  );
  return {
    villageData: data,
    error,
    isLoading,
  };
};
