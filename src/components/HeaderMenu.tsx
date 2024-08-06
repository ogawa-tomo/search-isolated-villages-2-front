'use client';

import classNames from "classnames"
import { useState } from "react"
import { Menu } from "./Menu";

export const HeaderMenu = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="md:hidden btn btn-square btn-ghost fixed top-0 right-0" onClick={() => setShow(!show)}>
        <div className="p-2 rounded bg-white border border-neutral-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="grid place-items-center w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </div>
      </button>
      <div className={classNames("md:hidden bg-white top-0 fixed h-screen z-20 transition overflow-scroll", {
        "-translate-x-full": !show,
      })}>
        <Menu
          onClick={() => setShow(false)}
        />
      </div>
      <div className={classNames("md:hidden top-0 fixed w-screen h-screen z-10", {
        "hidden": !show,
      })} onClick={() => setShow(!show)}></div>
    </>
  )
}
