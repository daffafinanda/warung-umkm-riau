"use client";

import React, { useState } from "react";

// TabLayout Komponen
const TabLayout: React.FC<{ tabs: { label: string, content: React.ReactNode }[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden"> {/* Clean background with shadow */}
      {/* Tab Header */}
      <div className="flex border-b-2 border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 text-lg font-semibold w-full transition-all duration-200 ease-in-out transform hover:scale-96 ${
              activeTab === index
                ? "text-primary border-b-4 border-primary" // Active Tab Style
                : "text-gray-700 hover:text-primary hover:text-opacity-50 hover:border-b-4 hover:border-primary hover:border-opacity-40" // Inactive Tab Style
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 bg-gray-50 rounded-b-lg">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabLayout;
