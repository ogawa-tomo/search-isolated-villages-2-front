import { ReactNode } from "react"

type Props = {
  children: ReactNode;
  onClick?: () => void;
}

export const DetailedConditionButton = ({ children, onClick }: Props) => {
  return (
    <button
      className="h-10 w-64 rounded-md text-xl border text-primary-color bg-white border-primary-color hover:bg-lightened-primary-color"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
