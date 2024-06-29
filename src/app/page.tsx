import VillageSearchForm from "@/components/VillageSearchForm";
import logo from "@/public/top_logo.png";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Image
        className="m-auto"
        src={logo}
        alt="logo"
        width={300}
        height={300}
      />
      <p className="text-center">
        秘境集落を探索し、秘境度を人口分布データをもとに評価して地域別にランキングで出力します。
      </p>
      <VillageSearchForm />
    </>
  );
}
