"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import FormData from "@/components/FormData";
import { useRouter } from "next/navigation";



const PengajuanSewa: React.FC = () => {
  type Status = "Disetujui" | "Menunggu" | "Diproses" | "Ditolak";


  interface RentalRequest {
    nama: string;
    jenisKelamin: string;
    alamatDomisili: string;
    alamatKTP: string;
    fotoKTP: string | null; 
    durasiPenyewaan: number;
    lokasiBooth: string;
    statusProses: Status;
    nik: string;
    noHp: string;
  }
  
  const [formData, setFormData] = useState<RentalRequest>({
    nama: "",
    jenisKelamin: "",
    alamatDomisili: "",
    alamatKTP: "",
    fotoKTP: null,
    durasiPenyewaan: 0,
    lokasiBooth: "",
    statusProses: "Menunggu" as Status,
    nik: "",
    noHp: "",
  });

  const router = useRouter();

  useEffect(() => {
    // Ambil data biodata dari localStorage
    const biodata = JSON.parse(localStorage.getItem("biodata") || "{}");
    const noHp = localStorage.getItem("no_hp");

    if (biodata && biodata.nik) {
      // Perbarui formData dengan data dari localStorage
      setFormData((prevData: RentalRequest) => ({
        ...prevData,
        nama: biodata.nama || "",
        jenisKelamin: biodata.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan",
        alamatDomisili: biodata.alamat_domisili || "",
        alamatKTP: biodata.alamat || "",
        fotoKTP: biodata.foto_ktp,
        nik: biodata.nik || "",
        noHp: noHp || "",
      }));

      // Ambil data penyewaan dari API
      axios
        .get(
          `https://backend-umkm-riau.vercel.app/api/penyewaan/${biodata.nik}`
        )
        .then((response) => {
          const penyewaan = response.data.data[0];
          if (penyewaan) {
            setFormData((prevData: RentalRequest) => ({
              ...prevData,
              durasiPenyewaan: penyewaan.durasi || 0,
              lokasiBooth: penyewaan.lokasi || "",
              statusProses:
                penyewaan.status === "DISETUJUI"
                  ? "Disetujui"
                  : penyewaan.status === "MENUNGGU"
                  ? "Menunggu"
                  : penyewaan.status === "DITOLAK"
                  ? "Ditolak"
                  : "Diproses",
              hargaSewa: (penyewaan.durasi || 0) * 300000, // Durasi x 300000
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching penyewaan data:", error);
        });
    }
  }, []);

  const getStatusClass = (status: Status): string => {
    switch (status) {
      case "Disetujui":
        return "bg-green-500";
      case "Menunggu":
        return "bg-gray-400 ";
      case "Diproses":
        return "bg-yellow-400 ";
      case "Ditolak":
        return "bg-red-400 ";
      default:
        return "bg-gray-300 ";
    }
  };

  const renderButtons = (status: Status) => {
    switch (status) {
      case "Menunggu":
        return (
          <button
            type="button"
            className="w-full bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 focus:outline-none"
          >
            Batalkan Pengajuan
          </button>
        );
      case "Disetujui":
        return (
          <button
            type="button"
            onClick={() => router.push('/pelanggan/booth-saya')}
            className="w-full bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-70 focus:outline-none"
          >
            Lihat Booth
          </button>
        );
      case "Ditolak":
        return (
          <div className="flex space-x-4 w-full">
            <button
              type="button"
              className="w-full bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 focus:outline-none"
            >
              Edit
            </button>
            <button
              type="button"
              className="w-full bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 focus:outline-none"
            >
              Batalkan Pengajuan
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl sm:mx-auto mx-3 mt-8 bg-white p-6 rounded-lg shadow-2xl">
      <h1 className="text-2xl font-bold text-primary mb-6 text-center">
        Form Penyewaan Anda
      </h1>
      <form className="space-y-4">
        <FormData formData={formData} />



        {/* Status Proses */}
        <div className="flex flex-row items-center gap-4">
          <label
            htmlFor="statusProses"
            className="block text-sm font-medium text-gray-700"
          >
            Status Proses
          </label>
          <div
            id="statusProses"
            className={`bg-background w-fit px-4 py-2 rounded-lg text-left font-medium ${getStatusClass(
              formData.statusProses
            )}`}
          >
            {formData.statusProses}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-center">
          {renderButtons(formData.statusProses)}
        </div>
      </form>
    </div>
  );
};

export default PengajuanSewa;
