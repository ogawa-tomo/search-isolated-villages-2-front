import { facultyCategories } from "@/lib/facultyCategories"
import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react";

export const Menu = ({ onClick }: { onClick?: () => void }) => {
  return (
    <aside>
      <ul className="menu w-60 text-lg">
        <li><MenuElement path="/" onClick={onClick}>秘境集落探索</MenuElement></li>
        <li>
          <details>
            <summary>秘境施設探索</summary>
            <ul>
              {facultyCategories.map((facultyCategory => {
                return (
                  <li key={facultyCategory.pathName}>
                    <MenuElement path={`/${facultyCategory.pathName}`} onClick={onClick}>
                      {facultyCategory.name}
                    </MenuElement>
                  </li>
                )
              }))}
            </ul>
          </details>
        </li>
        <li>
          <MenuElement path="/fortune" onClick={onClick}>
            秘境集落占い
          </MenuElement>
        </li>
        <li>
          <details>
            <summary>秘境施設占い</summary>
            <ul>
              {facultyCategories.map((facultyCategory => {
                return (
                  <li key={facultyCategory.pathName}>
                    <MenuElement path={`/fortune/${facultyCategory.pathName}`} onClick={onClick}>
                      {facultyCategory.name}
                    </MenuElement>
                  </li>
                )
              }))}
            </ul>
          </details>
        </li>
        <li>
          <MenuElement path="/about" onClick={onClick}>
            このツールについて
          </MenuElement>
        </li>

      </ul>
    </aside>
  )
}

const MenuElement = ({ path, onClick, children }: { path: string; onClick?: () => void; children: ReactNode; }) => {
  return (
    <Link
      href={path}
      className={classNames({ "bg-base-200": path === usePathname() })}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
