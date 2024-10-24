import FacultyFortuneModal from "@/components/FacultyFortuneModal";
import {
  facultyCategoryPathNames,
  getFacultyCategoryFromPathName,
} from "@/lib/facultyCategories";
import { facultyCategoryLogo } from "@/lib/facultyCategoryLogo";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import { Metadata } from "next";
import Image from "next/image";
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
    title: `秘境${facultyCategoryName}占い`,
    description: `今日のラッキー秘境${facultyCategoryName}を占います。`,
  };
}

export default function Page({ params }: Props) {
  const facultyCategoryName = getFacultyCategoryFromPathName(
    params.facultyCategoryPathName,
  ).name;

  return (
    <>
      <h1 className="mb-4 text-center text-3xl font-bold">
        秘境{facultyCategoryName}占い
      </h1>
      <Image
        className="m-auto"
        src={facultyCategoryLogo(facultyCategoryName)}
        alt={facultyCategoryName}
        height={200}
      />
      <p className="my-4 text-center">
        今日のラッキー秘境{facultyCategoryName}を占います。
      </p>

      <FacultyFortuneModal
        facultyCategoryPathName={params.facultyCategoryPathName}
      />
    </>
  );
}
