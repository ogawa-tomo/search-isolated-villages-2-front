import Pagination from "@/components/Pagination";
import Village from "@/types/Village";
import { useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BaseMap } from "@/components/BaseMap";
import PointList from "@/components/PointList";
import Faculty from "@/types/Faculty";
import { BottomSheet } from "@/app/_components/BottomSheet";

const PER_PAGE = 20;

export const PointView = ({
  points,
  currentPage,
  onPageChange,
}: {
  points: Village[] | Faculty[];
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const [selectedPoint, setSelectedPoint] = useState<
    Village | Faculty | undefined
  >(undefined);

  const pages = Math.ceil(points.length / PER_PAGE);
  const rankStart = PER_PAGE * (currentPage - 1) + 1;
  const pointsOnPage = useMemo(
    () => points.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE),
    [points, currentPage],
  );

  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isMobile ? (
        <PointViewSP
          pointsOnPage={pointsOnPage}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          rankStart={rankStart}
        />
      ) : (
        <PointViewPC
          pointsOnPage={pointsOnPage}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          rankStart={rankStart}
        />
      )}
    </>
  );
};

const PointViewPC = ({
  pointsOnPage,
  selectedPoint,
  setSelectedPoint,
  pages,
  currentPage,
  onPageChange,
  rankStart,
}: {
  pointsOnPage: Village[] | Faculty[];
  selectedPoint: Village | Faculty | undefined;
  setSelectedPoint: (point: Village | Faculty | undefined) => void;
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  rankStart: number;
}) => {
  return (
    <>
      <div className="flex size-full">
        {pointsOnPage.length > 0 && (
          <div className="flex h-full flex-col items-center overflow-y-auto px-2">
            <Pagination
              pages={pages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            <PointList
              points={pointsOnPage}
              selectedPoint={selectedPoint}
              rankStart={rankStart}
              onClickPoint={setSelectedPoint}
            />
            <Pagination
              pages={pages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
        <div className="grow">
          <BaseMap points={pointsOnPage ?? []} selectedPoint={selectedPoint} />
        </div>
      </div>
    </>
  );
};

const PointViewSP = ({
  pointsOnPage,
  selectedPoint,
  setSelectedPoint,
  pages,
  currentPage,
  onPageChange,
  rankStart,
}: {
  pointsOnPage: Village[] | Faculty[];
  selectedPoint: Village | Faculty | undefined;
  setSelectedPoint: (point: Village | Faculty | undefined) => void;
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  rankStart: number;
}) => {
  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <div className="size-full">
          <BaseMap points={pointsOnPage} selectedPoint={selectedPoint} />
          <BottomSheet isOpen={pointsOnPage.length > 0}>
            <div className="flex flex-col items-center pb-4">
              <Pagination
                pages={pages}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
              <PointList
                points={pointsOnPage}
                selectedPoint={selectedPoint}
                rankStart={rankStart}
                onClickPoint={setSelectedPoint}
              />
              <Pagination
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
