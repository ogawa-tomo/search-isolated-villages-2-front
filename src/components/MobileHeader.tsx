import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import headerLogo from "@/public/header_logo.png";
import { useSetShowVillageSearchModal } from "@/app/_hooks/VillageSearchParamsContext";

export const MobileHeader = () => {
  const setShowModal = useSetShowVillageSearchModal();
  return (
    <>
      <div className="flex p-2">
        <Link href="/">
          <Image src={headerLogo} alt="秘境集落探索ツール" height="32" />
        </Link>
        <button
          onClick={() => {
            console.log("setShowModal!");
            setShowModal(true);
          }}
        >
          <CiSearch />
        </button>
      </div>
    </>
  );
};
