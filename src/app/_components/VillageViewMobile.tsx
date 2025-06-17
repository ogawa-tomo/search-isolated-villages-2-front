import { VillageMap } from "./VillageMap";
import { BottomSheet } from "./BottomSheet";
import Pagination2 from "@/components/Pagination2";
import { VillageList2 } from "./VillageList2";
import Village from "@/types/Village";
import { useState } from "react";

const PER_PAGE = 20;

export const VillageViewMobile = ({
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

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <div className="size-full">
          <VillageMap
            villages={villagesOnPage ?? []}
            selectedVillage={selectedVillage}
          />
          <BottomSheet isOpen={villages.length > 0}>
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
