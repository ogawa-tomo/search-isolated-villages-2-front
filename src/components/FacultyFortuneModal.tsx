'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import type Village from '@/types/village';
import useSWR, { Fetcher } from 'swr';
import Faculty from '@/types/faculty';
import { facultyNames } from '@/lib/facultyNames';

const FacultyFortuneModal = ({ faculty }: { faculty: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const appElementObject: { appElement?: HTMLElement } = {}
  if (typeof window === 'object') {
    appElementObject.appElement = document.getElementById('modalRoot');
  }

  return (
    <>
      <div className="flex flex-col items-center" id='modalRoot'>
        <Modal
          isOpen={isModalOpen}
          className="modal-box mx-auto"
          {...appElementObject}
        >
          <ModalContent
            faculty={faculty}
          />
          <div className="modal-action">
            <button className="btn" onClick={() => setIsModalOpen(false)}>閉じる</button>
          </div>
        </Modal>
        <button
          className="btn btn-primary w-64 btn-sm h-10 text-white rounded-md text-xl my-0.5"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          占う
        </button>
      </div >

    </>
  )
}

const fetcher: Fetcher<Faculty, string> = (url: string) => fetch(url).then(res => res.json());

const ModalContent = ({ faculty }: { faculty: string }) => {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/fortune/${faculty}/result`, fetcher);

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <>
      <div className='text-center'>
        <p>今日のラッキー秘境{facultyNames(faculty)}は…</p>
        <p className='font-bold text-3xl'>{data.name}</p>
        <p>{data.pref} {data.city} {data.district}</p>
        <p>都会度: {data.urban_point}</p>
        <p>
          <a
            className="mr-1"
            href={data.google_map_url}
            target="_blank"
          >
            Googleマップ
          </a>
          <a
            href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${data.mesh_map_path}`}
            target="_blank"
          >
            人口分布図
          </a>
        </p>
      </div>
    </>
  )
}

export default FacultyFortuneModal;
