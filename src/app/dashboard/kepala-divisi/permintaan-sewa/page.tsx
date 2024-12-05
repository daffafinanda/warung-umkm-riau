"use client";
import React, { useState } from "react";
import RentalRequestCard from "@/components/RentalRequestCard";
import PengajuanSewaModal from "./PengajuanSewaModal";
import NotificationPopup from "@/components/NotificationPopUp"; // Komponen notifikasi

interface RentalRequest {
  id: number;
  nama: string;
  tanggalPermintaan: string;
  noHp: string;
  nik: string;
  jenisKelamin: string;
  alamatDomisili: string;
  alamatKTP: string;
  fotoKTP: string;
  durasiPenyewaan: number;
  lokasiBooth: string;
}

export default function Home() {
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([
    {
      id: 1,
      nama: "John Doe",
      tanggalPermintaan: "2024-11-30",
      noHp: "08123456789",
      nik: "1234567890",
      jenisKelamin: "Laki-Laki",
      alamatDomisili: "Jl. Kebon Kacang No. 12, Jakarta",
      alamatKTP: "Jl. Kebon Melati No. 5, Jakarta",
      fotoKTP: "https://about.lovia.id/wp-content/uploads/2020/05/150067.jpg",
      durasiPenyewaan: 2,
      lokasiBooth: "Mall Senayan",
    },
    {
      id: 2,
      nama: "Surya Wahyuni",
      tanggalPermintaan: "2024-11-30",
      noHp: "08123456789",
      nik: "1234567890",
      jenisKelamin: "Perempuan",
      alamatDomisili: "Jl. Kebon Melati No. 8, Jakarta",
      alamatKTP: "Jl. Kebon Kacang No. 3, Jakarta",
      fotoKTP: "https://about.lovia.id/wp-content/uploads/2020/05/150067.jpg",
      durasiPenyewaan: 2,
      lokasiBooth: "Mall Kelapa Gading",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<RentalRequest | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(""); // State untuk pesan notifikasi

  const handleDetailClick = (request: RentalRequest) => {
    setSelectedRequest(request);
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const handleSave = () => {
    // Simulasi penyimpanan
    setNotificationMessage("Booth berhasil dipilih dan disimpan!"); // Set pesan notifikasi
    setPopupVisible(true); // Tampilkan notifikasi
    closeModal(); // Tutup modal
  };

  const handleDeleteRequest = (id: number) => {
    // Perbarui data dengan menghapus item berdasarkan ID
    const updatedRequests = rentalRequests.filter((request) => request.id !== id);
    setRentalRequests(updatedRequests);
    setNotificationMessage("Pengajuan berhasil ditolak!"); // Set pesan notifikasi
    setPopupVisible(true); // Tampilkan notifikasi
    closeModal();
  };

  return (
    <div className=" bg-gray-100 p-6">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rentalRequests.map((request) => (
          <RentalRequestCard
            key={request.id}
            name={request.nama}
            tanggalPermintaan={request.tanggalPermintaan}
            noHp={request.noHp}
            onDetailClick={() => handleDetailClick(request)}
          />
        ))}
      </div>

      <PengajuanSewaModal
        request={selectedRequest}
        onClose={closeModal}
        onSave={handleSave} // Tambahkan fungsi simpan
        onDelete={() => handleDeleteRequest(selectedRequest?.id ?? 0)}
      />

      {/* Notifikasi Pop-up */}
      <NotificationPopup
        message={notificationMessage}
        isVisible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
      />
    </div>
  );
}
