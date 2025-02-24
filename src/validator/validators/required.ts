const required = (message?: string) => (value: any, fieldName: string): string | null => {
    if (value === undefined || value === null || value === '') {
        return message || `${fieldName} is required`;
    }
    return null;
};

export default required;
