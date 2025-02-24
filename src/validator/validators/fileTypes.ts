export type AllowedFileTypes =
    | 'image/jpeg'
    | 'image/jpg'
    | 'image/png'
    | 'image/gif'
    | 'application/pdf'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    | 'application/vnd.ms-excel'
    | 'text/csv'
    | 'application/json'
    | 'application/zip'
    | 'application/x-zip-compressed'
    | 'video/mp4'
    | 'video/x-msvideo'
    | 'video/quicktime';

const fileTypes = (allowedTypes: AllowedFileTypes[], message?: string) =>
    (file: File, fieldName: string): string | null => {
        if (!allowedTypes.includes(file.type as AllowedFileTypes)) {
            return message || `${fieldName} must be one of: ${allowedTypes.join(', ')}`;
        }
        return null;
    };

export default fileTypes;
