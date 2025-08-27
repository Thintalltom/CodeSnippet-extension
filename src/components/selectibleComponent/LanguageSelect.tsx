import { type FC, useState } from "react";

interface LanguageSelectProps {
  selected: string;
  setSelected: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | string[];
  placeholder?: string;
  search?: boolean;
}

const LanguageSelect: FC<LanguageSelectProps> = ({
  selected,
  setSelected,
  options = [],
  placeholder = "-- Select a Language or Framework --",
  search = false,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // filter options if search is enabled
  const filteredOptions = search
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  return (
    <div className="relative w-full rounded-[12px]">
    
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full border p-2 rounded flex justify-between items-center bg-white"
      >
        <span>{selected || placeholder}</span>
        <span className="ml-2">▼</span>
      </button>

   
      {open && (
        <div className="absolute mt-1 w-full border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
          {search && (
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-b p-2 outline-none"
            />
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelected(item.value);
                  setOpen(false);
                  setQuery("");
                }}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  selected === item.value ? "bg-gray-200 font-medium" : ""
                }`}
              >
                {item.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
