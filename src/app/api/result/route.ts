import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_VILLAGE_API_URL
    }/api/result?${searchParams.toString()}`
  );
  if (!res.ok) throw res;
  const data = await res.json();
  return NextResponse.json(data);
}
