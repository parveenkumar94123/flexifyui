const minFile = (min: number, message?: string) =>
    (files: FileList | File[], fieldName: string): string | null => {
        if (files.length < min) {
            return message || `${fieldName} requires at least ${min} file(s)`;
        }
        return null;
    };

export default minFile;
