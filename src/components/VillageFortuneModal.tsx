"use client";

import { useRef, useState } from "react";
import type Village from "@/types/Village";
import { fetchVillageFortuneResult } from "@/lib/fetchVillageFortuneResult";
import { GoogleMapLink } from "./GoogleMapLink";
import { PopulationDistributionMapLink } from "./PopulationDistributionMapLink";

const VillageFortuneModal = () => {
  const [village, setVillage] = useState<Village | undefined | "error">(
    undefined,
  );
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    setVillage(undefined);
    fetchVillageFortuneResult()
      .then((village) => setVillage(village))
      .catch(() => {
        setVillage("error");
      });
    modalRef.current?.showModal();
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <dialog className="modal" ref={modalRef}>
          <div className="modal-box">
            <div className="text-center">今日のラッキー秘境集落は…</div>
            <div className="flex items-center min-h-40">
              <ModalContent village={village} />
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <button
          className="btn btn-primary w-64 btn-sm h-10 text-white rounded-md text-xl my-0.5"
          type="button"
          onClick={handleClick}
        >
          占う
        </button>
      </div>
    </>
  );
};

const ModalContent = ({
  village,
}: {
  village: Village | undefined | "error";
}) => {
  if (village === "error") {
    return <div className="text-center w-full">集落の取得に失敗しました</div>;
  }

  if (village === undefined) {
    return (
      <div className="flex justify-center w-full">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
      <div className="text-center w-full flex flex-col gap-4">
        <div className="font-bold text-3xl">
          {village.pref} {village.city} {village.district}
        </div>
        <div>
          <span>人口: {village.population}人</span>
          <div className="inline-block w-4" />
          <span>都会度: {village.urban_point}</span>
        </div>
        <div>
          <GoogleMapLink href={village.google_map_url} />
          <div className="inline-block w-2" />
          <PopulationDistributionMapLink
            href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${village.mesh_map_path}`}
          />
        </div>
      </div>
    </>
  );
};

export default VillageFortuneModal;
