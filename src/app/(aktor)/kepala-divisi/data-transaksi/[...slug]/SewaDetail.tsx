"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md"; // Import tombol Back dari React Icons
import ImageModal from "@/components/ImageModal";
import axios from "axios";



// Simulasi data untuk penyewaan
interface Pembayaran {
  tanggal: string;
  jumlah: number;
  bukti: string; // URL gambar
}

interface PenyewaanDetail {
  id_sewa: string;
  id_booth: string;
  nama_penyewa: string;
  lokasi: string;
  durasi: number;
  harga: number;
  pembayaran: Pembayaran[];
  jumlah_dibayar: number;
  sisa: number;
}

const SewaDetail = () => {
  const params = useParams();
  const slug = params.slug as string[]; // Ambil array slug
  const id = slug[slug.length - 1]; // Ambil ID dari bagian terakhir slug
  const [detail, setDetail] = useState<PenyewaanDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const router = useRouter(); // Untuk navigasi kembali

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data penyewaan
        const resPenyewaan = await axios.get("https://backend-umkm-riau.vercel.app/api/penyewaan");
        const penyewaanData = resPenyewaan.data.data.find((item : PenyewaanDetail) => item.id_sewa.toString() === id);
  
        if (!penyewaanData) {
          setDetail(null);
          return;
        }
  
        // Fetch data nama penyewa
        const resBiodata = await axios.get(
          `https://backend-umkm-riau.vercel.app/api/biodata/nik/${penyewaanData.biodata_nik}`
        );
        const namaPenyewa = resBiodata.data.data.nama;
  
        // Fetch data pembayaran
        let pembayaranData = null;
        try {
          const resPembayaran = await axios.get(
            `https://backend-umkm-riau.vercel.app/api/sewa/${penyewaanData.id_sewa}`
          );
          if (resPembayaran.data.success) {
            pembayaranData = resPembayaran.data.data.map((pay : Pembayaran) => ({
              tanggal: new Date(pay.tanggal).toLocaleDateString(),
              jumlah: pay.jumlah,
              bukti: pay.bukti,
            }));
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            // Cek jika error adalah instance AxiosError
            if (error.response && error.response.status === 404) {
              // Jika status 404, set pembayaran menjadi null
              pembayaranData = null;
            } else {
              console.error("Error fetching pembayaran data:", error);
            }
          } else {
            console.error("Unexpected error:", error);
          }
        }
  
        // Hitung total pembayaran dan sisa
        const jumlahDibayar = pembayaranData ? pembayaranData.reduce((acc : number, cur  : Pembayaran) => acc + cur.jumlah, 0) : 0;
        const sisa = penyewaanData.durasi * 600000 - jumlahDibayar;
  
        // Set data detail
        setDetail({
          id_sewa: penyewaanData.id_sewa.toString(),
          id_booth: penyewaanData.booth_id_booth,
          nama_penyewa: namaPenyewa,
          lokasi: penyewaanData.lokasi,
          durasi: penyewaanData.durasi,
          harga: penyewaanData.durasi * 600000, // Contoh perhitungan harga
          pembayaran: pembayaranData,
          jumlah_dibayar: jumlahDibayar,
          sisa,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [id]);
  
  

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleBack = () => {
    router.push("../"); // Navigasi kembali ke halaman transaksi
  };

  if (!detail) {
    return (
      <div className="fixed inset-0 z-0 flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-bold text-gray-800">
          Penyewa Tidak Ditemukan
        </h1>
        <button
          onClick={handleBack}
          className="mt-2 text-primary hover:underline"
        >
          Kembali ke Data Transaksi
        </button>
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="mb-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => router.push("../")}
          >
            Data Transaksi
          </span>{" "}
          /{" "}
          <span className="text-gray-900 font-semibold">Detail Penyewaan</span>
        </nav>
        
        {/* Tombol Kembali */}
        <button
          onClick={handleBack}
          className="flex items-center text-primary hover:underline mb-4"
        >
          <MdOutlineArrowBackIos className="mr-2" />
          Kembali
        </button>
      </div>

      <div className="mx-auto p-6 bg-foreground rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Detail Penyewaan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[ 
            { label: "ID Sewa", value: detail.id_sewa },
            { label: "ID Booth", value: detail.id_booth },
            { label: "Nama Penyewa", value: detail.nama_penyewa },
            { label: "Durasi Sewa", value: `${detail.durasi} Bulan` },

            { label: "Harga Sewa", value: `Rp ${detail.harga.toLocaleString()}` },
            {
              label: "Jumlah Dibayar",
              value: `Rp ${detail.jumlah_dibayar.toLocaleString()}`,
            },
            {
              label: "Sisa Pembayaran",
              value: `Rp ${detail.sisa.toLocaleString()}`,
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col border p-4 rounded-lg">
              <label className="font-semibold text-gray-700">{item.label}</label>
              <p className="text-gray-600">{item.value}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Detail Pembayaran
          </h2>
          {detail?.pembayaran?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-left">
                  <th className="py-3 px-4 border-b">No</th>
                  <th className="py-3 px-4 border-b">Tanggal</th>
                  <th className="py-3 px-4 border-b">Jumlah</th>
                  <th className="py-3 px-4 border-b">Bukti</th>
                </tr>
              </thead>
              <tbody>
                {detail.pembayaran.map((pay, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b text-gray-700">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-700">
                      {pay.tanggal}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-700">
                      Rp {pay.jumlah.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <button
                        onClick={() => openModal(pay.bukti)}
                        className="text-primary underline hover:text-primary-dark"
                      >
                        Lihat Bukti
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  ) : (
    <p className="text-gray-500">Belum ada pembayaran.</p>
  )}
        </div>
      </div>

      {/* Modal Gambar */}
      <ImageModal isOpen={isModalOpen} imageSrc={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default SewaDetail;
