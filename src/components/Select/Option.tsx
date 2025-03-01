import { useContext } from "react";
import { cn } from "@/utils/cn";
import { FaCheck } from "react-icons/fa";
import { SelectContext } from "./Select";

export interface OptionProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const Option: React.FC<OptionProps> = ({ value, className, children }) => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("Option must be used within a Select component.");
  }

  const { selected, onSelect, multiple } = context;
  const isSelected = multiple ? Array.isArray(selected) && selected.includes(value) : selected === value;

  return (
    <li
      className={cn(
        "px-4 py-2 flex justify-between items-center cursor-pointer rounded-md",
        isSelected ? "bg-blue-200 font-semibold" : "hover:bg-blue-100",
        className
      )}
      onClick={() => onSelect(value)}
    >
      {children}
      {isSelected && <FaCheck className="text-blue-600" />}
    </li>
  );
};

export default Option;
