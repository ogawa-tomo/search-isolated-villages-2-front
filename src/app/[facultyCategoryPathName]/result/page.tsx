import Loading from "@/components/Loading";
import FacultySearchForm from "@/components/FacultySearchForm";
import { Suspense } from "react";
import FacultyList from "@/components/FacultyList";
import FacultySearchParams from "@/types/facultySearchParams";
import { FacultyCategoryPathName } from "@/types/FacultyCategory";

const Page = async ({ params, searchParams }: { params: { facultyCategoryPathName: FacultyCategoryPathName }, searchParams: FacultySearchParams }) => {
  return (
    <>
      <FacultySearchForm
        facultyCategoryPathName={params.facultyCategoryPathName}
        inputRegion={searchParams.region}
        inputIslandSetting={searchParams.islandSetting}
        inputKeyWords={searchParams.keyWords}
      />
      <h2 className="text-center">探索結果</h2>
      <Suspense fallback={<Loading />}>
        <FacultyList
          facultyCategoryPathName={params.facultyCategoryPathName}
          searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default Page;
