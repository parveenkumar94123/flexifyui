const minNumber = (limit: number, message?: string) => (value: any, fieldName: string): string | null => {
    if (typeof value !== "number" || value < limit) {
        return message || `${fieldName} must be at least ${limit}`;
    }
    return null;
};

export default minNumber;
