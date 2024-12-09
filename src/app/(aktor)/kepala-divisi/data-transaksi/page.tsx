"use client";
import React, { useState } from "react";
import TambahPembayaranSewa from "@/components/TambahPembayaranSewaModal";
import TabLayout from "@/components/TabLayout";
import TabLayout2 from "@/components/TabLayout2";
import dynamic from "next/dynamic";
import { FaPlus } from "react-icons/fa";
import { BsJournalPlus } from "react-icons/bs";

// Lazy Load Konten
const RiwayatPenyewaan = dynamic(() => import("./transaksi-sewa"));
const TransaksiCash = dynamic(() => import("./transaksi-cash"));
const TransaksiKredit = dynamic(() => import("./transaksi-kredit"));
// const PembayaranKredit = dynamic(() => import("./pembayaran-kredit")); // Pastikan ada komponen PembayaranKredit

const DataTransaksi: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOptionModal, setShowOptionModal] = useState(false); // Menambah state untuk menampilkan pilihan opsi
  const [selectedOption, setSelectedOption] = useState<"Cash" | "Kredit" | "Pembayaran Kredit" | null>(null); // Untuk memilih opsi yang dipilih user

  const handleSave = (formData: {
    idSewa: string;
    tanggal: string;
    buktiPembayaran: File | null;
  }) => {
    console.log("Form data submitted:", formData);
    // Implementasikan logika penyimpanan ke server di sini
  };

  const tabs = [
    {
      label: "Penyewaan",
      content: (
        <div>
          <div className="flex justify-between items-center my-4 bg-foreground rounded-lg shadow-md p-4">
            <h1 className="text-primary text-2xl font-bold">Riwayat Penyewaan</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary flex justify-center items-center text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
            >
              <span className="hidden sm:inline-flex mr-2 text-lg">
                <FaPlus />
              </span>
              <span className="hidden sm:inline">Pembayaran Sewa</span>

              <BsJournalPlus className="sm:hidden text-lg" />
            </button>
          </div>
          <RiwayatPenyewaan />
        </div>
      ),
    },
    {
      label: "Penjualan",
      content: (
        <div>
          <div className="flex justify-between items-center my-4 bg-foreground rounded-lg shadow-md p-4">
            <h1 className="text-primary text-2xl font-bold">Riwayat Penjualan</h1>
            <button
              onClick={() => setShowOptionModal(true)} // Menampilkan pop-up pilihan opsi
              className="bg-primary flex justify-center items-center text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
            >
              <span className="hidden sm:inline-flex mr-2 text-lg">
                <FaPlus />
              </span>
              <span className="hidden sm:inline">Pembayaran Barang</span>

              <BsJournalPlus className="sm:hidden text-lg" />
            </button>
          </div>
          <TabLayout2
            tabs={[
              { label: "Cash", content: <TransaksiCash /> },
              { label: "Kredit", content: <TransaksiKredit /> },
            ]}
          />
        </div>
      ),
    },
  ];

  const handleOptionSelect = (option: "Cash" | "Kredit" | "Pembayaran Kredit") => {
    setSelectedOption(option);
    setShowOptionModal(false); // Menutup pop-up pilihan opsi setelah memilih
  };

  return (
    <div className="p-6 rounded-xl mx-auto max-w-sm sm:max-w-full">
      <TabLayout tabs={tabs} />
      
      {/* Pop-up untuk memilih opsi Cash, Kredit, atau Pembayaran Kredit */}
{showOptionModal && (
  <div
    className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
    onClick={(e) => {
      // Menutup modal jika klik di luar kontainer modal
      if (e.target === e.currentTarget) {
        setShowOptionModal(false);
      }
    }}
  >
    <div className="bg-white rounded-lg p-6 text-black w-1/3">
      <h2 className="text-xl font-bold mb-4">Pilih Opsi Pembayaran</h2>
      <button
        onClick={() => handleOptionSelect("Cash")}
        className="block w-full text-center py-2 mb-2 bg-primary text-white rounded-lg hover:bg-opacity-80"
      >
        Cash
      </button>
      <button
        onClick={() => handleOptionSelect("Kredit")}
        className="block w-full text-center py-2 mb-2 bg-primary text-white rounded-lg hover:bg-opacity-80"
      >
        Kredit
      </button>
      <button
        onClick={() => handleOptionSelect("Pembayaran Kredit")}
        className="block w-full text-center py-2 mb-2 bg-primary text-white rounded-lg hover:bg-opacity-80"
      >
        Pembayaran Kredit
      </button>
    </div>
  </div>
)}

{/* Pop-up untuk form yang sesuai dengan pilihan */}
{selectedOption && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-1/3 text-black">
      <h2 className="text-xl font-bold mb-4">Form {selectedOption}</h2>
      {selectedOption === "Cash" && <div>Form untuk Cash</div>}
      {selectedOption === "Kredit" && <div>Form untuk Kredit</div>}
      {selectedOption === "Pembayaran Kredit" && <div>Form untuk Pembayaran Kredit</div>}
      <button
        onClick={() => setSelectedOption(null)} // Menutup form
        className="block w-full text-center py-2 bg-gray-300 rounded-lg mt-4"
      >
        Tutup
      </button>
    </div>
  </div>
)}


      <TambahPembayaranSewa
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default DataTransaksi;
