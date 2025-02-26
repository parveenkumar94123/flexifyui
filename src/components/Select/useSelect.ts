import { useState } from "react";

export const useSelect = ({
                              value = "", // Provide a default empty string
                              multiple,
                              onChange,
                          }: { value?: string | string[]; multiple: boolean; onChange: (selected: string | string[]) => void }) => {

    const [selectedValues, setSelectedValues] = useState<string[]>(
        Array.isArray(value) ? value : value ? [value] : []
    );

    const [searchQuery, setSearchQuery] = useState("");

    const handleSelect = (val: string) => {
        const newValues = multiple ? [...selectedValues, val] : [val];
        setSelectedValues(newValues);
        onChange(multiple ? newValues : newValues[0]);
    };

    return { selectedValues, handleSelect, searchQuery, setSearchQuery };
};
