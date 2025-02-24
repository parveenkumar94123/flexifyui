import required from './validators/required';
import string from './validators/string';
import number from './validators/number';
import boolean from "./validators/boolean";
import email from './validators/email';
import min from './validators/min';
import max from './validators/max';
import minNumber from './validators/minNumber';
import maxNumber from './validators/maxNumber';
import regex from "./validators/regex";
import enumValidator from "./validators/enum";
import date, {DateFormat} from "./validators/date";
import minDate from "./validators/minDate";
import maxDate from "./validators/maxDate";
import age from "./validators/age";
import fileTypes, {AllowedFileTypes} from "./validators/fileTypes";
import fileSize from "./validators/fileSize";
import minFile from "./validators/minFile";
import maxFile from "./validators/maxFile";
import password from "./validators/password";
import noSpaces from "./validators/noSpaces";
import object, {ObjectSchema} from "./validators/object";
import array, {ArrayValidationRules} from "./validators/array";
import validateAllowedFileFields from "./validators/validateAllowedFileFields";

type ValidatorFunction = (value: any, fieldName: string, message?: string) => string | null;

type Validator = {
    required: (message?: string) => string | null;
    string: (message?: string) => string | null;
    number: (message?: string) => string | null;
    boolean: (message?: string) => string | null;
    email: (message?: string) => string | null;
    min: (limit: number, message?: string) => string | null;
    max: (limit: number, message?: string) => string | null;
    minNumber: (limit: number, message?: string) => string | null;
    maxNumber: (limit: number, message?: string) => string | null;
    regex: (pattern: RegExp, message?: string) => string | null;
    enum: (allowedValues: any[], message?: string) => string | null;
    date: (formats: DateFormat, message?: string) => string | null;
    minDate: (min: string, message?: string) => string | null;
    maxDate: (max: string, message?: string) => string | null;
    age: (min: number, max: number, message?: string) => string | null;
    fileSize: (minSize?: number, minUnit?: 'B' | 'KB' | 'MB' | 'GB', maxSize?: number, maxUnit?: 'B' | 'KB' | 'MB' | 'GB', message?: string) => string | null;
    minFile: (min: number, message?: string) => string | null;
    maxFile: (max: number, message?: string) => string | null;
    fileTypes: (allowedTypes: AllowedFileTypes[], message?: string) => string | null;
    password: (rules: {
        minLength?: number;
        maxLength?: number;
        uppercase?: boolean;
        lowercase?: boolean;
        number?: boolean;
        special?: boolean;
        allowedSpecialChars?: string;
        checkWeak?: boolean;
        noSpaces?: boolean;
    }, message?: string) => string | null;
    noSpaces: (position?: "all" | "first" | "last" | "both" | "inside", message?: string) => string | null;
    object: (schema: ObjectSchema, message?: string) => string | null;
    array: (rules: ArrayValidationRules, message?: string) => string | null;
    files: (allowedFieldNames: string[], message?: string) => string | null;
};

function v(value: any, fieldName: string): Validator {

    const applyValidation = (fn: ValidatorFunction): string | null => {
        return fn(value, fieldName);
    };

    return {
        required: (message) => applyValidation(required(message)),
        string: (message) => applyValidation(string(message)),
        number: (message) => applyValidation(number(message)),
        boolean: (message) => applyValidation(boolean(message)),
        email: (message) => applyValidation(email(message)),
        min: (limit, message) => applyValidation(min(limit, message)),
        max: (limit, message) => applyValidation(max(limit, message)),
        minNumber: (limit, message) => applyValidation(minNumber(limit, message)),
        maxNumber: (limit, message) => applyValidation(maxNumber(limit, message)),
        regex: (pattern, message) => applyValidation(regex(pattern, message)),
        enum: (allowedValues, message) => applyValidation(enumValidator(allowedValues, message)),
        date: (formats, message) => applyValidation(date(formats, message)),
        minDate: (min, message) => applyValidation(minDate(min, message)),
        maxDate: (max, message) => applyValidation(maxDate(max, message)),
        age: (min, max, message) => applyValidation(age(min, max, message)),
        fileSize: (minSize, minUnit, maxSize, maxUnit, message) => applyValidation(fileSize(minSize, minUnit, maxSize, maxUnit, message)),
        minFile: (min, message) => applyValidation(minFile(min, message)),
        maxFile: (max, message) => applyValidation(maxFile(max, message)),
        fileTypes: (allowedTypes, message) => applyValidation(fileTypes(allowedTypes, message)),
        password: (rules, message) => applyValidation(password(rules, message)),
        noSpaces: (position, message) => applyValidation(noSpaces(position, message)),
        object: (schema, message) => applyValidation(object(schema, message)),
        array: (rules, message) => applyValidation(array(rules, message)),
        files: (allowedFieldNames, message) => applyValidation(validateAllowedFileFields(allowedFieldNames, message)),
    };
}

export default v;
