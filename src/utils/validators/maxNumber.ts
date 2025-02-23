const maxNumber = (limit: number, message?: string) => (value: any, fieldName: string): string | null => {
    if (typeof value !== "number" || value > limit) {
        return message || `${fieldName} must be at most ${limit}`;
    }
    return null;
};

export default maxNumber;
