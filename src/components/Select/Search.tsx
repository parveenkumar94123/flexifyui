import { cn } from "@/utils/cn";

export interface SearchProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ value, onSearch, placeholder, className }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onSearch(e.target.value)}
    placeholder={placeholder}
    className={cn(
      "w-full px-4 py-2 border rounded-lg outline-none transition-colors",
      "border-gray-300 bg-white text-gray-900 focus:border-blue-500",
      "dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400",
      className
    )}
  />
);

export default Search;
