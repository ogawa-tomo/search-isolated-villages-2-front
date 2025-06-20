import Faculty from "@/types/Faculty";

export const FacultyList = ({
  faculties,
  rankStart,
  onClickFaculty,
}: {
  faculties: Faculty[];
  rankStart: number;
  onClickFaculty?: (faculty: Faculty) => void;
}) => {
  return (
    <>
      <table className="flex w-80 border-collapse flex-col items-center p-2">
        <tbody className="flex w-full flex-col items-center">
          {faculties.map((faculty, index) => (
            <tr
              key={
                faculty.name +
                faculty.pref +
                faculty.city +
                faculty.district +
                faculty.urban_point +
                faculty.google_map_url
              }
              className="flex w-full items-center border border-slate-400"
              onClick={() => onClickFaculty?.(faculty)}
            >
              <td className="w-1/5 text-center">
                {index + rankStart}
                <span className="text-xs">位</span>
              </td>
              <td className="grow p-2">
                <FacultyCard faculty={faculty} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const FacultyCard = ({ faculty }: { faculty: Faculty }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-bold">{faculty.name}</div>
      <div className="text-sm">
        <span>
          {faculty.pref} {faculty.city} {faculty.district}
        </span>
      </div>
      <div className="text-sm">
        <span>都会度: {faculty.urban_point}</span>
      </div>
    </div>
  );
};

export default FacultyList;
