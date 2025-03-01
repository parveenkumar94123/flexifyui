import { cn } from "@/utils/cn";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface PaginationProps {
    currentPage: number;
    totalPage: number;
    onChange: (page: number) => void;
    totalRecords?: number;
    fetchedRecords?: number;
    className?: string;
  }
  
const Pagination: React.FC<PaginationProps> = ({ 
    currentPage, 
    totalPage, 
    onChange, 
    totalRecords, 
    fetchedRecords, 
    className 
}) => (
    <div className={cn("flex items-center justify-between px-4 py-2 border-t mt-2", className)}>
      {/* Total Records Display (only if both totalRecords and fetchedRecords exist) */}
      {totalRecords !== undefined && fetchedRecords !== undefined && (
        <span className="text-xs text-gray-500">
          {fetchedRecords} / {totalRecords} showing
        </span>
      )}
  
      {/* Previous Button */}
      <button 
        className="p-2 rounded-full disabled:opacity-50 hover:bg-gray-200 transition" 
        disabled={currentPage === 1} 
        onClick={() => onChange(currentPage - 1)}
      >
        <FaChevronLeft className="text-gray-600" />
      </button>
  
      {/* Page Info */}
      <span className="text-sm text-gray-700 font-medium">
        {currentPage} / {totalPage}
      </span>
  
      {/* Next Button */}
      <button 
        className="p-2 rounded-full disabled:opacity-50 hover:bg-gray-200 transition" 
        disabled={currentPage === totalPage} 
        onClick={() => onChange(currentPage + 1)}
      >
        <FaChevronRight className="text-gray-600" />
      </button>
    </div>
);

export default Pagination;