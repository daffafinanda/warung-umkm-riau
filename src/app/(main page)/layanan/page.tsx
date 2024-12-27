// app/layanan/page.tsx
"use client";
import { useState, useEffect } from "react"; // Import useState dan useEffect
import LayananCash from "./LayananCash";
import LayananKredit from "./LayananKredit";
import LayananSewa from "./Layanan-Sewa";

const LayananPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("cash");

  useEffect(() => {
    // Menangani perubahan hash URL
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActiveTab(hash); // Mengatur tab aktif berdasarkan hash
    }
    
    // Menambahkan event listener untuk mengupdate activeTab ketika hash berubah
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash) {
        setActiveTab(newHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    // Cleanup ketika komponen di-unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab; // Menambahkan hash ke URL saat tab diklik
  };

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-5xl mx-auto px-4 py-6 rounded-lg">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === "cash"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary hover:border-b-2 hover:border-primary hover:border-opacity-40"
            }`}
            onClick={() => handleTabClick("cash")}
          >
            Cash
          </button>
          <button
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === "kredit"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary hover:border-b-2 hover:border-primary hover:border-opacity-40"
            }`}
            onClick={() => handleTabClick("kredit")}
          >
            Kredit
          </button>
          <button
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === "sewa"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary hover:border-b-2 hover:border-primary hover:border-opacity-40"
            }`}
            onClick={() => handleTabClick("sewa")}
          >
            Sewa
          </button>
        </div>
      </div>
      <div>
        {/* Konten berdasarkan tab aktif */}
        {activeTab === "cash" && <LayananCash />}
        {activeTab === "kredit" && <LayananKredit />}
        {activeTab === "sewa" && <LayananSewa />}
      </div>
    </div>
  );
};

export default LayananPage;
