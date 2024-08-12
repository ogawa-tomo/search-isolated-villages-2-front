import Link from 'next/link';

type PaginationProps = {
  currentPage: number;
  pages: number;
  path: string;
  queryParams: {};
};

const Pagination = (props: PaginationProps) => {
  const { currentPage, pages, path, queryParams } = props;
  const neighbors_num = 2;
  const min_page = Math.max(1, currentPage - neighbors_num);
  const max_page = Math.min(pages, currentPage + neighbors_num);
  const page_array = [...Array(max_page - min_page + 1)].map(
    (_, i) => i + min_page
  );

  return (
    <nav aria-label='pagination'>
      <ul className="join">
        {min_page > 1 && (
          <li className="btn join-item bg-pagination p-0 w-10">
            <PageLink page={1} path={path} queryParams={queryParams} />
          </li>
        )}
        {min_page > 2 && (
          <li className="btn cursor-default join-item bg-pagination-dots p-0 w-10">...</li>
        )}
        {page_array.map((page, index) =>
          page === currentPage ? (
            <li key={index} className="btn cursor-default bg-primary p-0 w-10">
              {page}
            </li>
          ) : (
            <li key={index} className='btn join-item bg-pagination p-0 w-10'>
              <PageLink key={index} page={page} path={path} queryParams={queryParams} />
            </li>
          )
        )}
        {max_page < pages - 1 && (
          <li className="btn cursor-default join-item bg-pagination-dots p-0 w-10">...</li>
        )}
        {max_page < pages && (
          <li className='btn join-item bg-pagination p-0 w-10'>
            <PageLink page={pages} path={path} queryParams={queryParams} />
          </li>
        )}
      </ul>
    </nav>
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
  return <Link href={`${path}?${query.toString()}`} className='grid place-items-center h-full w-full'>{page}</Link>;
};

export default Pagination;
