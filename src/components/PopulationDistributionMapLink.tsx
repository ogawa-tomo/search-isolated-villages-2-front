import Link from "next/link"
import { FiExternalLink } from "react-icons/fi";
import { PiMapTrifold } from "react-icons/pi";
import React from "react";

export const PopulationDistributionMapLink = ({ href }: { href: string }) => {
  return (
    <Link
      className="link link-primary"
      href={href}
      target="_blank"
    >
      <PiMapTrifold className='inline align-baseline' />
      人口分布図
      <FiExternalLink className='inline align-baseline' />
    </Link>
  )
}
