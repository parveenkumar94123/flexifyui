const validateAllowedFileFields = (allowedFieldNames: string[], message?: string) => (files: Record<string, any>, fieldName: string): string | null => {
    const fileKeys = Object.keys(files || {});

    for (const key of fileKeys) {
        if (!allowedFieldNames.includes(key)) {
            return message || `Invalid file field: "${key}". Allowed fields: ${allowedFieldNames.join(", ")}`;
        }
    }

    return null; // All file fields are allowed
};

export default validateAllowedFileFields;
