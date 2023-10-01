import VillageSearchForm from "@/components/VillageSearchForm";
import localImage from "@/public/village.png"
import Image from 'next/image'

export default function Page() {
  return (
    <>
      <h1 className="text-center">秘境集落探索ツール</h1>
      <p className="text-center">秘境集落を探索し、秘境度を人口分布データをもとに評価して地域別にランキングで出力します。</p>
      <Image className='m-auto' src={localImage} alt='village' width={300} height={300} />
      <VillageSearchForm />
    </>
  )
}
