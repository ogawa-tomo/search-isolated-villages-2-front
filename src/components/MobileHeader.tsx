import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import headerLogo from "@/public/header_logo.png";
import { HeaderMenu } from "@/app/_components/HeaderMenu";

export const MobileHeader = ({
  onClickSearch,
}: {
  onClickSearch: () => void;
}) => {
  return (
    <>
      <div className="flex items-center p-1">
        <HeaderMenu />
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
