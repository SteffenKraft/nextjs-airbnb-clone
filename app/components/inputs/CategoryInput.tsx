import React from "react"
import { IconType } from "react-icons"

type CategoryInputProps = {
  icon: IconType
  label: string
  selected: boolean
  onClick: (value: string) => void
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-lg
        border-2
        p-4
        flex
        flex-col
        gap-4
        hoer:border-black
        cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  )
}

export default CategoryInput
