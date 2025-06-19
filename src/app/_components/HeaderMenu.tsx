"use client";

import classNames from "classnames";
import { useState } from "react";
import { Menu } from "@/app/_components/Menu";

export const HeaderMenu = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="p-1" onClick={() => setShow(!show)}>
        <div className="rounded bg-white p-1">
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
          "bg-white top-0 left-0 fixed h-screen z-20 transition overflow-scroll py-2",
          {
            "-translate-x-full": !show,
          },
        )}
      >
        <Menu onClick={() => setShow(false)} />
      </div>
      <div
        className={classNames(
          "top-0 left-0 fixed w-screen h-screen z-10 bg-white/50",
          {
            hidden: !show,
          },
        )}
        onClick={() => setShow(!show)}
      ></div>
    </>
  );
};
