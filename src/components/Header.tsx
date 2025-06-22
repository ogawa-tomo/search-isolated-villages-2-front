import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import headerLogo from "@/public/header_logo.png";
import { HeaderMenu } from "@/app/_components/HeaderMenu";

export const Header = ({ onClickSearch }: { onClickSearch?: () => void }) => {
  return (
    <>
      <div className="sticky top-0 z-10 flex w-screen items-center bg-white p-1">
        <HeaderMenu />
        <Link href="/">
          <Image src={headerLogo} alt="秘境集落探索ツール" height="32" />
        </Link>
        {onClickSearch && (
          <button onClick={onClickSearch}>
            <CiSearch />
          </button>
        )}
      </div>
    </>
  );
};
