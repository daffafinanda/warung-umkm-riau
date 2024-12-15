"use client";
import React, { useState } from "react";
import ModalCash from "@/components/CashModal";
import { BsJournalPlus } from "react-icons/bs";
import { useRouter } from "next/navigation";

// Define the type for each order item
interface Product {
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
  produk: Product[];
  totalTransaksi: number;
  bukti: string;
}

const TransaksiCash: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<FormData | null>(null);
  const router = useRouter();
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
      totalTransaksi: 3000000 * 1,
      bukti: "https://i.pinimg.com/736x/fd/dd/9f/fddd9fb4dd5e11c8ad0c27e2d416ee6f.jpg",
    },
    // Tambahkan data lainnya di sini
  ];

  // const openModal = (item: FormData) => {
  //   setSelectedData(item);
  //   setIsOpen(true);
  // };

  const closeModal = () => {
    setSelectedData(null);
    setIsOpen(false);
  };

  // Define onEdit and onDelete functions
  const onEdit = (data: FormData) => {
    console.log("Editing item with data:", data);
 
  };

  const onDelete = (id: string) => {
    console.log(`Deleting item with ID: ${id}`);
    // Implement delete functionality here
  };

  return (
    <div className="relative bg-foreground min-h-full">
      <button className="absolute right-1 -top-16  text-white  bg-primary hover:bg-opacity-50 hover:text-black px-6 sm:px-4 py-2 rounded-lg flex items-center">
            <BsJournalPlus className=" sm:mr-2 mr-0 text-lg sm:text-xl " /> <span className="text-white hidden md:inline">Tambah Riwayat</span>
          </button>
      {/* Wrapper to enable horizontal scroll only for the table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Tanggal</th>
              <th scope="col" className="px-6 py-3">Nama</th>
              <th scope="col" className="px-6 py-3">Total Transaksi</th>
              <th scope="col" className="px-6 py-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.tanggal}
                </td>
                <td className="px-6 py-4">{item.nama}</td>
                <td className="px-6 py-4">{item.totalTransaksi}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => router.push(`data-transaksi/cash/${item.id}`)}
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

      {/* Integrasi Modal */}
      {isOpen && selectedData && (
        <ModalCash
          isOpen={isOpen}
          onClose={closeModal}
          onEdit={onEdit}
          onDelete={onDelete}
          data={{
            id: selectedData.id,
            tanggal: selectedData.tanggal,
            nama: selectedData.nama,
            noHp: selectedData.noHp,
            alamat: selectedData.alamat,
            produk: selectedData.produk,
            totalTransaksi: selectedData.totalTransaksi,
            bukti: selectedData.bukti,
          }}
        />
      )}
    </div>
  );
};

export default TransaksiCash;
