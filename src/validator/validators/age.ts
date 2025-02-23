import { differenceInYears, parseISO, isValid } from 'date-fns';

const age = (min: number, max: number, message?: string) =>
    (value: any, fieldName: string): string | null => {
        const birthDate = parseISO(value);

        if (!isValid(birthDate)) {
            return `${fieldName} is not a valid date`;
        }

        const userAge = differenceInYears(new Date(), birthDate);

        if (userAge < min || userAge > max) {
            return message || `${fieldName} must be between ${min} and ${max} years old`;
        }

        return null;
    };

export default age;
