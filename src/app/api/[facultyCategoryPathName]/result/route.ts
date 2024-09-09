import { FacultyCategoryPathName } from "@/types/FacultyCategory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { facultyCategoryPathName: FacultyCategoryPathName } },
) {
  const searchParams = request.nextUrl.searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/${
      params.facultyCategoryPathName
    }/result?${searchParams.toString()}`,
  );
  if (!response.ok) throw response;
  const data = await response.json();
  return NextResponse.json(data);
}
