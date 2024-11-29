"use client";

import React, { useState } from "react";

// TabLayout Komponen
const TabLayout: React.FC<{ tabs: { label: string, content: React.ReactNode }[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-4 bg-foreground rounded-xl min-w-full"> {/* Pastikan lebar tab memenuhi container */}
      {/* Tab Header */}
      <div className="flex justify-center w-full rounded-xl bg-background">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 rounded-t-lg py-2 m-0 text-lg font-medium w-full transition-all duration-300 ${
              activeTab === index
                ? "bg-foreground text-primary border-x-2 border-t-2 border-primary " // Tab yang terpilih
                : "text-gray-600 hover:bg-gray-100 hover-rounded-none border-b-2 border-gray-400 shadow-inherit"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabLayout;
