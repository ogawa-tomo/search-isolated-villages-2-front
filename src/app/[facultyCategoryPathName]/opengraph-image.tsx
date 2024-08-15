import { getFacultyCategoryFromPathName } from "@/lib/facultyCategories";
import { facultyCategoryLogo } from "@/lib/facultyCategoryLogo";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import { default as NextImage } from "next/image";
import { ImageResponse } from "next/og";

export default function Image({ params }: { params: { facultyCategoryPathName: FacultyCategoryPathName } }) {
  const facultyCategoryName = getFacultyCategoryFromPathName(params.facultyCategoryPathName).name;

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <NextImage
        src={facultyCategoryLogo(facultyCategoryName)}
        alt="logo"
        width={200}
        height={200}
      />
    </div>
  )
}
