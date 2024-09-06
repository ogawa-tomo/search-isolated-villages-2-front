import { ReactNode } from "react"

type Props = {
  children: ReactNode;
  isModified: boolean;
  onClick?: () => void;
}

export const DetailedConditionButton = ({ children, isModified, onClick }: Props) => {
  return (
    <button
      className="relative h-10 w-64 rounded-md text-xl border text-primary-color bg-white border-primary-color hover:bg-lightened-primary-color"
      onClick={onClick}
    >
      {children}
      {isModified && <div className="absolute top-2 right-3 h-2 w-2 bg-red-600 rounded-full" />}
    </button>
  )
}
