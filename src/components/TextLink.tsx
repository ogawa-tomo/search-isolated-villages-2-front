import Link from "next/link";
import { ReactNode } from "react";
import { FiExternalLink } from "react-icons/fi";

type Props = {
  href: string;
  external?: boolean,
  children: ReactNode
}

export const TextLink = ({
  href,
  external = false,
  children,
}: Props) => {
  return <Link
    className="link link-primary"
    href={href}
    target={external ? "_blank" : ""}
  >
    {children}
    {external && <FiExternalLink className="inline align-baseline" />}
  </Link>
}