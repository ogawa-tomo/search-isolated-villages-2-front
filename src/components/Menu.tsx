import { facultyCategories } from "@/lib/facultyCategories"
import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Menu = ({ onClick }: { onClick?: () => void }) => {
  return (
    <aside>
      <ul className="menu w-60">
        <li><MenuElement path="/" name="秘境集落探索" onClick={onClick} /></li>
        <li>
          <details>
            <summary>秘境施設探索</summary>
            <ul>
              {facultyCategories.map((facultyCategory => {
                return (
                  <li key={facultyCategory.pathName}>
                    <MenuElement path={`/${facultyCategory.pathName}`} name={facultyCategory.name} onClick={onClick} />
                  </li>
                )
              }))}
            </ul>
          </details>
        </li>
        <li><MenuElement path="/fortune" name="秘境集落占い" onClick={onClick} /></li>
        <li>
          <details>
            <summary>秘境施設占い</summary>
            <ul>
              {facultyCategories.map((facultyCategory => {
                return (
                  <li key={facultyCategory.pathName}>
                    <MenuElement path={`/fortune/${facultyCategory.pathName}`} name={facultyCategory.name} onClick={onClick} />
                  </li>
                )
              }))}
            </ul>
          </details>
        </li>
        <li><MenuElement path="/about" name="このツールについて" onClick={onClick} /></li>

      </ul>
    </aside>
  )
}

const MenuElement = ({ path, name, onClick }: { path: string; name: string; onClick?: () => void }) => {
  return (
    <Link
      href={path}
      className={classNames({ "bg-base-200": path === usePathname() })}
      onClick={onClick}
    >
      {name}
    </Link>
  )
}
