import VillageSearchParams from '@/types/villageSearchParams';
import Link from 'next/link';

type PaginationProps = {
  current_page: number;
  pages: number;
  path: string;
  queryParams: {};
};

const Pagination = (props: PaginationProps) => {
  const { current_page, pages, path, queryParams } = props;
  const neighbors_num = 2;
  const min_page = Math.max(1, current_page - neighbors_num);
  const max_page = Math.min(pages, current_page + neighbors_num);
  const page_array = [...Array(max_page - min_page + 1)].map(
    (_, i) => i + min_page
  );

  return (
    <div>
      {min_page > 1 && (
        <button className="btn">
          <PageLink page={1} path={path} queryParams={queryParams} />
        </button>
      )}
      {min_page > 2 && (
        <button className="btn btn-disabled">...</button>
      )}
      {page_array.map((page, index) =>
        page === current_page ? (
          <button key={index} className="btn cursor-default">
            {page}
          </button>
        ) : (
          <button key={index} className="btn">
            <PageLink page={page} path={path} queryParams={queryParams} />
          </button>
        )
      )}
      {max_page < pages - 1 && (
        <button className="btn btn-disabled">...</button>
      )}
      {max_page < pages && (
        <button className="btn">
          <PageLink page={pages} path={path} queryParams={queryParams} />
        </button>
      )}
    </div>
  );
};

type PageLinkProps = {
  page: number;
  path: string;
  queryParams: {};
};

const PageLink = (props: PageLinkProps) => {
  const { page, path, queryParams } = props;
  const query = new URLSearchParams({
    ...queryParams,
    page: String(page)
  });
  return <Link href={`${path}?${query.toString()}`}>{page}</Link>;
};

export default Pagination;
