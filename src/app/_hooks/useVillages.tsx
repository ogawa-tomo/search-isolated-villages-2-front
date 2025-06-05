import { useEffect, useState } from "react";
import { FetchedVillages } from "../_components/VillageList";
import Village from "@/types/Village";
import { fetchVillages } from "@/lib/fetchVillages";
import VillageSearchParams from "@/types/VillageSearchParams";

export const useVillages = ({
  searchParams,
}: {
  searchParams: VillageSearchParams;
}) => {
  const [villages, setVillages] = useState<FetchedVillages>("beforeSearch");
  const [selectedVillage, setSelectedVillage] = useState<Village | undefined>(
    undefined,
  );
  const [pages, setPages] = useState<number | undefined>(undefined);
  const [perPage, setPerPage] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!searchParams.area) {
      setVillages("beforeSearch");
      return;
    }

    setVillages("searching");
    fetchVillages(searchParams)
      .then((result) => {
        setVillages(result.villages);
        setPages(result.pages);
        setPerPage(result.per_page);
      })
      .catch(() => {
        setVillages("error");
      });
  }, [searchParams]);

  return { villages, pages, perPage, selectedVillage, setSelectedVillage };
};
