import VillageSearchParams from "@/types/VillageSearchParams";
import Image from "next/image";
import logo from "@/public/top_logo.png";
import VillageSearchForm from "./VillageSearchForm";
import { getAreaByEnName } from "@/lib/areas";
import { getIslandSettingByEnName } from "@/lib/islandSettings";
import Modal from "react-modal";
import { useEffect, useRef } from "react";

export const VillageSearchModal = ({
  searchParams,
  isOpen,
  onSearch,
  onClose,
}: {
  searchParams: VillageSearchParams;
  isOpen: boolean;
  onSearch: (searchParams: VillageSearchParams) => void;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <ModalContent searchParams={searchParams} onSearch={onSearch} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="bg-white/50" onClick={onClose}>
            close
          </button>
        </form>
      </dialog>
    </>
  );
};

const ModalContent = ({
  searchParams,
  onSearch,
}: {
  searchParams: VillageSearchParams;
  onSearch: (searchParams: VillageSearchParams) => void;
}) => {
  return (
    <>
      <h1>
        <Image
          className="m-auto"
          src={logo}
          alt="秘境集落探索ツール"
          width={300}
          priority
        />
      </h1>
      <p className="mx-auto my-4 w-[280px] text-center leading-relaxed sm:w-[390px]">
        秘境集落を探索し、人口分布データをもとに秘境度を評価して地域別に
        <br className="sm:hidden" />
        ランキングで出力します。
      </p>
      <VillageSearchForm
        inputArea={
          searchParams.area ? getAreaByEnName(searchParams.area) : undefined
        }
        inputPopulationLowerLimit={searchParams.populationLowerLimit}
        inputPopulationUpperLimit={searchParams.populationUpperLimit}
        inputIslandSetting={
          searchParams.islandSetting
            ? getIslandSettingByEnName(searchParams.islandSetting)
            : undefined
        }
        inputKeywords={searchParams.keywords}
        onSearch={onSearch}
      />
    </>
  );
};
