import { parseISO, isAfter, isValid } from 'date-fns';

const maxDate = (max: string, message?: string) =>
    (value: any, fieldName: string): string | null => {
        const dateValue = parseISO(value);
        const maxValue = parseISO(max);

        if (!isValid(dateValue) || !isValid(maxValue)) {
            return `${fieldName} is not a valid date`;
        }

        if (isAfter(dateValue, maxValue)) {
            return message || `${fieldName} must be on or before ${max}`;
        }

        return null;
    };

export default maxDate;
