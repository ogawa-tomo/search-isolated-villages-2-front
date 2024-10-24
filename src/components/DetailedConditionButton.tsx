import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isModified: boolean;
  onClick?: () => void;
};

export const DetailedConditionButton = ({
  children,
  isModified,
  onClick,
}: Props) => {
  return (
    <button
      className="relative h-10 w-64 rounded-md border border-primary-color bg-white text-xl text-primary-color hover:bg-lightened-primary-color"
      onClick={onClick}
    >
      {children}
      {isModified && (
        <div className="absolute right-3 top-2 size-2 rounded-full bg-red-600" />
      )}
    </button>
  );
};
