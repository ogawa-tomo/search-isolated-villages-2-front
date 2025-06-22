import Image from "next/image";
import { getAreaByEnName } from "@/lib/areas";
import { getIslandSettingByEnName } from "@/lib/islandSettings";
import FacultySearchParams from "@/types/FacultySearchParams";
import FacultySearchForm from "./FacultySearchForm";
import { FacultyCategory } from "@/types/FacultyCategory";
import { facultyCategoryLogo } from "@/lib/facultyCategoryLogo";
import { SearchModal } from "@/components/SearchModal";

export const FacultySearchModal = ({
  facultyCategory,
  searchParams,
  isOpen,
  onSearch,
  onClose,
}: {
  facultyCategory: FacultyCategory;
  searchParams: FacultySearchParams;
  isOpen: boolean;
  onSearch: (searchParams: FacultySearchParams) => void;
  onClose: () => void;
}) => {
  return (
    <>
      <SearchModal isOpen={isOpen} onClose={onClose}>
        <ModalContent
          facultyCategory={facultyCategory}
          searchParams={searchParams}
          onSearch={onSearch}
        />
      </SearchModal>
    </>
  );
};

const ModalContent = ({
  facultyCategory,
  searchParams,
  onSearch,
}: {
  facultyCategory: FacultyCategory;
  searchParams: FacultySearchParams;
  onSearch: (searchParams: FacultySearchParams) => void;
}) => {
  return (
    <>
      <h1 className="mb-4 text-center text-3xl font-bold">
        秘境{facultyCategory.name}探索ツール
      </h1>
      <Image
        className="m-auto"
        src={facultyCategoryLogo(facultyCategory.name)}
        alt={facultyCategory.name}
        height={200}
        priority
      />
      <p className="my-4 text-center leading-relaxed">
        秘境{facultyCategory.name}を探索し、人口分布データを
        <br className="sm:hidden" />
        もとに秘境度を
        <br className="hidden sm:block" />
        評価して地域別に
        <br className="sm:hidden" />
        ランキングで出力します。
      </p>

      <FacultySearchForm
        inputArea={
          searchParams.area ? getAreaByEnName(searchParams.area) : undefined
        }
        inputIslandSetting={
          searchParams.islandSetting
            ? getIslandSettingByEnName(searchParams.islandSetting)
            : undefined
        }
        inputKeywords={searchParams.keywords}
        onSearch={onSearch}
      />
    </>
  );
};
