import FacultyFortuneModal from "@/components/FacultyFortuneModal";
import VillageFortuneModal from "@/components/VillageFortuneModal";
import { facultyNames } from "@/lib/facultyNames";

export default function Page({ params }: { params: { faculty: string } }) {
  const facultyName = facultyNames(params.faculty);
  return (
    <>
      <h1 className="text-center">秘境{facultyName}占い</h1>
      <p className="text-center">
        今日のラッキー秘境{facultyName}を占います。
      </p>

      <FacultyFortuneModal
        faculty={params.faculty}
      />
    </>
  );
}