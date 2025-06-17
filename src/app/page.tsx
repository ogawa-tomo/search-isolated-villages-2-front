"use client";

import { MobileHeader } from "@/components/MobileHeader";
import { VillageSearchModal } from "./_components/VillageSearchModal";
import { useState } from "react";
import VillageSearchParams, {
  defaultVillageSearchParams,
} from "@/types/VillageSearchParams";
import Village from "@/types/Village";
import { fetchVillages } from "@/lib/fetchVillages";
import { VillageViewMobile } from "./_components/VillageViewMobile";

export default function Page() {
  const [searchParams, setSearchParams] = useState<VillageSearchParams>(
    defaultVillageSearchParams,
  );
  const [showModal, setShowModal] = useState(true);
  const [villages, setVillages] = useState<Village[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const searchVillages = (searchParams: VillageSearchParams) => {
    fetchVillages(searchParams)
      .then((result) => {
        setVillages(result.villages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <VillageSearchModal
        searchParams={searchParams}
        isOpen={showModal}
        onSearch={(searchParams) => {
          searchVillages(searchParams);
          setSearchParams(searchParams);
          setShowModal(false);
          setCurrentPage(1);
        }}
        onClose={() => {
          setShowModal(false);
        }}
      />
      <MobileHeader onClickSearch={() => setShowModal(true)} />
      <VillageViewMobile
        villages={villages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
