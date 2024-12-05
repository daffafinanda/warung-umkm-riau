"use client";
import React, { useState } from "react";

const TabLayout: React.FC<{ tabs: { label: string, content: React.ReactNode }[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="space-y-4 min-w-full"> {/* Pastikan lebar tab memenuhi container */}
      {/* Tab Header */}
      <div className="flex justify-centers bg-foreground shadow-lg bg-grey-100 gap-2 w-full px-2 py-2 rounded-lg ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 rounded-md py-2 text-lg font-medium w-full transition-all duration-300 ${
              activeTab === index
                ? "bg-primary text-white rounded-md"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 min-w-full">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabLayout;
