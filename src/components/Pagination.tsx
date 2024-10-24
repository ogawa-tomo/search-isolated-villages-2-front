import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

type PaginationProps = {
  currentPage: number;
  pages: number;
  path: string;
  queryParams: {};
};

const Pagination = (props: PaginationProps) => {
  const { currentPage, pages, path, queryParams } = props;
  const neighborsNum = 1;
  const minPage = Math.max(1, currentPage - neighborsNum);
  const maxPage = Math.min(pages, currentPage + neighborsNum);
  const page_array = [...Array(maxPage - minPage + 1)].map(
    (_, i) => i + minPage,
  );

  return (
    <nav aria-label="pagination">
      <ul className="flex gap-1">
        {currentPage > 1 && (
          <PaginationListElementWrapper type="link">
            <PageLink
              page={currentPage - 1}
              path={path}
              queryParams={queryParams}
            >
              <IoIosArrowBack />
            </PageLink>
          </PaginationListElementWrapper>
        )}
        {minPage > 1 && (
          <PaginationListElementWrapper type="link">
            <PageLink page={1} path={path} queryParams={queryParams}>
              1
            </PageLink>
          </PaginationListElementWrapper>
        )}
        {minPage > 2 && (
          <PaginationListElementWrapper type="dots">
            ...
          </PaginationListElementWrapper>
        )}
        {page_array.map((page) =>
          page === currentPage ? (
            <PaginationListElementWrapper type="current" key={page}>
              {page}
            </PaginationListElementWrapper>
          ) : (
            <PaginationListElementWrapper type="link" key={page}>
              <PageLink page={page} path={path} queryParams={queryParams}>
                {page}
              </PageLink>
            </PaginationListElementWrapper>
          ),
        )}
        {maxPage < pages - 1 && (
          <PaginationListElementWrapper type="dots">
            ...
          </PaginationListElementWrapper>
        )}
        {maxPage < pages && (
          <PaginationListElementWrapper type="link">
            <PageLink page={pages} path={path} queryParams={queryParams}>
              {pages}
            </PageLink>
          </PaginationListElementWrapper>
        )}
        {currentPage < pages && (
          <PaginationListElementWrapper type="link">
            <PageLink
              page={currentPage + 1}
              path={path}
              queryParams={queryParams}
            >
              <IoIosArrowForward />
            </PageLink>
          </PaginationListElementWrapper>
        )}
      </ul>
    </nav>
  );
};

type PaginationListElementWrapperProps = {
  children: ReactNode;
  type: "current" | "dots" | "link";
};

const PaginationListElementWrapper = ({
  children,
  type,
}: PaginationListElementWrapperProps) => {
  return (
    <li
      className={clsx(
        "flex h-12 w-10 items-center justify-center border-2",
        (type === "current" || type === "dots") && "cursor-default",
        type === "current" && "bg-primary text-white",
        type === "link" && "bg-white",
        type === "dots" && "border-none bg-white",
      )}
    >
      {children}
    </li>
  );
};

type PageLinkProps = {
  page: number;
  path: string;
  queryParams: {};
  children: ReactNode;
};

const PageLink = (props: PageLinkProps) => {
  const { page, path, queryParams, children } = props;
  const query = new URLSearchParams({
    ...queryParams,
    page: String(page),
  });
  return (
    <Link
      href={`${path}?${query.toString()}`}
      className="grid size-full place-items-center"
    >
      {children}
    </Link>
  );
};

export default Pagination;
