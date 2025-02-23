const number = (message?: string) => (value: any, fieldName: string): string | null => {
    if (typeof value !== 'number' || isNaN(value)) {
        return message || `${fieldName} must be a number`;
    }
    return null;
};

export default number;
