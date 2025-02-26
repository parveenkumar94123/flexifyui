# **FlexifyUI**

A flexible UI and utility library built with **TypeScript, Tailwind CSS, and React**, supporting both frontend and backend usage.

## **📦 Installation**

Install **FlexifyUI** via npm:

```bash
   npm install flexifyui
```

## **🔗 Setup Tailwind for UI Components**

To ensure Tailwind styles from **FlexifyUI** are applied correctly, add the following to your **`tailwind.config.js`**:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flexifyui/dist/**/*.{js,ts,jsx,tsx}" // ✅ Required for FlexifyUI
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

## **🚀 Usage**

### **Importing UI Components**

To use UI components from **FlexifyUI**, simply import them:

```tsx
import { Button, Select } from "flexifyui/ui";

export default function Example() {
    return (
        <div>
            <Button label="Click Me" onClick={() => alert("Button Clicked!")} />
            <Select options={[{ label: "Option 1", value: "1" }]} />
        </div>
    );
}
```

### **Using the Validator**

You can also use **FlexifyUI's validation library** for form validation:

```tsx
import v from "flexifyui/validator";

const email = "test@example.com";
const result = v(email, "Email").required().email().check();

console.log(result); // Returns validation result
```

## **🔧 Validator Functions**

The following validation functions are available:

```tsx
import v from "flexifyui/validator";
```

### **Available Validators:**

| Function       | Description |
|---------------|-------------|
| `.required()` | Ensures value is not empty |
| `.string()` | Validates as a string |
| `.number()` | Validates as a number |
| `.boolean()` | Validates as a boolean |
| `.email()` | Ensures valid email format |
| `.min(limit)` | Minimum string length or number value |
| `.max(limit)` | Maximum string length or number value |
| `.minNumber(limit)` | Ensures number is greater than or equal to the limit |
| `.maxNumber(limit)` | Ensures number is less than or equal to the limit |
| `.regex(pattern)` | Validates against a regular expression |
| `.enum(allowedValues)` | Ensures value is within allowed values |
| `.date(format)` | Validates date format |
| `.minDate(min)` | Ensures date is not before the minimum |
| `.maxDate(max)` | Ensures date is not after the maximum |
| `.age(min, max)` | Checks if age is within a range |
| `.fileSize(minSize, minUnit, maxSize, maxUnit)` | Validates file size |
| `.minFile(min)` | Ensures minimum number of files |
| `.maxFile(max)` | Ensures maximum number of files |
| `.fileTypes(allowedTypes)` | Restricts allowed file types |
| `.password(rules)` | Custom password rules validation |
| `.noSpaces(position)` | Restricts spaces based on position (all, first, last, both, inside) |
| `.object(schema)` | Validates an object structure |
| `.array(rules)` | Validates array elements |
| `.files(allowedFieldNames)` | Validates uploaded file fields |
| `.check()` | Returns validation error message or null |

### **Example Usage:**

```tsx
const validation = v("hello@example.com", "Email")
  .required()
  .email()
  .check();

console.log(validation); // null if valid, otherwise error message
```

## **🌟 Features**
✅ **Reusable UI components** (Button, Select, etc.)  
✅ **Utility functions** for common operations  
✅ **Validation library** for frontend & backend  
✅ **Built with TypeScript & Tailwind CSS**

## **📜 License**

This project is licensed under the **MIT License**. Feel free to use and modify it as needed.

## **🤝 Contributing**

Contributions are welcome! If you'd like to improve **FlexifyUI**, please fork the repository and submit a pull request.

## **📬 Support**

If you have any questions or need support, feel free to open an issue on GitHub or reach out to the maintainer.

## **👨‍💻 Author**

Developed and maintained by the **FlexifyUI Team**. 🚀
