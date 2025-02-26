import object, { ObjectSchema } from "./object";

export type ArrayValidationRules = {
    minLength?: number;
    maxLength?: number;
    eachElement?: (value: any, index: number) => string | null;
    eachObject?: ObjectSchema;
};

const array = (rules: ArrayValidationRules, message?: string) =>
    (value: any, fieldName: string): string | null => {
        if (!Array.isArray(value)) {
            return message || `${fieldName} must be an array`;
        }

        if (rules.minLength !== undefined && value.length < rules.minLength) {
            return message || `${fieldName} must have at least ${rules.minLength} items`;
        }

        if (rules.maxLength !== undefined && value.length > rules.maxLength) {
            return message || `${fieldName} must have at most ${rules.maxLength} items`;
        }

        if (rules.eachElement) {
            for (let i = 0; i < value.length; i++) {
                const error = rules.eachElement(value[i], i);
                if (error) return `${fieldName}[${i}]: ${error}`;
            }
        }

        if (rules.eachObject) {
            for (let i = 0; i < value.length; i++) {
                const error = object(rules.eachObject)(value[i], `${fieldName}[${i}]`);
                if (error) return error;
            }
        }

        return null;
    };

export default array;
