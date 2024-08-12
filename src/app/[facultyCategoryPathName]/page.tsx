import FacultyList from "@/components/FacultyList";
import FacultySearchForm from "@/components/FacultySearchForm";
import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import { facultyCategoryLogo } from "@/lib/facultyCategoryLogo";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import FacultySearchParams from "@/types/facultySearchParams";
import Image from "next/image";

type Props = {
  params: { facultyCategoryPathName: FacultyCategoryPathName };
  searchParams: FacultySearchParams
}

export default function Page({ params, searchParams }: Props) {
  const facultyCategoryName = getFacultyCategoryFromPathName(params.facultyCategoryPathName).name;

  return (
    <>
      <h1 className="text-center">秘境{facultyCategoryName}探索ツール</h1>
      <Image
        className="m-auto"
        src={facultyCategoryLogo(facultyCategoryName)}
        alt="logo"
        width={200}
        height={200}
      />
      <p className="text-center">
        秘境{facultyCategoryName}を探索し、秘境度を人口分布データをもとに<br />評価して地域別にランキングで出力します。
      </p>
      <FacultySearchForm
        facultyCategoryPathName={params.facultyCategoryPathName}
        inputRegion={searchParams.region}
        inputIslandSetting={searchParams.islandSetting}
        inputKeyWords={searchParams.keyWords}
      />
      <div className="h-5" />
      {searchParams.region
        &&
        <FacultyList
          facultyCategoryPathName={params.facultyCategoryPathName}
          searchParams={searchParams}
        />
      }
    </>
  );
}
