const regex = (pattern: RegExp, message?: string) => (value: any, fieldName: string): string | null => {
    if (typeof value !== 'string' || !pattern.test(value)) {
        return message || `${fieldName} is not in the correct format`;
    }
    return null;
};

export default regex;
