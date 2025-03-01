import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export interface GroupProps {
    label: string;
    className?: string;
    children: ReactNode;
  }
  
const Group: React.FC<GroupProps> = ({ label, className, children }) => (
    <div className={cn("px-4 py-2", className)}>
      <span className="font-bold text-gray-700">{label}</span>
      <div>{children}</div>
    </div>
);

export default Group;