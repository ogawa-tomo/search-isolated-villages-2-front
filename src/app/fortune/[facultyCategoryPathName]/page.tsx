import FacultyFortuneModal from "@/components/FacultyFortuneModal";
import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import { facultyCategoryLogo } from "@/lib/facultyCategoryLogo";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import Image from "next/image";

export default function Page({ params }: { params: { facultyCategoryPathName: FacultyCategoryPathName } }) {
  const facultyCategoryName = getFacultyCategoryFromPathName(params.facultyCategoryPathName).name

  return (
    <>
      <h1 className="text-center">秘境{facultyCategoryName}占い</h1>
      <Image
        className="m-auto"
        src={facultyCategoryLogo(facultyCategoryName)}
        alt="logo"
        width={200}
        height={200}
      />
      <p className="text-center">
        今日のラッキー秘境{facultyCategoryName}を占います。
      </p>

      <FacultyFortuneModal
        facultyCategoryPathName={params.facultyCategoryPathName}
      />
    </>
  );
}