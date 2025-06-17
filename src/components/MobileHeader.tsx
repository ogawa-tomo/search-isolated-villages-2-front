import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import headerLogo from "@/public/header_logo.png";

export const MobileHeader = ({
  onClickSearch,
}: {
  onClickSearch: () => void;
}) => {
  return (
    <>
      <div className="flex p-2">
        <Link href="/">
          <Image src={headerLogo} alt="秘境集落探索ツール" height="32" />
        </Link>
        <button onClick={onClickSearch}>
          <CiSearch />
        </button>
      </div>
    </>
  );
};
