import type VillageSearchParams from "@/types/VillageSearchParams";
import { VillageSearchModal } from "./VillageSearchModal";
import { VillageMap } from "./VillageMap";
import { VillageList, type FetchedVillages } from "./VillageList";
import { MobileHeader } from "@/components/MobileHeader";
import { BottomSheet } from "./BottomSheet";
import { useVillages } from "../_hooks/useVillages";
import { useShowVillageSearchModal } from "../_hooks/VillageSearchParamsContext";

export const VillageViewMobile = ({
  searchParams,
}: {
  searchParams: VillageSearchParams;
}) => {
  const { villages, pages, perPage, selectedVillage, setSelectedVillage } =
    useVillages({ searchParams });
  const showVillageSearchModal = useShowVillageSearchModal();

  return (
    <>
      <VillageSearchModal
        searchParams={searchParams}
        isOpen={false}
        onSearch={() => {}}
      />
      <div className="flex h-screen w-screen flex-col">
        <MobileHeader />
        <div className="size-full">
          <VillageMap villages={villages} selectedVillage={selectedVillage} />
          <BottomSheet isOpen={!showVillageSearchModal}>
            <VillageList
              villages={villages}
              setSelectedVillage={setSelectedVillage}
              searchParams={searchParams}
              pages={pages}
              perPage={perPage}
            />
          </BottomSheet>
        </div>
      </div>
    </>
  );
};
