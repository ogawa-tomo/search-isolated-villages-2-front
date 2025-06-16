import { VillageMap } from "./VillageMap";
import { MobileHeader } from "@/components/MobileHeader";
import { BottomSheet } from "./BottomSheet";
import {
  useCurrentPage,
  useSetCurrentPage,
  useShowVillageSearchModal,
  useVillageSearchParams,
} from "../_hooks/VillageSearchParamsContext";
import Pagination2 from "@/components/Pagination2";
import { VillageList2 } from "./VillageList2";
import { Loading } from "@/components/Loading";
import Village from "@/types/Village";
import { useState } from "react";
import { useVillages2 } from "../_hooks/useVillages2";

const PER_PAGE = 20;

export const VillageViewMobile = () => {
  const [searchParams, setSearchParams] = useVillageSearchParams();
  const { villages, error, isLoading } = useVillages2({
    searchParams,
  });
  const [selectedVillage, setSelectedVillage] = useState<Village | undefined>(
    undefined,
  );
  const currentPage = useCurrentPage();
  const setCurrentPage = useSetCurrentPage();
  const showVillageSearchModal = useShowVillageSearchModal();

  const pages = Math.ceil((villages?.length ?? 0) / PER_PAGE);

  const villagesOnPage = villages?.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <MobileHeader />
        <div className="size-full">
          <VillageMap
            villages={villagesOnPage ?? []}
            selectedVillage={selectedVillage}
          />
          <BottomSheet isOpen={!showVillageSearchModal}>
            <VillageListView
              villages={villagesOnPage}
              error={error}
              isLoading={isLoading}
              onClickVillage={setSelectedVillage}
              currentPage={currentPage}
              pages={pages}
              onPageChange={(page) => {
                setCurrentPage(page);
                // setSearchParams({ ...searchParams, page: page.toString() });
              }}
            />
          </BottomSheet>
        </div>
      </div>
    </>
  );
};

const VillageListView = ({
  villages,
  error,
  isLoading,
  currentPage,
  pages,
  onPageChange,
  onClickVillage,
}: {
  villages: Village[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
  currentPage: number;
  pages: number;
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

  if (isLoading || !villages) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  const rankStart = PER_PAGE * (currentPage - 1) + 1;

  return (
    <>
      <div className="flex flex-col items-center gap-2 py-4">
        <VillageList2
          villages={villages}
          rankStart={rankStart}
          onClickVillage={onClickVillage}
        />
        <Pagination2
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};
