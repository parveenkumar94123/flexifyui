export const isEmail = (value: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value);
};

export const isPhoneNumber = (value: string): boolean => {
    const regex = /^[2-9]{1}[0-9]{9}$/;
    return regex.test(value);
};

export const isRequired = (value: string): boolean => {
    return value.trim().length > 0;
};
