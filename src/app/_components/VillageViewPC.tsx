import type VillageSearchParams from "@/types/VillageSearchParams";
import Village from "@/types/Village";
import Link from "next/link";
import Image from "next/image";
import headerLogo from "@/public/header_logo.png";
import { CiSearch } from "react-icons/ci";
import { VillageSearchModal } from "./VillageSearchModal";
import { VillageMap } from "./VillageMap";
import { VillageList, type FetchedVillages } from "./VillageList";
import { useVillages } from "../_hooks/useVillages";

export const VillageViewPC = ({
  searchParams,
}: {
  searchParams: VillageSearchParams;
}) => {
  const { villages, pages, perPage, selectedVillage, setSelectedVillage } =
    useVillages({ searchParams });

  return (
    <>
      <VillageSearchModal
        searchParams={searchParams}
        isOpen={false}
        onSearch={() => {}}
      />
      <div className="flex h-screen w-full">
        <div className="flex h-full w-80 flex-col">
          <div className="flex">
            <Link href="/">
              <Image src={headerLogo} alt="秘境集落探索ツール" height="32" />
            </Link>
            <button>
              <CiSearch />
            </button>
          </div>
          <div className="grow overflow-y-scroll">
            <VillageList
              villages={villages}
              setSelectedVillage={setSelectedVillage}
              searchParams={searchParams}
              pages={pages}
              perPage={perPage}
            />
          </div>
        </div>
        <div className="size-full flex-1">
          <VillageMap villages={villages} selectedVillage={selectedVillage} />
        </div>
      </div>
    </>
  );
};
