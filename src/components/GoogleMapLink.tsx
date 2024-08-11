import { SiGooglemaps } from "react-icons/si";
import React from "react";
import { TextLink } from "./TextLink";

export const GoogleMapLink = ({ href }: { href: string }) => {
  return (
    <TextLink href={href} external>
      <SiGooglemaps className='inline align-baseline' />
      Googleマップ
    </TextLink>
  )
}
