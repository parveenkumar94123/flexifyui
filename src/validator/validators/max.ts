const max = (limit: number, message?: string) => (value: any, fieldName: string): string | null => {
    if (typeof value !== "string" || value.length > limit) {
        return message || `${fieldName} must be at most ${limit} characters long`;
    }
    return null;
};

export default max;
