import { facultyCategories } from "@/lib/facultyCategories"
import clsx from "clsx";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode, SyntheticEvent, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export const Menu = ({ onClick }: { onClick?: () => void }) => {
  return (
    <aside>
      <ul className="w-56 px-2 flex flex-col gap-2">
        <MenuListElement path="/" onClick={onClick}>秘境集落探索</MenuListElement>
        <li>
          <Accordion title="秘境施設探索">
            <ul className="flex flex-col gap-2 w-full">
              {facultyCategories.map((facultyCategory => {
                return (
                  <MenuListElement
                    key={facultyCategory.pathName}
                    path={`/${facultyCategory.pathName}`}
                    onClick={onClick}
                  >
                    {facultyCategory.name}
                  </MenuListElement>
                )
              }))}
            </ul>
          </Accordion>
        </li>
        <MenuListElement path="/fortune" onClick={onClick}>
          秘境集落占い
        </MenuListElement>
        <li>
          <Accordion title="秘境施設占い">
            <ul className="flex flex-col gap-2 w-full">
              {facultyCategories.map((facultyCategory => {
                return (
                  <MenuListElement
                    key={facultyCategory.pathName}
                    path={`/fortune/${facultyCategory.pathName}`}
                    onClick={onClick}>
                    {facultyCategory.name}
                  </MenuListElement>
                )
              }))}
            </ul>
          </Accordion>
        </li>
        <MenuListElement path="/about" onClick={onClick}>
          このツールについて
        </MenuListElement>
      </ul>
    </aside>
  )
}

const MenuListElement = ({ path, onClick, children }: { path: string; onClick?: () => void; children: ReactNode; }) => {
  return (
    <li>
      <Link
        href={path}
        className={clsx(
          path === usePathname() && "bg-lightened-primary-color",
          'flex items-center h-10 p-4'
        )}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  )
}

const Summary = ({
  children,
  isOpen
}: {
  children: ReactNode;
  isOpen: boolean
}) => {
  return (
    <summary className="list-none h-10 flex items-center p-4 cursor-pointer justify-between">
      <span>{children}</span>
      <span>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </span>
    </summary>
  )
}

const Accordion = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnToggle = (e: SyntheticEvent<HTMLDetailsElement, Event>) => {
    if (e.target instanceof HTMLDetailsElement) {
      setIsOpen(e.target.open)
    }
  }

  return (
    <details onToggle={handleOnToggle}>
      <Summary isOpen={isOpen}>{title}</Summary>
      <div className="flex my-1">
        <div className="ml-4 w-2 border-l-2"></div>
        {children}
      </div>
    </details>
  );
}
