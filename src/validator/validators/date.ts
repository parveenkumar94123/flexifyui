import { parse, format, isValid } from 'date-fns';

// Define a type listing all supported date formats
export type DateFormat =
    | "dd/MM/yyyy"
    | "yyyy/MM/dd"
    | "dd-MM-yyyy"
    | "yyyy-MM-dd"
    | "dd/MM/yyyy HH:mm:ss"
    | "yyyy/MM/dd HH:mm:ss"
    | "dd-MM-yyyy HH:mm:ss"
    | "yyyy-MM-dd HH:mm:ss"
    | "yyyy-MM-dd'T'HH:mm:ss'Z'"; // UTC format

const date = (formatString: DateFormat, message?: string) =>
    (value: any, fieldName: string): string | null => {
        if (typeof value !== "string") {
            return message || `${fieldName} must be a valid string`;
        }

        const parsedDate = parse(value, formatString, new Date());

        if (!isValid(parsedDate) || format(parsedDate, formatString) !== value) {
            return message || `${fieldName} is not in a valid format. Expected: ${formatString}`;
        }

        return null;
    };

export default date;
