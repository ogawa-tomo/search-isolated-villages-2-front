"use client";

import classNames from "classnames";
import { useState } from "react";
import { Menu } from "@/app/_components/Menu";

export const HeaderMenu = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        className="btn btn-square btn-ghost fixed right-0 top-0 md:hidden"
        onClick={() => setShow(!show)}
      >
        <div className="rounded border border-neutral-600 bg-white p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="grid size-5 place-items-center stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
      </button>
      <div
        className={classNames(
          "md:hidden bg-white top-0 fixed h-screen z-20 transition overflow-scroll",
          {
            "-translate-x-full": !show,
          },
        )}
      >
        <Menu onClick={() => setShow(false)} />
      </div>
      <div
        className={classNames(
          "md:hidden top-0 fixed w-screen h-screen z-10 bg-gray-500/75",
          {
            hidden: !show,
          },
        )}
        onClick={() => setShow(!show)}
      ></div>
    </>
  );
};
