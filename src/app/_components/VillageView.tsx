"use client";

import type VillageSearchParams from "@/types/VillageSearchParams";
import { VillageViewPC } from "./VillageViewPC";
import { VillageViewMobile } from "./VillageViewMobile";
import { useMediaQuery } from "react-responsive";
import { useVillageSearchParams } from "../_hooks/VillageSearchParamsContext";
import { useEffect } from "react";

export const VillageView = ({
  searchParams,
}: {
  searchParams: VillageSearchParams;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [_, setVillageSearchParams] = useVillageSearchParams();

  useEffect(() => {
    setVillageSearchParams(searchParams);
  }, [searchParams, setVillageSearchParams]);

  return (
    <>
      {isMobile ? (
        <VillageViewMobile searchParams={searchParams} />
      ) : (
        <VillageViewPC searchParams={searchParams} />
      )}
    </>
  );
};
