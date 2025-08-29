import { useState } from "react";
import { GoPersonFill } from "react-icons/go";

type Props = {
  email: string | undefined;
  onLogout: () => void;
};

export default function UserDropdown({ email, onLogout }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
      >
        <GoPersonFill className="text-xl" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-fit bg-white shadow-lg rounded-lg p-3 z-50">
          <p className="text-sm text-gray-700 mb-2">{email}</p>
          <button
            onClick={onLogout}
            className="w-full text-left text-red-500 px-3 py-2 hover:bg-gray-100 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
