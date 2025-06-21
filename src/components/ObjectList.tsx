import Village from "@/types/Village";
import Faculty from "@/types/Faculty";

const objectKey = (object: Village | Faculty) => {
  return (
    object.pref +
    object.city +
    object.district +
    object.urban_point +
    object.google_map_url
  );
};

type Props = {
  objects: Village[] | Faculty[];
  rankStart: number;
  onClickObject?: (object: Village | Faculty) => void;
};

export const ObjectList = ({ objects, rankStart, onClickObject }: Props) => {
  return (
    <>
      <table className="flex w-80 border-collapse flex-col items-center p-2">
        <tbody className="flex w-full flex-col items-center">
          {objects.map((object, index) => (
            <tr
              key={objectKey(object)}
              className="flex w-full items-center border border-slate-400"
              onClick={() => onClickObject?.(object)}
            >
              <td className="w-1/5 text-center">
                {rankStart + index}
                <span className="text-xs">位</span>
              </td>
              <td className="w-4/5 p-2">
                <ObjectCard object={object} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const ObjectCard = ({ object }: { object: Village | Faculty }) => {
  switch (object.type) {
    case "village":
      return (
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">
            {object.pref} {object.city} {object.district}
          </div>
          <div className="text-sm">
            <span>人口: {object.population}人</span>
            <div className="inline-block w-4" />
            <span>都会度: {object.urban_point}</span>
          </div>
        </div>
      );
    case "faculty":
      return (
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">{object.name}</div>
          <div className="text-sm">
            <span>
              {object.pref} {object.city} {object.district}
            </span>
          </div>
          <div className="text-sm">
            <span>都会度: {object.urban_point}</span>
          </div>
        </div>
      );
  }
};

export default ObjectList;
