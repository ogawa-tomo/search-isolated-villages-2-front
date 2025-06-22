import clsx from "clsx";
import { ReactNode, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

type PaginationProps = {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination2 = (props: PaginationProps) => {
  const { pages, currentPage, onPageChange } = props;

  return (
    <nav aria-label="pagination">
      <ul className="flex items-center gap-1">
        <PaginationListElementWrapper disabled={currentPage === 1}>
          <PageLink
            onClick={() => {
              onPageChange(1);
            }}
          >
            <MdKeyboardDoubleArrowLeft />
          </PageLink>
        </PaginationListElementWrapper>
        <PaginationListElementWrapper disabled={currentPage === 1}>
          <PageLink
            onClick={() => {
              onPageChange(currentPage - 1);
            }}
          >
            <MdKeyboardArrowLeft />
          </PageLink>
        </PaginationListElementWrapper>

        <div className="flex w-16 items-center justify-center">
          {currentPage}/{pages}
        </div>

        <PaginationListElementWrapper disabled={currentPage === pages}>
          <PageLink
            onClick={() => {
              onPageChange(currentPage + 1);
            }}
          >
            <MdKeyboardArrowRight />
          </PageLink>
        </PaginationListElementWrapper>
        <PaginationListElementWrapper disabled={currentPage === pages}>
          <PageLink
            onClick={() => {
              onPageChange(pages);
            }}
          >
            <MdKeyboardDoubleArrowRight />
          </PageLink>
        </PaginationListElementWrapper>
      </ul>
    </nav>
  );
};

type PaginationListElementWrapperProps = {
  children: ReactNode;
  disabled?: boolean;
};

const PaginationListElementWrapper = ({
  children,
  disabled,
}: PaginationListElementWrapperProps) => {
  return (
    <li
      className={clsx(
        "flex h-12 w-8 items-center justify-center",
        disabled && "cursor-default text-gray-400",
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
