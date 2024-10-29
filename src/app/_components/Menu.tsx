import { facultyCategories } from "@/lib/facultyCategories";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, SyntheticEvent, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export const Menu = ({ onClick }: { onClick?: () => void }) => {
  return (
    <aside>
      <ul className="flex w-56 flex-col gap-2 px-2">
        <MenuListElement path="/" onClick={onClick}>
          秘境集落探索
        </MenuListElement>
        <li>
          <Accordion title="秘境施設探索">
            <ul className="flex w-full flex-col gap-2">
              {facultyCategories.map((facultyCategory) => {
                return (
                  <MenuListElement
                    key={facultyCategory.pathName}
                    path={`/${facultyCategory.pathName}`}
                    onClick={onClick}
                  >
                    {facultyCategory.name}
                  </MenuListElement>
                );
              })}
            </ul>
          </Accordion>
        </li>
        <MenuListElement path="/fortune" onClick={onClick}>
          秘境集落占い
        </MenuListElement>
        <li>
          <Accordion title="秘境施設占い">
            <ul className="flex w-full flex-col gap-2">
              {facultyCategories.map((facultyCategory) => {
                return (
                  <MenuListElement
                    key={facultyCategory.pathName}
                    path={`/fortune/${facultyCategory.pathName}`}
                    onClick={onClick}
                  >
                    {facultyCategory.name}
                  </MenuListElement>
                );
              })}
            </ul>
          </Accordion>
        </li>
        <MenuListElement path="/about" onClick={onClick}>
          このツールについて
        </MenuListElement>
      </ul>
    </aside>
  );
};

const MenuListElement = ({
  path,
  onClick,
  children,
}: {
  path: string;
  onClick?: () => void;
  children: ReactNode;
}) => {
  return (
    <li>
      <Link
        href={path}
        className={clsx(
          path === usePathname() && "bg-lightened-primary-color",
          "flex h-10 items-center p-4",
        )}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
};

const Summary = ({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) => {
  return (
    <summary className="flex h-10 cursor-pointer list-none items-center justify-between p-4">
      <span>{children}</span>
      <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
    </summary>
  );
};

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
      setIsOpen(e.target.open);
    }
  };

  return (
    <details onToggle={handleOnToggle}>
      <Summary isOpen={isOpen}>{title}</Summary>
      <div className="my-1 flex">
        <div className="ml-4 w-2 border-l-2"></div>
        {children}
      </div>
    </details>
  );
};
