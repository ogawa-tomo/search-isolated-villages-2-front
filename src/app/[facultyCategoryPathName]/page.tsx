import FacultyList from "@/components/FacultyList";
import FacultySearchForm from "@/components/FacultySearchForm";
import { getAreaByEnName } from "@/lib/areas";
import {
  facultyCategoryPathNames,
  getFacultyCategoryFromPathName,
} from "@/lib/facultyCategories";
import { facultyCategoryLogo } from "@/lib/facultyCategoryLogo";
import { getIslandSettingByEnName } from "@/lib/islandSettings";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import FacultySearchParams from "@/types/FacultySearchParams";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: { facultyCategoryPathName: FacultyCategoryPathName };
  searchParams: FacultySearchParams;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!facultyCategoryPathNames.includes(params.facultyCategoryPathName)) {
    notFound();
  }
  const facultyCategoryName = getFacultyCategoryFromPathName(
    params.facultyCategoryPathName,
  ).name;
  return {
    title: `秘境${facultyCategoryName}探索ツール`,
    description: `秘境${facultyCategoryName}を探索し、人口分布データをもとに秘境度を評価して地域別にランキングで出力します。`,
  };
}

export default function Page({ params, searchParams }: Props) {
  const facultyCategoryName = getFacultyCategoryFromPathName(
    params.facultyCategoryPathName,
  ).name;

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">
        秘境{facultyCategoryName}探索ツール
      </h1>
      <Image
        className="m-auto"
        src={facultyCategoryLogo(facultyCategoryName)}
        alt={facultyCategoryName}
        height={200}
      />
      <p className="text-center my-4 leading-relaxed">
        秘境{facultyCategoryName}を探索し、人口分布データを
        <br className="sm:hidden" />
        もとに秘境度を
        <br className="hidden sm:block" />
        評価して地域別に
        <br className="sm:hidden" />
        ランキングで出力します。
      </p>
      <FacultySearchForm
        facultyCategoryPathName={params.facultyCategoryPathName}
        inputArea={
          searchParams.area ? getAreaByEnName(searchParams.area) : undefined
        }
        inputIslandSetting={
          searchParams.islandSetting
            ? getIslandSettingByEnName(searchParams.islandSetting)
            : undefined
        }
        inputKeywords={searchParams.keywords}
      />
      <div className="h-5" />
      {searchParams.area && (
        <FacultyList
          facultyCategoryPathName={params.facultyCategoryPathName}
          searchParams={searchParams}
        />
      )}
    </>
  );
}
