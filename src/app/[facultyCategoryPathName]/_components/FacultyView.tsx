import { BottomSheet } from "../../_components/BottomSheet";
import Pagination2 from "@/components/Pagination2";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Faculty from "@/types/Faculty";
import FacultyList2 from "./FacultyList2";
import { FacultyMap } from "@/app/_components/FacultyMap";

const PER_PAGE = 20;

export const FacultyView = ({
  faculties,
  currentPage,
  onPageChange,
}: {
  faculties: Faculty[];
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | undefined>(
    undefined,
  );

  const pages = Math.ceil(faculties.length / PER_PAGE);
  const rankStart = PER_PAGE * (currentPage - 1) + 1;
  const facultiesOnPage = faculties.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isMobile ? (
        <FacultyViewSP
          facultiesOnPage={facultiesOnPage}
          selectedFaculty={selectedFaculty}
          setSelectedFaculty={setSelectedFaculty}
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          rankStart={rankStart}
        />
      ) : (
        <FacultyViewPC
          facultiesOnPage={facultiesOnPage}
          selectedFaculty={selectedFaculty}
          setSelectedFaculty={setSelectedFaculty}
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          rankStart={rankStart}
        />
      )}
    </>
  );
};

const FacultyViewPC = ({
  facultiesOnPage,
  selectedFaculty,
  setSelectedFaculty,
  pages,
  currentPage,
  onPageChange,
  rankStart,
}: {
  facultiesOnPage: Faculty[];
  selectedFaculty: Faculty | undefined;
  setSelectedFaculty: (faculty: Faculty) => void;
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  rankStart: number;
}) => {
  return (
    <>
      <div className="flex size-full">
        {facultiesOnPage.length > 0 && (
          <div className="flex h-full flex-col items-center gap-2 overflow-y-auto">
            <FacultyList2
              faculties={facultiesOnPage}
              rankStart={rankStart}
              onClickFaculty={setSelectedFaculty}
            />
            <Pagination2
              pages={pages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
        <div className="grow pt-2">
          <FacultyMap
            faculties={facultiesOnPage ?? []}
            selectedFaculty={selectedFaculty}
          />
        </div>
      </div>
    </>
  );
};

const FacultyViewSP = ({
  facultiesOnPage,
  selectedFaculty,
  setSelectedFaculty,
  pages,
  currentPage,
  onPageChange,
  rankStart,
}: {
  facultiesOnPage: Faculty[];
  selectedFaculty: Faculty | undefined;
  setSelectedFaculty: (faculty: Faculty) => void;
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  rankStart: number;
}) => {
  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <div className="size-full">
          <FacultyMap
            faculties={facultiesOnPage}
            selectedFaculty={selectedFaculty}
          />
          <BottomSheet isOpen={facultiesOnPage.length > 0}>
            <div className="flex flex-col items-center gap-2 py-4">
              <FacultyList2
                faculties={facultiesOnPage}
                rankStart={rankStart}
                onClickFaculty={setSelectedFaculty}
              />
              <Pagination2
                pages={pages}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </div>
          </BottomSheet>
        </div>
      </div>
    </>
  );
};
