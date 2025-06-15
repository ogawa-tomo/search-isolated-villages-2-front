"use client";

import { VillageView } from "@/app/_components/VillageView";
import { VillageSearchParamsProvider } from "./_hooks/VillageSearchParamsContext";

export default function Page() {
  return (
    <>
      <VillageSearchParamsProvider>
        {<VillageView />}
      </VillageSearchParamsProvider>
    </>
  );
}
