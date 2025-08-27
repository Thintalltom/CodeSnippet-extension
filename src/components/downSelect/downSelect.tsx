import { useState } from "react";
import TagFilter from "../Filter/TagFilter";
import ViewData from "../ViewData/ViewData";

const DownSelect = () => {
  const [tab, setTab] = useState<number>(1);

  const tabs = [
    { id: 1, label: "Snippets" },
    { id: 2, label: "Sync" },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative pb-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
              {/* underline */}
              {tab === t.id && (
                <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tab === 1 && (
         <div className="flex flex-col gap-[20px]">
            <TagFilter />
            <ViewData />
            </div>
        )}
        {tab === 2 && (
          <p className="text-gray-700">
            🔄 This is your <strong>Sync</strong> settings.
          </p>
        )}
      </div>
    </div>
  );
};

export default DownSelect;
