const maxFile = (max: number, message?: string) =>
    (files: FileList | File[], fieldName: string): string | null => {
        if (files.length > max) {
            return message || `${fieldName} allows a maximum of ${max} file(s)`;
        }
        return null;
    };

export default maxFile;
