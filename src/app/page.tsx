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
import { Loading } from "@/components/Loading";

export default function Page() {
  const [searchParams, setSearchParams] = useState<VillageSearchParams>(
    defaultVillageSearchParams,
  );
  const [showModal, setShowModal] = useState(true);
  const [villages, setVillages] = useState<Village[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const searchVillages = (searchParams: VillageSearchParams) => {
    setShowModal(false);
    setIsLoading(true);
    setSearchParams(searchParams);
    fetchVillages(searchParams)
      .then((result) => {
        setVillages(result.villages);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && (
        <div className="fixed z-50 flex h-screen w-screen items-center justify-center bg-white/50">
          <Loading />
        </div>
      )}
      <VillageSearchModal
        searchParams={searchParams}
        isOpen={showModal}
        onSearch={searchVillages}
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
