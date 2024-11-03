import { SiGooglemaps } from "react-icons/si";
import React from "react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

export const GoogleMapLink = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-block rounded-lg border border-primary-color bg-white text-primary-color hover:bg-lightened-primary-color"
    >
      <div className="p-1">
        <SiGooglemaps className="inline align-baseline" />
        Googleマップ
        <FiExternalLink className="inline align-baseline" />
      </div>
    </Link>
  );
};
