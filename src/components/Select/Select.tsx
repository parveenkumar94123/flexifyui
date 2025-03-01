import { useState, ReactNode, Children, cloneElement, isValidElement, useEffect, useRef, createContext, ReactElement } from "react";
import { cn } from "@/utils/cn";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp, FaTimes } from "react-icons/fa";
import Option, { OptionProps } from "./Option";
import Group, { GroupProps } from "./Group";

// Context for managing selected state
interface SelectContextType {
    selected: string | string[] | undefined;
    onSelect: (value: string) => void;
    multiple: boolean;
  }
  
const SelectContext = createContext<SelectContextType | undefined>(undefined);
  
interface SelectProps {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean,
  autoClose?: boolean;
  expandable?: boolean;
  className?: string;
  children: ReactNode;
}

const Select: React.FC<SelectProps> = ({ value, onChange, placeholder, multiple = false, autoClose = true, expandable = false, className, children }) => {
  const [selected, setSelected] = useState<string | string[] | undefined>(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    if (!autoClose) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setTimeout(() => setIsOpen(false), 0); // Delay to ensure state updates correctly
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [autoClose]);

  const handleSelect = (val: string) => {
    if (multiple) {
      let selectedValues = Array.isArray(value) ? [...value] : [];
      if (selectedValues.includes(val)) {
        selectedValues = selectedValues.filter((v) => v !== val); // Deselect
      } else {
        selectedValues.push(val); // Select
      }
      setSelected(selectedValues);
      onChange?.(selectedValues);
    } else {
      setSelected(val);
      onChange?.(val);
      setIsOpen(false);
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from opening when clicking clear button
    setSelected(multiple ? [] : undefined);
    onChange?.(multiple ? [] : "");
  };

  const processChildren = (children: ReactNode): ReactNode => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child;

      const childProps = child.props as Record<string, any>;

      if (child.type === Option) {
        return cloneElement(child as React.ReactElement<OptionProps>, {});
      }

      if (child.type === Group) {
        return cloneElement(child as React.ReactElement<GroupProps>, {
          children: processChildren(childProps.children),
        });
      }

      return child;
    });
  };

  // Extract label for selected value
  const getSelectedLabel = (): string | ReactNode => {
    if (!selected) return placeholder || "Select an option";
  
    // Helper function to find selected labels recursively
    const findSelectedLabels = (nodes: ReactNode): ReactNode[] => {
      return Children.toArray(nodes).flatMap((child) => {
        if (!isValidElement(child)) return [];
  
        if (child.type === Option) {
          const option = child as ReactElement<OptionProps>;
          return selected.includes(option.props.value) ? [option.props.children] : [];
        }
  
        if (child.type === Group) {
          const group = child as ReactElement<GroupProps>;
          return findSelectedLabels(group.props.children); // Recursively check inside the Group
        }
  
        return [];
      });
    };
  
    if (multiple && Array.isArray(selected)) {
      const selectedLabels = findSelectedLabels(children);
      return selectedLabels.length > 0 ? selectedLabels.join(", ") : selected ? selected.join(", ") : placeholder;
    }
  
    const selectedLabel = findSelectedLabels(children).find(Boolean);
    return selectedLabel ?? placeholder;
  };  

  return (
    <SelectContext.Provider value={{ selected, onSelect: handleSelect, multiple }}>
      <div ref={selectRef} className="relative w-64">
      <div
          className={cn(
          "bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer flex justify-between items-center",
          "hover:border-blue-500",
          isOpen && "border-blue-500",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
          <span className={cn(!expandable && "truncate")}>{getSelectedLabel()}</span>
          <div className="flex items-center gap-2">
            {selected && (Array.isArray(selected) ? selected.length > 0 : selected) && (
                <FaTimes className="text-gray-500 cursor-pointer hover:text-red-500" onClick={clearSelection} />
            )}
            {isOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
          </div>
          </div>
          {isOpen && (
            <ul className="absolute w-full mt-1 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 border border-gray-300 rounded-lg shadow-md z-10">
                {processChildren(children)}
            </ul>
        )}
      </div>
    </SelectContext.Provider>
  );
};

export { SelectContext };
export default Select;
