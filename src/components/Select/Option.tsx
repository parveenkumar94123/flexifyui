// Option.tsx
import React from "react";
interface OptionProps {
    option: { label: string; value: string };
    selectedValues: string[];
    multiple: boolean;
    onSelect: (value: string) => void;
}
const Option: React.FC<OptionProps> = ({ option, selectedValues, multiple, onSelect }) => {
    return (
        <div className={`p-2 cursor-pointer ${selectedValues.includes(option.value) ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`} onClick={() => onSelect(option.value)}>
            {option.label}
        </div>
    );
};
export default Option;
