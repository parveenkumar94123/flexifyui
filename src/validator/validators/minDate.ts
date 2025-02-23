import { parseISO, isBefore, isValid } from 'date-fns';

const minDate = (min: string, message?: string) =>
    (value: any, fieldName: string): string | null => {
        const dateValue = parseISO(value);
        const minValue = parseISO(min);

        if (!isValid(dateValue) || !isValid(minValue)) {
            return `${fieldName} is not a valid date`;
        }

        if (isBefore(dateValue, minValue)) {
            return message || `${fieldName} must be on or after ${min}`;
        }

        return null;
    };

export default minDate;
