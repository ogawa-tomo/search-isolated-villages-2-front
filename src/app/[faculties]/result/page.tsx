import Loading from "@/components/Loading";
import FacultySearchForm from "@/components/FacultySearchForm";
import { Suspense } from "react";
import FacultyList from "@/components/FacultyList";
import FacultySearchParams from "@/types/facultySearchParams";

const Page = async ({ params, searchParams }: { params: { faculties: string }, searchParams: FacultySearchParams }) => {
  return (
    <>
      <FacultySearchForm
        faculties={params.faculties}
        inputRegion={searchParams.region}
        inputIslandSetting={searchParams.islandSetting}
        inputKeyWords={searchParams.keyWords}
      />
      <h2 className="text-center">探索結果</h2>
      <Suspense fallback={<Loading />}>
        <FacultyList
          faculty={params.faculties}
          searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default Page;
