interface InquiryListProps {
    title: string;
    inquiries: { id: number; name: string; message: string }[];
    color: string;
    status: string;
    onDragStart: (inquiry: any, fromStatus: string) => void;
  }
  
  const InquiryList: React.FC<InquiryListProps> = ({ title, inquiries, color, status, onDragStart }) => {
    return (
      <div>
        <h3 className={`font-semibold text-lg mb-2 ${color}`}>{title}</h3>
        <ul className="space-y-2">
          {inquiries.length > 0 ? (
            inquiries.map((inquiry) => (
              <li
                key={inquiry.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", JSON.stringify(inquiry));
                  onDragStart(inquiry, status);
                }}
                className="p-3 border rounded-md bg-gray-100 dark:bg-gray-800 cursor-pointer"
              >
                <p className="font-medium">{inquiry.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{inquiry.message}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No inquiries</p>
          )}
        </ul>
      </div>
    );
  };
  
  export default InquiryList;
  