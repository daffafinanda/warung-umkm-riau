"use client";
import { useState } from "react";

const TransaksiPage = () => {
  const [activeTab, setActiveTab] = useState<"penyewaan" | "pembelian">("penyewaan");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b">
        <button
          className={`py-2 px-4 font-semibold ${
            activeTab === "penyewaan" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("penyewaan")}
        >
          Penyewaan
        </button>
        <button
          className={`py-2 px-4 font-semibold ${
            activeTab === "pembelian" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("pembelian")}
        >
          Pembelian
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "penyewaan" && (
          <div>
            <h2 className="text-xl font-bold">Halaman Penyewaan</h2>
            <p>Konten untuk penyewaan akan ditampilkan di sini.</p>
          </div>
        )}
        {activeTab === "pembelian" && (
          <div>
            <h2 className="text-xl font-bold">Halaman Pembelian</h2>
            <p>Konten untuk pembelian akan ditampilkan di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransaksiPage;
