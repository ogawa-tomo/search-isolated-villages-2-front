import FacultySearchForm from "@/components/FacultySearchForm";
import { facultyNames } from "@/lib/facultyNames";

export default function Page({ params }: { params: { faculties: string } }) {
  const facultyName = facultyNames(params.faculties);
  return (
    <>
      <h1 className="text-center">秘境{facultyName}探索ツール</h1>
      <p className="text-center">
        秘境{facultyName}を探索し、秘境度を人口分布データをもとに評価して地域別にランキングで出力します。
      </p>
      <FacultySearchForm
        faculties={params.faculties}
      />
    </>
  );
}