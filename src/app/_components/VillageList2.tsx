import Village from "@/types/Village";
import { GoogleMapLink } from "@/components/GoogleMapLink";
import { PopulationDistributionMapLink } from "@/components/PopulationDistributionMapLink";

export const VillageList2 = ({
  villages,
  rankStart,
  onClickVillage,
}: {
  villages: Village[];
  rankStart: number;
  onClickVillage?: (village: Village) => void;
}) => {
  if (villages.length === 0) {
    return (
      <div className="text-center">該当する集落が見つかりませんでした</div>
    );
  }

  return (
    <>
      <table className="flex w-80 border-collapse flex-col items-center p-2">
        <tbody className="flex w-full flex-col items-center">
          {villages.map((village, index) => (
            <tr
              key={
                village.pref +
                village.city +
                village.district +
                village.urban_point +
                village.google_map_url
              }
              className="flex w-full items-center border border-slate-400"
              onClick={() => onClickVillage?.(village)}
            >
              <td className="w-1/5 text-center">
                {rankStart + index}
                <span className="text-xs">位</span>
              </td>
              <td className="grow p-2">
                <VillageCard village={village} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const VillageCard = ({ village }: { village: Village }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-bold">
        {village.pref} {village.city} {village.district}
      </div>
      <div className="text-sm">
        <span>人口: {village.population}人</span>
        <div className="inline-block w-4" />
        <span>都会度: {village.urban_point}</span>
      </div>
    </div>
  );
};

export default VillageList2;
