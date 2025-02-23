const enumValidator = (allowedValues: any[], message?: string) => (value: any, fieldName: string): string | null => {
    if (!allowedValues.includes(value)) {
        return message || `${fieldName} must be one of: ${allowedValues.join(', ')}`;
    }
    return null;
};

export default enumValidator;
