// GroupLabel.tsx
import React from "react";
interface GroupLabelProps {
    label: string;
}
const GroupLabel: React.FC<GroupLabelProps> = ({ label }) => {
    return <div className="px-2 py-1 font-semibold bg-gray-200">{label}</div>;
};
export default GroupLabel;
