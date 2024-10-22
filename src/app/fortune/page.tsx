import VillageFortuneModal from "@/app/fortune/components/VillageFortuneModal";
import Image from "next/image";
import logo from "@/public/village.png";

export const metadata = {
  title: "秘境集落占い",
  description: "今日のラッキー秘境集落を占います。",
};

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">秘境集落占い</h1>
      <Image className="m-auto" src={logo} alt="集落" height={200} />
      <p className="text-center my-4">今日のラッキー秘境集落を占います。</p>

      <VillageFortuneModal />
    </>
  );
}
