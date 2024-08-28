import FacultyFortuneModal from "@/components/FacultyFortuneModal";
import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import { facultyCategoryLogo } from "@/lib/facultyCategoryLogo";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: { facultyCategoryPathName: FacultyCategoryPathName }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const facultyCategoryName = getFacultyCategoryFromPathName(params.facultyCategoryPathName).name;
  return {
    title: `秘境${facultyCategoryName}占い`,
    description: `今日のラッキー秘境${facultyCategoryName}を占います。`,
  }
}

export default function Page({ params }: Props) {
  const facultyCategoryName = getFacultyCategoryFromPathName(params.facultyCategoryPathName).name

  return (
    <>
      <h1 className="text-center">秘境{facultyCategoryName}占い</h1>
      <Image
        className="m-auto"
        src={facultyCategoryLogo(facultyCategoryName)}
        alt={facultyCategoryName}
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