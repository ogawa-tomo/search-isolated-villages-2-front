"use client";

import { useRef, useState } from "react";
import type Village from "@/types/Village";
import { fetchVillageFortuneResult } from "@/lib/fetchVillageFortuneResult";
import { GoogleMapLink } from "@/components/GoogleMapLink";
import { PopulationDistributionMapLink } from "@/components/PopulationDistributionMapLink";
import { Loading } from "@/components/Loading";

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
            <div className="flex min-h-40 items-center">
              <ModalContent village={village} />
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <button
          className="btn btn-primary btn-sm my-0.5 h-10 w-64 rounded-md text-xl text-white"
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
    return <div className="w-full text-center">集落の取得に失敗しました</div>;
  }

  if (village === undefined) {
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col gap-4 text-center">
        <div className="text-3xl font-bold">
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
