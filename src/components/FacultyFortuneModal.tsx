'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import Faculty from '@/types/faculty';
import { FacultyCategory, FacultyCategoryPathName } from '@/types/FacultyCategory';
import { getFacultyCategoryFromPathName } from '@/lib/facultyCategories';
import { fetchFacultyFortuneResult } from '@/lib/fetchFacultyFortuneResult';

const FacultyFortuneModal = ({ facultyCategoryPathName }: { facultyCategoryPathName: FacultyCategoryPathName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faculty, setFaculty] = useState<Faculty | undefined>(undefined);


  const appElementObject: { appElement?: HTMLElement } = {}
  if (typeof window === 'object') {
    appElementObject.appElement = document.getElementById('modalRoot') ?? undefined;
  }

  const openModal = () => {
    setIsModalOpen(true);
    setFaculty(undefined);
    fetchFacultyFortuneResult(facultyCategoryPathName)
      .then(faculty => setFaculty(faculty));
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
            facultyCategory={getFacultyCategoryFromPathName(facultyCategoryPathName)}
          />
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

const ModalContent = ({ faculty, facultyCategory }: { faculty: Faculty | undefined; facultyCategory: FacultyCategory }) => {

  if (faculty === undefined) return <div>loading...</div>
  return (
    <>
      <div className='text-center'>
        <p>今日のラッキー秘境{facultyCategory.name}は…</p>
        <p className='font-bold text-3xl'>{faculty.name}</p>
        <p>{faculty.pref} {faculty.city} {faculty.district}</p>
        <p>都会度: {faculty.urban_point}</p>
        <p>
          <a
            className="mr-1"
            href={faculty.google_map_url}
            target="_blank"
          >
            Googleマップ
          </a>
          <a
            href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${faculty.mesh_map_path}`}
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
