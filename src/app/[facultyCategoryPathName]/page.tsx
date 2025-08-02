import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import FacultySearchPage from "./_components/FacultySearchPage";
import { Metadata } from "next";
import { facultyCategoryPathNames } from "@/lib/facultyCategories";
import { notFound } from "next/navigation";

type Props = {
  params: { facultyCategoryPathName: FacultyCategoryPathName };
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

export default function Page({ params }: Props) {
  const facultyCategory = getFacultyCategoryFromPathName(
    params.facultyCategoryPathName,
  );
  return <FacultySearchPage facultyCategory={facultyCategory} />;
}
