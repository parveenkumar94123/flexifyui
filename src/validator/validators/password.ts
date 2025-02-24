import weakPasswordList from '../../weak-passwords.json'; // 🚀 Import a large list of weak passwords

const loadWeakPasswords = (customWeakPasswords?: string[]) => {
    if (customWeakPasswords && Array.isArray(customWeakPasswords)) {
        return new Set(customWeakPasswords); // Use the provided list
    }

    // Default weak password list (imported from file)
    return new Set(weakPasswordList);
};

const password = (
    rules: {
        minLength?: number;
        maxLength?: number;
        uppercase?: boolean;
        lowercase?: boolean;
        number?: boolean;
        special?: boolean;
        allowedSpecialChars?: string;
        checkWeak?: boolean;
        noSpaces?: boolean;
        weakPasswords?: string[]; // User-provided weak password list
    },
    message?: string
) => (value: string, fieldName: string): string | null => {
    if (typeof value !== 'string') return `${fieldName} must be a string`;

    if (rules.noSpaces && /\s/.test(value)) {
        return message || `${fieldName} cannot contain spaces`;
    }

    const weakPasswords = loadWeakPasswords(rules.weakPasswords);

    if (rules.checkWeak && weakPasswords.has(value.toLowerCase())) {
        return message || `${fieldName} is too weak, choose a stronger password`;
    }

    if (rules.minLength && value.length < rules.minLength) {
        return message || `${fieldName} must be at least ${rules.minLength} characters long`;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
        return message || `${fieldName} must be at most ${rules.maxLength} characters long`;
    }
    if (rules.uppercase && !/[A-Z]/.test(value)) {
        return message || `${fieldName} must contain at least one uppercase letter`;
    }
    if (rules.lowercase && !/[a-z]/.test(value)) {
        return message || `${fieldName} must contain at least one lowercase letter`;
    }
    if (rules.number && !/[0-9]/.test(value)) {
        return message || `${fieldName} must contain at least one number`;
    }

    const specialChars = rules.allowedSpecialChars || "!@#$%^&*";
    const specialCharsRegex = new RegExp(`[^a-zA-Z0-9${specialChars}]`, "g");

    if (rules.special) {
        if (!new RegExp(`[${specialChars}]`).test(value)) {
            return message || `${fieldName} must contain at least one special character (${specialChars})`;
        }
        if (specialCharsRegex.test(value)) {
            return message || `${fieldName} contains invalid special characters. Allowed: ${specialChars}`;
        }
    }

    return null;
};

export default password;
