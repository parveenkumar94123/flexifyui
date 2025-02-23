const string = (message?: string) => (value: any, fieldName: string): string | null => {
    if (typeof value !== 'string') {
        return message || `${fieldName} must be a string`;
    }
    return null;
};

export default string;
