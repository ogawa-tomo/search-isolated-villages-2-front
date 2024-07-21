import { FacultyCategoryPathName } from '@/types/FacultyCategory';
import Faculty from '@/types/faculty';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: { facultyCategoryPathName: FacultyCategoryPathName } }
) {
  console.log(params);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/fortune/${params.facultyCategoryPathName}/result`
  );
  const data: Faculty = await res.json();
  return NextResponse.json(data);
}
