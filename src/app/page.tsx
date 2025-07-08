"use client";

import { Header } from "@/components/Header";
import { VillageSearchModal } from "./_components/VillageSearchModal";
import { useState } from "react";
import VillageSearchParams, {
  defaultVillageSearchParams,
} from "@/types/VillageSearchParams";
import Village from "@/types/Village";
import { fetchVillages } from "@/lib/fetchVillages";
import { Loading } from "@/components/Loading";
import { PointView } from "@/components/PointView";

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
      <div className="flex h-screen w-screen flex-col">
        <Header onClickSearch={() => setShowModal(true)} />
        <div className="grow overflow-y-auto">
          <PointView
            points={villages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
