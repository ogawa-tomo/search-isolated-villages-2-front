import Village from "@/types/village";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VILLAGE_API_URL}/api/fortune/result`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw res;
  const data: Village = await res.json();
  return NextResponse.json(data);
}
