const noSpaces = (
    position: "all" | "first" | "last" | "both" | "inside" = "all",
    message?: string
) => (value: string, fieldName: string): string | null => {
    if (typeof value !== "string") return `${fieldName} must be a string`;

    switch (position) {
        case "all":
            if (/\s/.test(value)) return message || `${fieldName} cannot contain spaces`;
            break;
        case "first":
            if (value.startsWith(" ")) return message || `${fieldName} cannot start with a space`;
            break;
        case "last":
            if (value.endsWith(" ")) return message || `${fieldName} cannot end with a space`;
            break;
        case "both":
            if (value.startsWith(" ") || value.endsWith(" ")) {
                return message || `${fieldName} cannot start or end with a space`;
            }
            break;
        case "inside":
            if (/\S\s+\S/.test(value)) return message || `${fieldName} cannot contain spaces inside`;
            break;
    }

    return null;
};

export default noSpaces;
