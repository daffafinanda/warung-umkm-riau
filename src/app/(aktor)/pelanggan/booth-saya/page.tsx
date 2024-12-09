"use client";
import React, { useState } from "react";
import PaymentHistoryPopup from "@/app/dashboard/pelanggan/booth-saya/RiwayatPembayaran"; // Pastikan import sesuai lokasi file

const BoothPage: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const boothInfo = {
    id_sewa: "S123",
    id_booth: "B123",
    name_penyewa: "Surya Hadid Wahyuni",
    mulai_sewa: "13-08-2024",
    akhir_sewa: "13-08-2024",
    lokasi_booth: "Universitas Sultan Syarif Kasim Riau",
  };

  const paymentRecords = [
    {
      date: "13-07-2024",
      amount: "100000",
      image: "https://i.pinimg.com/736x/51/fa/7c/51fa7c22805807c824b104173c0be30a.jpg",
    },
    {
      date: "13-06-2024",
      amount: "100000",
      image: "https://i.pinimg.com/736x/ef/c9/d2/efc9d278b26651392b7ee7b85c455e1f.jpg",
    },
    {
      date: "13-05-2024",
      amount: "100000",
      image: "/images/payment3.png", // Pastikan gambar lokal tersedia
    },
  ];

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  return (
    <div className="container max-w-full sm:mx-auto mt-8 text-black">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">Informasi Booth Anda</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-base font-normal text-gray-500">Id Sewa</h3>
            <p className="text-lg font-bold">{boothInfo.id_sewa || "-"}</p>
          </div>
          <div>
            <h3 className="text-base font-normal text-gray-500">Id Booth</h3>
            <p className="text-lg font-bold">{boothInfo.id_booth || "-"}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-base font-normal text-gray-500">Nama Penyewa</h3>
          <p className="text-lg font-bold">{boothInfo.name_penyewa || "-"}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-base font-normal text-gray-500">Mulai Sewa</h3>
            <p className="text-lg font-bold">{boothInfo.mulai_sewa || "-"}</p>
          </div>
          <div>
            <h3 className="text-base font-normal text-gray-500">Akhir Sewa</h3>
            <p className="text-lg font-bold">{boothInfo.akhir_sewa || "-"}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-base font-normal text-gray-500">Lokasi Booth</h3>
          <p className="text-lg font-bold">{boothInfo.lokasi_booth || "-"}</p>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={openPopup}
            className="bg-primary hover:bg-green-900 text-white text-base font-medium py-2 px-4 rounded-full"
          >
            Riwayat Pembayaran
          </button>
        </div>
      </div>

      {/* Pop-up Riwayat Pembayaran */}
      <PaymentHistoryPopup isOpen={isPopupOpen} onClose={closePopup} payments={paymentRecords} />
    </div>
  );
};

export default BoothPage;
