import { useState } from "react";
import { cn } from "@/utils/cn";

interface DragAndDropProps {
  onDrop: (item: any, fromStatus: string) => void;
  children: React.ReactNode;
  status: string;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onDrop, children, status }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const data = e.dataTransfer.getData("text/plain");
    if (data) {
      onDrop(JSON.parse(data), status);
    }
  };

  return (
    <div
      className={cn(
        "p-4 border rounded-lg shadow-sm transition-colors",
        "border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900",
        isDragging && "border-blue-500 bg-blue-100 dark:bg-blue-900"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default DragAndDrop;
