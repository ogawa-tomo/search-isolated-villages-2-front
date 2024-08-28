import FacultyList from "@/components/FacultyList";
import FacultySearchForm from "@/components/FacultySearchForm";
import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import { facultyCategoryLogo } from "@/lib/facultyCategoryLogo";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import FacultySearchParams from "@/types/facultySearchParams";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: { facultyCategoryPathName: FacultyCategoryPathName };
  searchParams: FacultySearchParams
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const facultyCategoryName = getFacultyCategoryFromPathName(params.facultyCategoryPathName).name;
  return {
    title: `秘境${facultyCategoryName}探索ツール`,
    description: `秘境${facultyCategoryName}を探索し、人口分布データをもとに秘境度を評価して地域別にランキングで出力します。`,
  }
}

export default function Page({ params, searchParams }: Props) {
  const facultyCategoryName = getFacultyCategoryFromPathName(params.facultyCategoryPathName).name;

  return (
    <>
      <h1 className="text-center">秘境{facultyCategoryName}探索ツール</h1>
      <Image
        className="m-auto"
        src={facultyCategoryLogo(facultyCategoryName)}
        alt={facultyCategoryName}
        height={200}
      />
      <p className="text-center">
        秘境{facultyCategoryName}を探索し、人口分布データを<br className="sm:hidden" />
        もとに秘境度を<br className="hidden sm:block" />
        評価して地域別に<br className="sm:hidden" />
        ランキングで出力します。
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
