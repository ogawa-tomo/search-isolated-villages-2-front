'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import type Village from '@/types/village';
import { fetchVillageFortuneResult } from '@/lib/fetchVillageFortuneResult';

const VillageFortuneModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [village, setVillage] = useState<Village | undefined>(undefined);

  const appElementObject: { appElement?: HTMLElement } = {}
  if (typeof window === 'object') {
    appElementObject.appElement = document.getElementById('modalRoot') ?? undefined;
  }

  const openModal = () => {
    setIsModalOpen(true);
    setVillage(undefined);
    fetchVillageFortuneResult()
      .then(village => setVillage(village));
  }

  return (
    <>
      <div className="flex flex-col items-center" id='modalRoot'>
        <Modal
          isOpen={isModalOpen}
          className="modal-box mx-auto"
          {...appElementObject}
        >
          <ModalContent village={village} />
          <div className="modal-action">
            <button className="btn" onClick={() => setIsModalOpen(false)}>閉じる</button>
          </div>
        </Modal>
        <button
          className="btn btn-primary w-64 btn-sm h-10 text-white rounded-md text-xl my-0.5"
          type="button"
          onClick={openModal}
        >
          占う
        </button>
      </div >

    </>
  )
}

const ModalContent = ({ village }: { village: Village | undefined }) => {
  if (village === undefined) {
    return (
      <div className="flex justify-center h-36">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }
  return (
    <>
      <div className='text-center'>
        <p>今日のラッキー秘境集落は…</p>
        <p className='font-bold text-3xl'>{village.pref} {village.city} {village.district}</p>
        <p>
          <span className='mr-1'>人口: {village.population}人</span>
          <span>都会度: {village.urban_point}</span>
        </p>
        <p>
          <a
            className="mr-1"
            href={village.google_map_url}
            target="_blank"
          >
            Googleマップ
          </a>
          <a
            href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${village.mesh_map_path}`}
            target="_blank"
          >
            人口分布図
          </a>
        </p>
      </div>
    </>
  )
}

export default VillageFortuneModal;
