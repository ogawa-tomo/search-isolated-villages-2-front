"use client";

import { useRef, useState } from "react";
import Faculty from "@/types/Faculty";
import {
  FacultyCategoryName,
  FacultyCategoryPathName,
} from "@/types/FacultyCategory";
import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import { fetchFacultyFortuneResult } from "@/lib/fetchFacultyFortuneResult";
import { GoogleMapLink } from "./GoogleMapLink";
import { PopulationDistributionMapLink } from "./PopulationDistributionMapLink";
import { Loading } from "./Loading";

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
            <div className="flex items-center min-h-44">
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

type ModalContentProps = {
  faculty: Faculty | undefined | "error";
  facultyCategoryName: FacultyCategoryName;
};

const ModalContent = ({ faculty, facultyCategoryName }: ModalContentProps) => {
  if (faculty === "error") {
    return (
      <div className="text-center w-full">
        {facultyCategoryName}の取得に失敗しました
      </div>
    );
  }

  if (faculty === undefined) {
    return (
      <div className="flex justify-center w-full">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="text-center w-full flex flex-col gap-4">
        <div className="font-bold text-3xl">{faculty.name}</div>
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
