"use client";

import React, { useState } from "react";

// TabLayout Komponen
const TabLayout: React.FC<{ tabs: { label: string, content: React.ReactNode }[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-background b rounded-lg overflow-hidden "> {/* Clean background with shadow */}
      {/* Tab Header */}
      <div className="flex border-b-2 mb-6 sm:mb-4  border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`sm:px-6 sm:py-3 px-4 py-2 text-base  font-semibold transition-all duration-200 ease-in-out transform hover:scale-96 ${
              activeTab === index
                ? "text-primary border-b-4  rounded-t-lg border-primary" // Active Tab Style
                : "text-gray-700 rounded-t-lg  hover:text-primary hover:text-opacity-50 hover:border-b-4 hover:border-primary hover:border-opacity-40" // Inactive Tab Style
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabLayout;
