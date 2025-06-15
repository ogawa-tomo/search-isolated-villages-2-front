"use client";

import type VillageSearchParams from "@/types/VillageSearchParams";
import { VillageViewPC } from "./VillageViewPC";
import { VillageViewMobile } from "./VillageViewMobile";
import { useMediaQuery } from "react-responsive";
import { useVillageSearchParams } from "../_hooks/VillageSearchParamsContext";
import { useEffect } from "react";

export const VillageView = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {/* 開発中のためモバイルのみ */}
      {/* {isMobile ? (
        <VillageViewMobile/>
      ) : (
        <VillageViewPC />
      )} */}
      <VillageViewMobile />
    </>
  );
};
