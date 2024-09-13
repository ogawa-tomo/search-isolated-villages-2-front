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
import { HorizontalSpacer } from "./Spacer";
import { PopulationDistributionMapLink } from "./PopulationDistributionMapLink";

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
            <p className="text-center">
              今日のラッキー秘境{facultyCategory.name}は…
            </p>
            <div className="flex items-center min-h-40">
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
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
      <div className="text-center w-full">
        <p className="font-bold text-3xl">{faculty.name}</p>
        <p>
          {faculty.pref} {faculty.city} {faculty.district}
        </p>
        <p>都会度: {faculty.urban_point}</p>
        <p>
          <GoogleMapLink href={faculty.google_map_url} />
          <HorizontalSpacer size={8} />
          <PopulationDistributionMapLink
            href={`${process.env.NEXT_PUBLIC_VILLAGE_API_URL}${faculty.mesh_map_path}`}
          />
        </p>
      </div>
    </>
  );
};

export default FacultyFortuneModal;
