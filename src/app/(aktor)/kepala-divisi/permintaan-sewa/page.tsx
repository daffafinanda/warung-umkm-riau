"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import RentalRequestCard from "@/components/RentalRequestCard";
import PengajuanSewaModal from "./PengajuanSewaModal";
import { useModal } from '@/components/ModalContext';

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
  status: string;
  lokasiBooth: string;
  idbooth: string | null;
  mulaiSewa: string | null;
  akhirSewa: string | null;
}

export default function Home() {
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RentalRequest | null>(null);
  const { showNotification } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rentalResponse = await axios.get(
          "https://backend-umkm-riau.vercel.app/api/penyewaan"
        );

        if (rentalResponse.data.success) {
          const rentalData = rentalResponse.data.data;

          const requests = await Promise.all(
            rentalData.map(async (rental: any) => {
              try {
                const biodataResponse = await axios.get(
                  `https://backend-umkm-riau.vercel.app/api/biodata/nik/${rental.biodata_nik}`
                );

                const biodata = biodataResponse.data.data;

                let noHp = "-";
                if (biodata.akun_id_akun) {
                  const akunResponse = await axios.get(
                    `https://backend-umkm-riau.vercel.app/api/akun/id/${biodata.akun_id_akun}`
                  );
                  noHp = akunResponse.data.data.no_hp || "-";
                }

                return {
                  id: rental.id_sewa,
                  nama: biodata.nama,
                  tanggalPermintaan: formatDate(rental.permintaan_dibuat),
                  noHp: noHp,
                  nik: biodata.nik,
                  jenisKelamin: formatGender(biodata.jenis_kelamin),
                  alamatDomisili: biodata.alamat_domisili,
                  alamatKTP: biodata.alamat,
                  fotoKTP: biodata.foto_ktp,
                  durasiPenyewaan: rental.durasi,
                  status: rental.status,
                  lokasiBooth: rental.lokasi,
                  idbooth: rental.booth_id_booth,
                  mulaiSewa: rental.mulai_sewa,
                  akhirSewa: rental.akhir_sewa,

                };
              } catch (error) {
                console.error(
                  `Error fetching biodata or akun for rental ID ${rental.id_sewa}:`,
                  error
                );
                return null;
              }
            })
          );

          // Filter out any null values (in case of errors in fetching data)
          const validRequests = requests.filter((request) => request !== null);

          console.log(validRequests);
          setRentalRequests(validRequests);
        }
      } catch (error) {
        console.error("Error fetching rental requests:", error);
      }
    };

    fetchData();
  }, []);


  const formatGender = (gender: string) => {
    return gender === 'L' ? 'Laki-Laki' : gender === 'P' ? 'Perempuan' : 'Tidak Diketahui';
  };
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDetailClick = (request: RentalRequest) => {
    setSelectedRequest(request);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    window.location.reload(); // Reload the page when the modal is closed
  };


  const handleSave = () => {
    showNotification("Booth berhasil dipilih dan disimpan!");
    closeModal();
  };

  const handleDeleteRequest = (id: number) => {
    const updatedRequests = rentalRequests.filter((request) => request.id !== id);
    setRentalRequests(updatedRequests);
    showNotification("Pengajuan berhasil ditolak!");
    closeModal();
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rentalRequests.map((request) => (
          <RentalRequestCard
            key={request.id}
            name={request.nama}
            tanggalPermintaan={request.tanggalPermintaan}
            noHp={request.noHp}
            status={request.status}
            onDetailClick={() => handleDetailClick(request)}
          />
        ))}
      </div>

      <PengajuanSewaModal
        request={selectedRequest}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={() => handleDeleteRequest(selectedRequest?.id ?? 0)}
      />
    </div>
  );
}
