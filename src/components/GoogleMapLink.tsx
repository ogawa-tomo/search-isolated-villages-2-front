import Link from "next/link"
import { SiGooglemaps } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import React from "react";

export const GoogleMapLink = ({ href }: { href: string }) => {
  return (
    <Link
      className="link link-primary"
      href={href}
      target="_blank"
    >
      <SiGooglemaps className='inline align-baseline' />
      Googleマップ
      <FiExternalLink className='inline align-baseline' />
    </Link>
  )
}
