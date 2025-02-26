// Index.tsx
import React, { useState, useRef } from "react";
import { useSelect } from "./useSelect";
import Option from "./Option";
import GroupLabel from "./GroupLabel";
import Pagination from "./Pagination";
import { FiChevronDown } from "react-icons/fi";

export interface SelectProps {  // Export the SelectProps interface
    name: string;
    label?: string;
    placeholder?: string;
    multiple?: boolean;
    error?: boolean;
    errorMessage?: string;
    searchable?: boolean;
    onSearch?: (query: string) => void;
    value?: string | string[];
    options: { label: string; value: string; group?: string }[];
    noData?: string;
    noDataIcon?: React.ReactNode;
    required?: boolean;
    requiredMessage?: string;
    readOnly?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    pagination?: {
        currentPage: number;
        totalRecords: number;
        limit: number;
        onPageChange: (page: number) => void;
        onLimitChange?: (limit: number) => void;
    };
    onChange: (selected: string | string[]) => void;
}

const Select: React.FC<SelectProps> = ({
                                           name,
                                           label,
                                           placeholder,
                                           multiple = false,
                                           error,
                                           errorMessage,
                                           searchable,
                                           onSearch,
                                           value,
                                           options,
                                           noData = "No options available",
                                           noDataIcon,
                                           required,
                                           requiredMessage,
                                           readOnly,
                                           disabled,
                                           style,
                                           pagination,
                                           onChange,
                                       }) => {
    const { selectedValues, handleSelect, searchQuery, setSearchQuery } = useSelect({ value, multiple, onChange });
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        if (!disabled && !readOnly) setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative w-full" style={style}>
            {label && <label className="block mb-1 font-medium">{label}</label>}
            <div
                className={`border p-2 rounded-md flex justify-between items-center ${error ? "border-red-500" : "border-gray-300"} ${disabled ? "bg-gray-200" : "cursor-pointer"}`}
                onClick={toggleDropdown}
            >
                <span>{selectedValues.length ? selectedValues.join(", ") : placeholder || "Index..."}</span>
                <FiChevronDown />
            </div>
            {error && errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
            {isOpen && (
                <div className="absolute mt-1 bg-white border rounded-md shadow-lg w-full z-10" ref={dropdownRef}>
                    {searchable && (
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-2 border-b"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                onSearch && onSearch(e.target.value);
                            }}
                        />
                    )}
                    <div className="max-h-60 overflow-auto">
                        {options.length ? (
                            options.map((option) => (
                                <Option key={option.value} option={option} selectedValues={selectedValues} multiple={multiple} onSelect={handleSelect} />
                            ))
                        ) : (
                            <div className="p-2 text-gray-500 flex items-center justify-center">{noDataIcon}{noData}</div>
                        )}
                    </div>
                    {pagination && <Pagination {...pagination} />}
                </div>
            )}
        </div>
    );
};

export default Select;
