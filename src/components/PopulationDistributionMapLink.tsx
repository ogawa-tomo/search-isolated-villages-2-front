import { PiMapTrifold } from "react-icons/pi";
import React from "react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

export const PopulationDistributionMapLink = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-block rounded-lg border border-primary-color bg-white text-primary-color hover:bg-lightened-primary-color"
    >
      <div className="p-1">
        <PiMapTrifold className="inline align-baseline" />
        人口分布図
        <FiExternalLink className="inline align-baseline" />
      </div>
    </Link>
  );
};
