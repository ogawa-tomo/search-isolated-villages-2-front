"use client";

import { VillageView } from "@/app/_components/VillageView";
import VillageSearchParams from "@/types/VillageSearchParams";
import { VillageSearchParamsProvider } from "./_hooks/VillageSearchParamsContext";

export default function Page({
  searchParams,
}: {
  searchParams: VillageSearchParams;
}) {
  return (
    <>
      <VillageSearchParamsProvider>
        {<VillageView searchParams={searchParams} />}
      </VillageSearchParamsProvider>
    </>
  );
}
