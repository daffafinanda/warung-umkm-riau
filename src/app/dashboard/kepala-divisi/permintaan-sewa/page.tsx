"use client";
import React, { useState } from "react";
import RentalRequestCard from "@/components/RentalRequestCard";
import PengajuanSewaModal from "./PengajuanSewaModal";

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
  awalPenyewaan: string;
  akhirPenyewaan: string;
  lokasiBooth: string;
}
const handleDeleteRequest = async (id: number) => {
  try {
    await fetch(`/api/rental-requests/${id}`, { method: "DELETE" });
    alert("Pengajuan berhasil dihapus");
    // Perbarui daftar pengajuan setelah penghapusan
  } catch (error) {
    console.error("Gagal menghapus pengajuan:", error);
    alert("Terjadi kesalahan saat menghapus pengajuan");
  }
};


export default function Home() {
  const rentalRequests: RentalRequest[] = [
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
      awalPenyewaan: "2024-11-01",
      akhirPenyewaan: "2024-12-01",
      lokasiBooth: "Mall Senayan",
    },
    {
      id: 2,
      nama: "Surya Wahyuni",
      tanggalPermintaan: "2024-11-30",
      noHp: "08123456789",
      nik: "1234567890",
      jenisKelamin: "Laki-Laki",
      alamatDomisili: "Jl. Kebon Kacang No. 12, Jakarta",
      alamatKTP: "Jl. Kebon Melati No. 5, Jakarta",
      fotoKTP: "https://about.lovia.id/wp-content/uploads/2020/05/150067.jpg",
      awalPenyewaan: "2024-11-01",
      akhirPenyewaan: "2024-12-01",
      lokasiBooth: "Mall Senayan",
    },
    {
      id: 3,
      nama: "John Doe",
      tanggalPermintaan: "2024-11-30",
      noHp: "08123456789",
      nik: "1234567890",
      jenisKelamin: "Laki-Laki",
      alamatDomisili: "Jl. Kebon Kacang No. 12, Jakarta",
      alamatKTP: "Jl. Kebon Melati No. 5, Jakarta",
      fotoKTP: "https://about.lovia.id/wp-content/uploads/2020/05/150067.jpg",
      awalPenyewaan: "2024-11-01",
      akhirPenyewaan: "2024-12-01",
      lokasiBooth: "Mall Senayan",
    },
  ];

  const [selectedRequest, setSelectedRequest] = useState<RentalRequest | null>(null);

  const handleDetailClick = (request: RentalRequest) => {
    setSelectedRequest(request);
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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

      <PengajuanSewaModal request={selectedRequest} onClose={closeModal} onDelete={handleDeleteRequest} />
    </div>
  );
}
