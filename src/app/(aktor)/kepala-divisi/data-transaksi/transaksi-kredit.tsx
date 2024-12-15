"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { BsJournalPlus } from "react-icons/bs";

interface Identitas {
  nama: string;
  noHp: string;
  alamat: string;
  fotoKtp: string; // Link or path to the photo of the KTP
}

interface Produk {
  nama: string;
  ukuran: string;
  harga: number;
}

interface Pembayaran {
  tanggal: string;
  pembayaranKe: number;
  jumlah: number; // Sama seperti cicilan per bulan
  buktiPembayaran: string; // Link to payment proof (photo)
}

interface FormData {
  id: string;
  tanggal: string;
  identitas: Identitas;
  produk: Produk;
  dp: number; // Down payment
  tenor: number; // Max 5 months
  jumlahCicilan: number; // Total amount to be paid after DP
  cicilanPerBulan: number; // Cicilan per month (jumlah cicilan / tenor)
  sisaCicilan: number; // Remaining amount to be paid
  prosesCicilan: string;
  statusCicilan: "Lunas" | "Belum Lunas"; // Cicilan status based on sisaCicilan
  pembayaran: Pembayaran[]; // List of payments
}

const TransaksiKredit: React.FC = () => {
  const router = useRouter();
  const data: FormData[] = [
    {
      id: "001",
      tanggal: "2024-11-30",
      identitas: {
        nama: "John Doe",
        noHp: "08123456789",
        alamat: "Jl. Merdeka No. 10, Jakarta",
        fotoKtp: "https://example.com/ktp-johndoe.jpg",
      },
      produk: {
        nama: "Booth Container",
        ukuran: "4x2x3 meter",
        harga: 5000000,
      },
      dp: 1000000,
      tenor: 5, // Cicilan selama 5 bulan
      jumlahCicilan: 4000000, // 5000000 - 1000000
      cicilanPerBulan: 800000, // 4000000 / 5 bulan
      sisaCicilan: 1600000, // 4000000 - (3 x 800000)
      prosesCicilan: "3/5",
      statusCicilan: "Belum Lunas", // Sisa cicilan > 0
      pembayaran: [
        {
          tanggal: "2024-12-01",
          pembayaranKe: 0,
          jumlah: 1000000,
          buktiPembayaran: "https://example.com/bukti-pembayaran-0.jpg",
        },
        {
          tanggal: "2024-12-01",
          pembayaranKe: 1,
          jumlah: 800000,
          buktiPembayaran: "https://example.com/bukti-pembayaran-1.jpg",
        },
        {
          tanggal: "2025-01-01",
          pembayaranKe: 2,
          jumlah: 800000,
          buktiPembayaran: "https://example.com/bukti-pembayaran-2.jpg",
        },
        {
          tanggal: "2025-02-01",
          pembayaranKe: 3,
          jumlah: 800000,
          buktiPembayaran: "https://example.com/bukti-pembayaran-3.jpg",
        },
      ],
    },
    {
      id: "002",
      tanggal: "2024-11-01",
      identitas: {
        nama: "Jane Smith",
        noHp: "08198765432",
        alamat: "Jl. Sudirman No. 20, Bandung",
        fotoKtp: "https://example.com/ktp-janesmith.jpg",
      },
      produk: {
        nama: "Kios Portable",
        ukuran: "3x2x2.5 meter",
        harga: 4000000,
      },
      dp: 500000,
      tenor: 4,
      jumlahCicilan: 3500000,
      cicilanPerBulan: 875000,
      sisaCicilan: 0, // Semua cicilan telah dibayar
      prosesCicilan: "4/4",
      statusCicilan: "Lunas", // Sisa cicilan = 0
      pembayaran: [
        {
          tanggal: "2024-12-01",
          pembayaranKe: 0,
          jumlah: 500000,
          buktiPembayaran: "https://example.com/bukti-pembayaran-0.jpg",
        },
        {
          tanggal: "2025-01-01",
          pembayaranKe: 1,
          jumlah: 875000,
          buktiPembayaran: "https://example.com/bukti-pembayaran-1.jpg",
        },
        {
          tanggal: "2025-02-01",
          pembayaranKe: 2,
          jumlah: 875000,
          buktiPembayaran: "https://example.com/bukti-pembayaran-2.jpg",
        },
        {
          tanggal: "2025-03-01",
          pembayaranKe: 3,
          jumlah: 875000,
          buktiPembayaran: "https://example.com/bukti-pembayaran-3.jpg",
        },
        {
          tanggal: "2025-03-01",
          pembayaranKe: 4,
          jumlah: 875000,
          buktiPembayaran: "https://example.com/bukti-pembayaran-4.jpg",
        },
      ],
    },
  ];

  return (
    <div className="relative">
      <button className="absolute right-1 -top-16  text-white  bg-primary hover:bg-opacity-50 hover:text-black px-6 sm:px-4 py-2 rounded-lg flex items-center">
                  <BsJournalPlus className=" sm:mr-2 mr-0 text-lg sm:text-xl " /> <span className="text-white hidden md:inline">Tambah Riwayat</span>
                </button>
      <div className="overflow-x-auto shadow-2xl shadow-primary rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th scope="col" className="px-6 py-3">Tanggal</th>
              <th scope="col" className="px-6 py-3">Nama Pembeli</th>
              <th scope="col" className="px-6 py-3">Nama Barang</th>
              <th scope="col" className="px-6 py-3">Proses Cicilan</th>
              <th scope="col" className="px-6 py-3">Status Cicilan</th>
              <th scope="col" className="px-6 py-3 text-right">Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
              key={index}
              className="bg-white border-b hover:bg-gray-50 cursor-pointe"
              onClick={() => router.push(`data-transaksi/kredit/${item.id}`)}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.tanggal}
                </td>
                <td className="px-6 py-4">{item.identitas.nama}</td>
                <td className="px-6 py-4">{item.produk.nama}</td>
                <td className="px-6 py-4">
                  {item.pembayaran.length} / {item.tenor}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      item.statusCicilan === "Lunas"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    }`}
                    >
                    {item.statusCicilan}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                <button
                    onClick={() => router.push(`data-transaksi/kredit/${item.id}`)}
                    className="font-medium text-blue-600 hover:underline"
                    >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default TransaksiKredit;
