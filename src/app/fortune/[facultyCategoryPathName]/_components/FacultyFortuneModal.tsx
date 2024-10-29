"use client";

import { useRef, useState } from "react";
import Faculty from "@/types/Faculty";
import {
  FacultyCategoryName,
  FacultyCategoryPathName,
} from "@/types/FacultyCategory";
import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import { fetchFacultyFortuneResult } from "@/lib/fetchFacultyFortuneResult";
import { GoogleMapLink } from "@/components/GoogleMapLink";
import { PopulationDistributionMapLink } from "@/components/PopulationDistributionMapLink";
import { Loading } from "@/components/Loading";

const FacultyFortuneModal = ({
  facultyCategoryPathName,
}: {
  facultyCategoryPathName: FacultyCategoryPathName;
}) => {
  const [faculty, setFaculty] = useState<Faculty | undefined | "error">(
    undefined,
  );
  const modalRef = useRef<HTMLDialogElement>(null);

  const facultyCategory = getFacultyCategoryFromPathName(
    facultyCategoryPathName,
  );

  const handleClick = () => {
    setFaculty(undefined);
    fetchFacultyFortuneResult(facultyCategoryPathName)
      .then((faculty) => setFaculty(faculty))
      .catch(() => {
        setFaculty("error");
      });
    modalRef.current?.showModal();
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <dialog className="modal" ref={modalRef}>
          <div className="modal-box">
            <div className="text-center">
              今日のラッキー秘境{facultyCategory.name}は…
            </div>
            <div className="h-4" />
            <div className="flex min-h-44 items-center">
              <ModalContent
                faculty={faculty}
                facultyCategoryName={facultyCategory.name}
              />
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

type ModalContentProps = {
  faculty: Faculty | undefined | "error";
  facultyCategoryName: FacultyCategoryName;
};

const ModalContent = ({ faculty, facultyCategoryName }: ModalContentProps) => {
  if (faculty === "error") {
    return (
      <div className="w-full text-center">
        {facultyCategoryName}の取得に失敗しました
      </div>
    );
  }

  if (faculty === undefined) {
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col gap-4 text-center">
        <div className="text-3xl font-bold">{faculty.name}</div>
        <div>
          {faculty.pref} {faculty.city} {faculty.district}
        </div>
        <div>都会度: {faculty.urban_point}</div>
        <div>
          <GoogleMapLink href={faculty.google_map_url} />
          <div className="inline-block w-2" />
          <PopulationDistributionMapLink
            href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${faculty.mesh_map_path}`}
          />
        </div>
      </div>
    </>
  );
};

export default FacultyFortuneModal;
