
import { getVillages } from '@/lib/repositories/villageRepository'
import { useSearchParams } from 'next/navigation'

const Page = async ({ searchParams }) => {

  // const params = useSearchParams()
  const villages = await getVillages(searchParams.region);
  return (
    <>
      <h1>秘境集落探索ツール</h1>
      <h2>探索結果</h2>
      <div>{searchParams.region}</div>
      {/* <div>{villages[0].name}</div> */}
      <ul>
        {villages.map((village, index) => (
          <li key={index}>{village.name}</li>
        ))}
      </ul>
    </>
  )
}

export default Page;