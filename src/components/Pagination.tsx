import { VillageSearchParams } from "@/types/villageSearchParams";
import Link from "next/link";

type PaginationProps = {
  current_page: number;
  pages: number;
  params: VillageSearchParams;
}

const Pagination = (props: PaginationProps) => {
  const { current_page, pages, params } = props
  const neighbors_num = 2
  const min_page = Math.max(1, current_page - neighbors_num)
  const max_page = Math.min(pages, current_page + neighbors_num)
  const page_array = [...Array(max_page - min_page + 1)].map((_, i) => i + min_page);

  return (
    <>
      <div className="join flex justify-center">
        {min_page > 1 && <button className="join-item btn">
          <PageLink
            page={1}
            params={params}
          />
        </button>}
        {min_page > 2 && <button className="join-item btn btn-disabled">...</button>}
        {page_array.map((page) => (
          page === current_page
            ? <button className="join-item btn cursor-default">{page}</button>
            : <button className="join-item btn">
                <PageLink
                  page={page}
                  params={params}
                />
              </button>
        ))}
        {max_page < pages - 1 && <button className="join-item btn btn-disabled">...</button>}
        {max_page < pages && <button className="join-item btn">
          <PageLink
            page={pages}
            params={params}
          />
        </button>}
      </div>
    </>
  )
}

type PageLinkProps = {
  page: number;
  params: VillageSearchParams;
}

const PageLink = (props: PageLinkProps) => {
  const { page, params } = props
  const query = new URLSearchParams(params)
  query.set('page', String(page))
  return (
    <Link href={`/result?${query.toString()}`}>{page}</Link>
  )
}

export default Pagination
