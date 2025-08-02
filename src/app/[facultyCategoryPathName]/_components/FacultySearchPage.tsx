"use client";

import { Loading } from "@/components/Loading";
import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import Faculty from "@/types/Faculty";
import {
  FacultyCategory,
  FacultyCategoryPathName,
} from "@/types/FacultyCategory";
import FacultySearchParams, {
  defaultFacultySearchParams,
} from "@/types/FacultySearchParams";
import { fetchFaculties } from "@/lib/fetchFaculties";
import { Header } from "@/components/Header";
import { useState } from "react";
import { FacultySearchModal } from "@/app/[facultyCategoryPathName]/_components/FacultySearchModal";
import { PointView } from "@/components/PointView";
import { ErrorNotification } from "@/components/ErrorNotification";

export default function FacultySearchPage({
  facultyCategory,
}: {
  facultyCategory: FacultyCategory;
}) {
  const [searchParams, setSearchParams] = useState<FacultySearchParams>(
    defaultFacultySearchParams,
  );
  const [showModal, setShowModal] = useState(true);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showErrorNotification = (message: string) => {
    setShowError(true);
    setErrorMessage(message);
  };

  const searchFaculties = (searchParams: FacultySearchParams) => {
    setShowModal(false);
    setIsLoading(true);
    setSearchParams(searchParams);
    fetchFaculties({
      facultyCategoryPathName: facultyCategory.pathName,
      params: searchParams,
    })
      .then((result) => {
        if (result.faculties.length === 0) {
          showErrorNotification(
            `条件に合う${facultyCategory.name}が見つかりませんでした。`,
          );
          return;
        }
        setFaculties(result.faculties);
        setCurrentPage(1);
      })
      .catch((error) => {
        showErrorNotification(
          `${facultyCategory.name}の取得に失敗しました。 しばらく時間をおいて再度お試しください。`,
        );
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && (
        <div className="fixed z-50 flex h-screen w-screen items-center justify-center bg-white/50">
          <Loading />
        </div>
      )}
      <FacultySearchModal
        facultyCategory={facultyCategory}
        searchParams={searchParams}
        isOpen={showModal}
        onSearch={searchFaculties}
        onClose={() => {
          setShowModal(false);
        }}
      />
      <div className="flex h-screen w-screen flex-col">
        <Header onClickSearch={() => setShowModal(true)} />
        <div className="grow overflow-y-auto">
          <PointView
            points={faculties}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <ErrorNotification
        visible={showError}
        message={errorMessage}
        onClose={() => {
          setShowError(false);
          setShowModal(true);
        }}
      />
    </>
  );
}
