import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { MdContentCopy } from "react-icons/md";
import { useState } from "react";
import { IoPricetagOutline } from "react-icons/io5";
const ViewData = () => {
    const {prompt } = useSelector(
            (state: RootState) => state.prompt
        );
const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  return (
    <div>
       <div className="flex flex-col gap-[20px]">
      {prompt.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-[10px] p-[20px] w-fit border-[1.5px] rounded-[10px] max-w-[350px]"
        >
          <h1 className="font-bold text-lg">{item.title}</h1>

       
          <div className="relative">
            <pre className="bg-gray-100 border rounded-[8px] p-3 text-sm font-mono max-h-[200px] overflow-y-auto whitespace-pre-wrap">
              {item.code}
            </pre>
            <button
              onClick={() => handleCopy(item.code, item.id)}
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
            >
              <MdContentCopy className="text-gray-600" />
            </button>
            {copiedId === item.id && (
              <span className="absolute top-2 right-12 text-green-600 text-xs font-medium">
                Copied!
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex gap-[10px] flex-wrap">
            {item.tags.map((tag, index) => (
              <button
                key={index}
                className="bg-[#DBEAFE]  text-[#1E40AF] rounded-[5px] py-[6px] flex items-center gap-[10px] px-[8px] text-sm"
              >
                <span className="text-[#1E40AF]"><IoPricetagOutline /></span>
                {tag}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default ViewData