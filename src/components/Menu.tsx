import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Menu = ({ onClick }: { onClick?: () => void }) => {
  // todo: 型をつける
  const facultyCategories = [
    { nameEn: "post_office", nameJa: "郵便局" },
    { nameEn: "elemenatary_schoool", nameJa: "小学校" },
    { nameEn: "station", nameJa: "駅" },
    { nameEn: "abandoned_station", nameJa: "廃駅" },
    { nameEn: "research_institute", nameJa: "研究機関" },
    { nameEn: "hot_spring", nameJa: "温泉" },
    { nameEn: "new_town", nameJa: "ニュータウン" },
    { nameEn: "michinoeki", nameJa: "道の駅" },
  ];

  return (
    <aside>
      <ul className="menu w-40">
        <li><MenuElement path="/" name="秘境集落探索" onClick={onClick} /></li>
        <li>
          <details>
            <summary className="transition">秘境施設探索</summary>
            <ul>
              {facultyCategories.map((facultyCategory => {
                return (
                  <li key={facultyCategory.nameEn}>
                    <MenuElement path={`/${facultyCategory.nameEn}`} name={facultyCategory.nameJa} onClick={onClick} />
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
                  <li key={facultyCategory.nameEn}>
                    <MenuElement path={`/fortune/${facultyCategory.nameEn}`} name={facultyCategory.nameJa} onClick={onClick} />
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
