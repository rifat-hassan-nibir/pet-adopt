"use client";

interface TabNavigationProps {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex gap-0 -mb-px" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`hover:cursor-pointer relative px-4 sm:px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
              }`}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
