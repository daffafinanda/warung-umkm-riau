"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MdOutlineArrowBackIos } from "react-icons/md";
import ImageModal from "@/components/ImageModal";

interface Produk {
  nama: string;
  ukuran: string;
  harga: number;
  jumlah: number;
}

interface FormData {
  id: string;
  tanggal: string;
  nama: string;
  noHp: string;
  alamat: string;
  produk: Produk[];
  totalTransaksi: number;
  bukti: string;
}

// Data transaksi diletakkan di luar fungsi CashDetail
const data: FormData[] = [
  {
    id: "001",
    tanggal: "2024-11-28",
    nama: "John Doe",
    noHp: "123-456-7890",
    alamat: "123 Apple Street",
    produk: [
      {
        nama: "Booth Container",
        ukuran: "4x2x3 meter",
        harga: 3000000,
        jumlah: 1,
      },
      {
        nama: "Booth Container",
        ukuran: "4x2x3 meter",
        harga: 3000000,
        jumlah: 1,
      },
      {
        nama: "Booth Container",
        ukuran: "4x2x3 meter",
        harga: 3000000,
        jumlah: 1,
      },
    ],
    totalTransaksi: 3000000 * 3,
    bukti: "https://i.pinimg.com/736x/fd/dd/9f/fddd9fb4dd5e11c8ad0c27e2d416ee6f.jpg",
  },
  // Data lainnya
];

const CashDetail: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string[]; // Ambil array slug
  const id = slug[slug.length - 1]; // Ambil ID dari bagian terakhir slug
  const [transaksi, setTransaksi] = useState<FormData | null>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    // Mencari transaksi berdasarkan slug dan update state
    const foundTransaksi = data.find((item) => item.id === id);
    setTransaksi(foundTransaksi || null);
  }, [slug]);

  if (!transaksi) {
    return <div>Transaksi tidak ditemukan</div>;
  }

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleBack = () => {
    router.push("../"); // Navigasi kembali ke halaman sebelumnya
  };

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
          <span className="text-gray-900 font-semibold">Detail Transaksi Cash</span>
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
          Detail Transaksi Cash
        </h1>

        {/* Data Transaksi */}
        <div className="mb-6">
          <div className="grid mb-4 grid-cols-1 md:grid-cols-2 gap-4">
            {[{ label: "ID Transaksi", value: transaksi.id }, { label: "Tanggal Transaksi", value: transaksi.tanggal }].map(
              (item, index) => (
                <div key={index} className="flex flex-col border p-4 rounded-lg">
                  <label className="font-semibold text-gray-700">{item.label}</label>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              )
            )}
          </div>
          {/* Identitas Pembeli */}
          <h3 className="font-semibold text-lg text-black mb-2">Pembeli</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[{ label: "Nama Pembeli", value: transaksi.nama }, { label: "No. HP", value: transaksi.noHp }, { label: "Alamat", value: transaksi.alamat }].map(
              (item, index) => (
                <div key={index} className="flex flex-col border p-4 rounded-lg">
                  <label className="font-semibold text-gray-700">{item.label}</label>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              )
            )}

            {/* Foto Bukti Pembayaran */}
            <div className="flex flex-col border p-4 rounded-lg">
              <label className="font-semibold text-gray-700">Bukti Pembayaran</label>
              <button
                onClick={() => openModal(transaksi.bukti)}
                className="text-primary text-left underline hover:text-primary-dark"
              >
                Lihat Bukti Pembayaran
              </button>
            </div>
          </div>

          {/* Tabel Produk */}
          <div className="mb-4 text-black">
            <h3 className="font-semibold text-lg  mb-2">Produk</h3>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300 text-left bg-gray-100">Nama Produk</th>
                  <th className="px-4 py-2 border border-gray-300 text-left bg-gray-100">Ukuran</th>
                  <th className="px-4 py-2 border border-gray-300 text-left bg-gray-100">Harga</th>
                  <th className="px-4 py-2 border border-gray-300 text-left bg-gray-100">Jumlah</th>
                  <th className="px-4 py-2 border border-gray-300 text-left bg-gray-100">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.produk.map((produk, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-300">{produk.nama}</td>
                    <td className="px-4 py-2 border border-gray-300">{produk.ukuran}</td>
                    <td className="px-4 py-2 border border-gray-300">Rp {produk.harga.toLocaleString()}</td>
                    <td className="px-4 py-2 border border-gray-300">{produk.jumlah}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      Rp {(produk.harga * produk.jumlah).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Transaksi */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-black mb-2">Total Transaksi</h3>
            <div className="flex flex-col border p-4 rounded-lg">
              <label className="font-semibold text-gray-700">Total</label>
              <p className="text-gray-600">Rp {transaksi.totalTransaksi.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Gambar */}
      <ImageModal isOpen={isModalOpen} imageSrc={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default CashDetail;
