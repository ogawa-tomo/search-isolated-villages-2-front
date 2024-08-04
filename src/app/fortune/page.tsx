import VillageFortuneModal from "@/components/VillageFortuneModal";
import Image from "next/image";
import logo from "@/public/village.png";

export default function Page() {
  return (
    <>
      <h1 className="text-center">秘境集落占い</h1>
      <Image
        className="m-auto"
        src={logo}
        alt="logo"
        width={200}
        height={200}
      />
      <p className="text-center">
        今日のラッキー秘境集落を占います。
      </p>

      <VillageFortuneModal />
    </>
  );
}