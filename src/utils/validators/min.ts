const min = (limit: number, message?: string) => (value: any, fieldName: string): string | null => {
    if (typeof value !== "string" || value.length < limit) {
        return message || `${fieldName} must be at least ${limit} characters long`;
    }
    return null;
};

export default min;
