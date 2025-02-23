export type ObjectSchema = Record<string, (value: any, fieldName: string) => string | null>;

const object = (schema: ObjectSchema, message?: string) => (value: any, fieldName: string): string | null => {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return message || `${fieldName} must be a valid object`;
    }

    for (const key in schema) {
        const error = schema[key](value[key], `${fieldName}.${key}`);
        if (error) return error;
    }

    return null;
};

export default object;
