import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import Faculty from "@/types/Faculty";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { facultyCategoryPathName: FacultyCategoryPathName } },
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/fortune/${params.facultyCategoryPathName}/result`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw res;
  const data: Faculty = await res.json();
  return NextResponse.json(data);
}
