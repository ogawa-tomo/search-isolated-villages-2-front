import FacultySearchForm from "@/components/FacultySearchForm";
import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import { FacultyCategoryPathName } from "@/types/FacultyCategoryPathName";

export default function Page({ params }: { params: { facultyCategoryPathName: FacultyCategoryPathName } }) {
  const facultyCategoryName = getFacultyCategoryFromPathName(params.facultyCategoryPathName).name;

  return (
    <>
      <h1 className="text-center">秘境{facultyCategoryName}探索ツール</h1>
      <p className="text-center">
        秘境{facultyCategoryName}を探索し、秘境度を人口分布データをもとに評価して地域別にランキングで出力します。
      </p>
      <FacultySearchForm
        facultyCategoryPathName={params.facultyCategoryPathName}
      />
    </>
  );
}