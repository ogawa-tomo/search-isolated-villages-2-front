import Pagination2 from "@/components/Pagination2";
import Village from "@/types/Village";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BaseMap } from "@/components/BaseMap";
import ObjectList from "@/components/ObjectList";
import Faculty from "@/types/Faculty";
import { BottomSheet } from "@/app/_components/BottomSheet";

const PER_PAGE = 20;

export const ObjectView = ({
  objects,
  currentPage,
  onPageChange,
}: {
  objects: Village[] | Faculty[];
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const [selectedObject, setSelectedObject] = useState<
    Village | Faculty | undefined
  >(undefined);

  const pages = Math.ceil(objects.length / PER_PAGE);
  const rankStart = PER_PAGE * (currentPage - 1) + 1;
  const objectsOnPage = objects.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isMobile ? (
        <VillageViewSP
          objectsOnPage={objectsOnPage}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          rankStart={rankStart}
        />
      ) : (
        <ObjectViewPC
          objectsOnPage={objectsOnPage}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          rankStart={rankStart}
        />
      )}
    </>
  );
};

const ObjectViewPC = ({
  objectsOnPage,
  selectedObject,
  setSelectedObject,
  pages,
  currentPage,
  onPageChange,
  rankStart,
}: {
  objectsOnPage: Village[] | Faculty[];
  selectedObject: Village | Faculty | undefined;
  setSelectedObject: (object: Village | Faculty) => void;
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  rankStart: number;
}) => {
  return (
    <>
      <div className="flex size-full">
        {objectsOnPage.length > 0 && (
          <div className="flex h-full flex-col items-center gap-2 overflow-y-auto px-2">
            <Pagination2
              pages={pages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            <ObjectList
              objects={objectsOnPage}
              rankStart={rankStart}
              onClickObject={setSelectedObject}
            />
            <Pagination2
              pages={pages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
        <div className="grow">
          <BaseMap
            objects={objectsOnPage ?? []}
            selectedObject={selectedObject}
          />
        </div>
      </div>
    </>
  );
};

const VillageViewSP = ({
  objectsOnPage,
  selectedObject,
  setSelectedObject,
  pages,
  currentPage,
  onPageChange,
  rankStart,
}: {
  objectsOnPage: Village[] | Faculty[];
  selectedObject: Village | Faculty | undefined;
  setSelectedObject: (object: Village | Faculty) => void;
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  rankStart: number;
}) => {
  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <div className="size-full">
          <BaseMap objects={objectsOnPage} selectedObject={selectedObject} />
          <BottomSheet isOpen={objectsOnPage.length > 0}>
            <div className="flex flex-col items-center pb-4">
              <Pagination2
                pages={pages}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
              <ObjectList
                objects={objectsOnPage}
                rankStart={rankStart}
                onClickObject={setSelectedObject}
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
