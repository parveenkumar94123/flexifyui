const boolean = (message?: string) => (value: any, fieldName: string): string | null => {
    if (typeof value !== 'boolean') {
        return message || `${fieldName} must be a boolean`;
    }
    return null;
};

export default boolean;
