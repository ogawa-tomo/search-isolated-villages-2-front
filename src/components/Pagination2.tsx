import clsx from "clsx";
import { ReactNode, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

type PaginationProps = {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination2 = (props: PaginationProps) => {
  const { pages, currentPage, onPageChange } = props;
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
              onClick={() => {
                onPageChange(currentPage - 1);
              }}
            >
              <IoIosArrowBack />
            </PageLink>
          </PaginationListElementWrapper>
        )}
        {minPage > 1 && (
          <PaginationListElementWrapper type="link">
            <PageLink
              onClick={() => {
                onPageChange(1);
              }}
            >
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
              <PageLink
                onClick={() => {
                  onPageChange(page);
                }}
              >
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
            <PageLink
              onClick={() => {
                onPageChange(pages);
              }}
            >
              {pages}
            </PageLink>
          </PaginationListElementWrapper>
        )}
        {currentPage < pages && (
          <PaginationListElementWrapper type="link">
            <PageLink
              onClick={() => {
                onPageChange(currentPage + 1);
              }}
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
  onClick: () => void;
  children: ReactNode;
};

const PageLink = (props: PageLinkProps) => {
  const { onClick, children } = props;
  return (
    <button onClick={onClick} className="grid size-full place-items-center">
      {children}
    </button>
  );
};

export default Pagination2;
