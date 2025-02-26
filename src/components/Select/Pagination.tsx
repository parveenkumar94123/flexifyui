// Pagination.tsx
import React from "react";
interface PaginationProps {
    currentPage: number;
    totalRecords: number;
    limit: number;
    onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalRecords, limit, onPageChange }) => {
    const totalPages = Math.ceil(totalRecords / limit);
    return (
        <div className="p-2 flex justify-between items-center border-t">
            <button disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>&lt; Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>Next &gt;</button>
        </div>
    );
};
export default Pagination;
