import clsx from "clsx";
import { ReactNode } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

type PaginationProps = {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const { pages, currentPage, onPageChange } = props;

  return (
    <nav aria-label="pagination">
      <ul className="flex items-center gap-1">
        <PageLink
          disabled={currentPage === 1}
          onClick={() => {
            onPageChange(1);
          }}
        >
          <MdKeyboardDoubleArrowLeft />
        </PageLink>
        <PageLink
          disabled={currentPage === 1}
          onClick={() => {
            onPageChange(Math.max(currentPage - 1, 1));
          }}
        >
          <MdKeyboardArrowLeft />
        </PageLink>

        <div className="flex w-16 items-center justify-center">
          {currentPage}/{pages}
        </div>

        <PageLink
          disabled={currentPage === pages}
          onClick={() => {
            onPageChange(Math.min(currentPage + 1, pages));
          }}
        >
          <MdKeyboardArrowRight />
        </PageLink>

        <PageLink
          disabled={currentPage === pages}
          onClick={() => {
            onPageChange(pages);
          }}
        >
          <MdKeyboardDoubleArrowRight />
        </PageLink>
      </ul>
    </nav>
  );
};

type PageLinkProps = {
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

const PageLink = (props: PageLinkProps) => {
  const { onClick, children, disabled } = props;
  return (
    <li className="flex h-12 w-8 items-center justify-center">
      <button
        onClick={onClick}
        className={clsx(
          "grid size-full place-items-center",
          disabled && "cursor-default text-gray-400",
        )}
      >
        {children}
      </button>
    </li>
  );
};

export default Pagination;
