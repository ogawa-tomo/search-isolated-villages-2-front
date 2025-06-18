import { VillageMap } from "./VillageMap";
import { BottomSheet } from "./BottomSheet";
import Pagination2 from "@/components/Pagination2";
import { VillageList2 } from "./VillageList2";
import Village from "@/types/Village";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const PER_PAGE = 20;

export const VillageView = ({
  villages,
  currentPage,
  onPageChange,
}: {
  villages: Village[];
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const [selectedVillage, setSelectedVillage] = useState<Village | undefined>(
    undefined,
  );

  const pages = Math.ceil(villages.length / PER_PAGE);
  const rankStart = PER_PAGE * (currentPage - 1) + 1;
  const villagesOnPage = villages.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isMobile ? (
        <VillageViewSP
          villagesOnPage={villagesOnPage}
          selectedVillage={selectedVillage}
          setSelectedVillage={setSelectedVillage}
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          rankStart={rankStart}
        />
      ) : (
        <VillageViewPC
          villagesOnPage={villagesOnPage}
          selectedVillage={selectedVillage}
          setSelectedVillage={setSelectedVillage}
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          rankStart={rankStart}
        />
      )}
    </>
  );
};

const VillageViewPC = ({
  villagesOnPage,
  selectedVillage,
  setSelectedVillage,
  pages,
  currentPage,
  onPageChange,
  rankStart,
}: {
  villagesOnPage: Village[];
  selectedVillage: Village | undefined;
  setSelectedVillage: (village: Village) => void;
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  rankStart: number;
}) => {
  return (
    <>
      <div className="flex size-full">
        <div className="flex h-full flex-col items-center gap-2 overflow-y-auto">
          <VillageList2
            villages={villagesOnPage}
            rankStart={rankStart}
            onClickVillage={setSelectedVillage}
          />
          <Pagination2
            pages={pages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
        <div className="grow pt-2">
          <VillageMap
            villages={villagesOnPage ?? []}
            selectedVillage={selectedVillage}
          />
        </div>
      </div>
    </>
  );
};

const VillageViewSP = ({
  villagesOnPage,
  selectedVillage,
  setSelectedVillage,
  pages,
  currentPage,
  onPageChange,
  rankStart,
}: {
  villagesOnPage: Village[];
  selectedVillage: Village | undefined;
  setSelectedVillage: (village: Village) => void;
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  rankStart: number;
}) => {
  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <div className="size-full">
          <VillageMap
            villages={villagesOnPage}
            selectedVillage={selectedVillage}
          />
          <BottomSheet isOpen={villagesOnPage.length > 0}>
            <div className="flex flex-col items-center gap-2 py-4">
              <VillageList2
                villages={villagesOnPage}
                rankStart={rankStart}
                onClickVillage={setSelectedVillage}
              />
              <Pagination2
                pages={pages}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </div>
          </BottomSheet>
        </div>
      </div>
    </>
  );
};
