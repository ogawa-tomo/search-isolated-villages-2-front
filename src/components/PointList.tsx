import Village from "@/types/Village";
import Faculty from "@/types/Faculty";
import clsx from "clsx";

const pointKey = (point: Village | Faculty) => {
  return (
    point.pref +
    point.city +
    point.district +
    point.urban_point +
    point.google_map_url
  );
};

type Props = {
  points: Village[] | Faculty[];
  selectedPoint: Village | Faculty | undefined;
  rankStart: number;
  onClickPoint?: (point: Village | Faculty) => void;
};

export const PointList = ({
  points,
  rankStart,
  selectedPoint,
  onClickPoint,
}: Props) => {
  return (
    <>
      <table className="flex w-80 border-collapse flex-col items-center">
        <tbody className="flex w-full flex-col items-center">
          {points.map((point, index) => (
            <tr
              key={pointKey(point)}
              className={clsx(
                "flex w-full cursor-pointer items-center border border-slate-400",
                selectedPoint === point && "bg-slate-200",
              )}
              onClick={() => onClickPoint?.(point)}
            >
              <td className="w-1/6 text-center">
                {rankStart + index}
                <span className="text-xs">位</span>
              </td>
              <td className="w-5/6 p-2">
                <PointCard point={point} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const PointCard = ({ point }: { point: Village | Faculty }) => {
  switch (point.type) {
    case "village":
      return (
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">
            {point.pref} {point.city} {point.district}
          </div>
          <div className="text-sm">
            <span>人口: {point.population}人</span>
            <div className="inline-block w-4" />
            <span>都会度: {point.urban_point}</span>
          </div>
        </div>
      );
    case "faculty":
      return (
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">{point.name}</div>
          <div className="text-sm">
            <span>
              {point.pref} {point.city} {point.district}
            </span>
          </div>
          <div className="text-sm">
            <span>都会度: {point.urban_point}</span>
          </div>
        </div>
      );
  }
};

export default PointList;
