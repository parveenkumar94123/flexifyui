const email = (message?: string) => (value: any, fieldName: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value !== 'string' || !emailRegex.test(value)) {
        return message || `${fieldName} must be a valid email`;
    }
    return null;
};

export default email;
