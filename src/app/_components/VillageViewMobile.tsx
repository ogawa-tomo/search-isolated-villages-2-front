import type VillageSearchParams from "@/types/VillageSearchParams";
import { VillageSearchModal } from "./VillageSearchModal";
import { VillageMap } from "./VillageMap";
import { VillageList, type FetchedVillages } from "./VillageList";
import { MobileHeader } from "@/components/MobileHeader";
import { BottomSheet } from "./BottomSheet";
import { useVillages } from "../_hooks/useVillages";
import {
  useShowVillageSearchModal,
  useVillageSearchParams,
} from "../_hooks/VillageSearchParamsContext";
import Pagination2 from "@/components/Pagination2";
import { VillageList2 } from "./VillageList2";
import { Loading } from "@/components/Loading";
import Village from "@/types/Village";
import { useState } from "react";

export const VillageViewMobile = () => {
  const [searchParams, setSearchParams] = useVillageSearchParams();
  const { villages, pages, perPage, selectedVillage, setSelectedVillage } =
    useVillages({ searchParams });
  const [currentPage, setCurrentPage] = useState(1);
  const showVillageSearchModal = useShowVillageSearchModal();

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <MobileHeader />
        <div className="size-full">
          <VillageMap villages={villages} selectedVillage={selectedVillage} />
          <BottomSheet isOpen={!showVillageSearchModal}>
            <VillageListView
              villages={villages}
              onClickVillage={setSelectedVillage}
              pages={pages}
              perPage={perPage}
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
  villages,
  pages,
  perPage,
  currentPage,
  onPageChange,
  onClickVillage,
}: {
  villages: FetchedVillages;
  pages: number | undefined;
  perPage: number | undefined;
  currentPage: number;
  onPageChange: (page: number) => void;
  onClickVillage: (village: Village) => void;
}) => {
  if (villages === "beforeSearch") {
    return <div className="text-center">ここに集落が表示されます</div>;
  }

  if (villages === "error") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">集落の取得に失敗しました</div>
      </div>
    );
  }

  if (villages === "searching" || !pages || !perPage) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  const rankStart = perPage * (currentPage - 1) + 1;

  return (
    <>
      <div className="flex flex-col items-center gap-2 py-4">
        <VillageList2
          villages={villages}
          rankStart={rankStart}
          onClickVillage={onClickVillage}
        />
        <Pagination2
          pages={pages ?? 1}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};
