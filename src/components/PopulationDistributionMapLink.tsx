import { PiMapTrifold } from "react-icons/pi";
import React from "react";
import { TextLink } from "./TextLink";

export const PopulationDistributionMapLink = ({ href }: { href: string }) => {
  return (
    <TextLink href={href} external>
      <PiMapTrifold className='inline align-baseline' />
      人口分布図
    </TextLink>
  )
}
