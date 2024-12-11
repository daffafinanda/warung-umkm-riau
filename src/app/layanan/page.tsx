'use client';

import { useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'Cash' | 'Kredit' | 'Sewa'>('Cash');

  const tabs = ['Cash', 'Kredit', 'Sewa'];

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <div className="w-full max-w-5xl mx-auto px-4 py-6  rounded-lg">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-primary hover:border-b-2 hover:border-primary hover:border-opacity-40'
              }`}
              onClick={() => setActiveTab(tab as 'Cash' | 'Kredit' | 'Sewa')}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
        {/* Content */}
      <div className='bg-foreground'>  
        <div className="my-6 px-6 max-w-5xl mx-auto text-black">
          {activeTab === 'Cash' && <div>Content for Cash</div>}
          {activeTab === 'Kredit' && <div>Content for Kredit</div>}
          {activeTab === 'Sewa' && <div>Content for Sewa</div>}
        </div>
      </div>
    </div>
  );
}
