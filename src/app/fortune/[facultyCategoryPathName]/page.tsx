import FacultyFortuneModal from "@/components/FacultyFortuneModal";
import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";

export default function Page({ params }: { params: { facultyCategoryPathName: FacultyCategoryPathName } }) {
  const facultyName = getFacultyCategoryFromPathName(params.facultyCategoryPathName).name

  return (
    <>
      <h1 className="text-center">秘境{facultyName}占い</h1>
      <p className="text-center">
        今日のラッキー秘境{facultyName}を占います。
      </p>

      <FacultyFortuneModal
        facultyCategoryPathName={params.facultyCategoryPathName}
      />
    </>
  );
}