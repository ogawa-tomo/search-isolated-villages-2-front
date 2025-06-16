import { VillageMap } from "./VillageMap";
import { MobileHeader } from "@/components/MobileHeader";
import { BottomSheet } from "./BottomSheet";
import {
  useShowVillageSearchModal,
  useVillageSearchParams,
} from "../_hooks/VillageSearchParamsContext";
import Pagination2 from "@/components/Pagination2";
import { VillageList2 } from "./VillageList2";
import { Loading } from "@/components/Loading";
import Village from "@/types/Village";
import { useState } from "react";
import { FetchVillagesResponse, useVillages2 } from "../_hooks/useVillages2";

export const VillageViewMobile = () => {
  const [searchParams, setSearchParams] = useVillageSearchParams();
  const { villageData, error, isLoading } = useVillages2({
    searchParams,
  });
  const [selectedVillage, setSelectedVillage] = useState<Village | undefined>(
    undefined,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const showVillageSearchModal = useShowVillageSearchModal();

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <MobileHeader />
        <div className="size-full">
          <VillageMap
            villages={villageData?.villages ?? []}
            selectedVillage={selectedVillage}
          />
          <BottomSheet isOpen={!showVillageSearchModal}>
            <VillageListView
              villageData={villageData}
              error={error}
              isLoading={isLoading}
              onClickVillage={setSelectedVillage}
              currentPage={currentPage}
              onPageChange={(page) => {
                setCurrentPage(page);
                setSearchParams({ ...searchParams, page: page.toString() });
              }}
            />
          </BottomSheet>
        </div>
      </div>
    </>
  );
};

const VillageListView = ({
  villageData,
  error,
  isLoading,
  currentPage,
  onPageChange,
  onClickVillage,
}: {
  villageData: FetchVillagesResponse | undefined;
  error: Error | undefined;
  isLoading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  onClickVillage: (village: Village) => void;
}) => {
  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">集落の取得に失敗しました</div>
      </div>
    );
  }

  if (isLoading || !villageData) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  const rankStart = villageData.per_page * (currentPage - 1) + 1;

  return (
    <>
      <div className="flex flex-col items-center gap-2 py-4">
        <VillageList2
          villages={villageData.villages}
          rankStart={rankStart}
          onClickVillage={onClickVillage}
        />
        <Pagination2
          pages={villageData.pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};
