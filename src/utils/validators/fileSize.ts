const unitMultiplier = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024
};

const fileSize = (minSize?: number, minUnit?: keyof typeof unitMultiplier,
                  maxSize?: number, maxUnit?: keyof typeof unitMultiplier,
                  message?: string) =>
    (file: File, fieldName: string): string | null => {
        const fileSizeInBytes = file.size;

        if (minSize && minUnit) {
            const minBytes = minSize * unitMultiplier[minUnit];
            if (fileSizeInBytes < minBytes) {
                return message || `${fieldName} must be at least ${minSize} ${minUnit}`;
            }
        }

        if (maxSize && maxUnit) {
            const maxBytes = maxSize * unitMultiplier[maxUnit];
            if (fileSizeInBytes > maxBytes) {
                return message || `${fieldName} must be at most ${maxSize} ${maxUnit}`;
            }
        }

        return null;
    };

export default fileSize;
