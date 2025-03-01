import { useState, useRef, useEffect, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { cn } from "@/utils/cn";
import { SelectContext } from "./Select";

export interface TagProps {
  placeholder?: string;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ placeholder = "Add a new tag", className }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Get context from Select
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Tag must be used within a Select component.");
  }

  const { selected, onSelect, multiple } = context;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleAdd = () => {
    if (inputValue.trim()) {
      onSelect(inputValue.trim()); // Add tag to selected values
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 p-2 border rounded-lg shadow-sm max-w-full",
        "bg-white border-gray-300 dark:bg-gray-900 dark:border-gray-700",
        className
      )}
    >
      {/* Render selected tags */}
      {multiple &&
        Array.isArray(selected) &&
        selected.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-3 py-1 text-sm rounded-full border cursor-pointer 
            bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200 
            dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800 
            max-w-full truncate"
          >
            <span className="truncate">{tag}</span>
            <FaTimes
              className="ml-1 text-blue-500 cursor-pointer hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={() => onSelect(tag)}
            />
          </span>
        ))}

      {/* Input field for new tags */}
      <input
        ref={inputRef}
        type="text"
        className={cn(
          "px-2 py-2 text-sm bg-transparent outline-none border rounded-md flex-1 min-w-20",
          "border-transparent focus:border-blue-500 dark:focus:border-blue-400",
          "dark:text-white dark:placeholder-gray-400"
        )}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Tag;
