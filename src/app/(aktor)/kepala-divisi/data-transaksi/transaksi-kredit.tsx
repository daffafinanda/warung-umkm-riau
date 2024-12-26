"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsJournalPlus } from "react-icons/bs";
import  TambahTransaksiKredit  from "@/components/TambahTransaksiKredit";
import axios from "axios";

interface Pembelian {
  id: number;
  tanggal_transaksi: string;
  nama: string;
  tenor: number;
  jenis_produk : string,
  jumlah_bukti: number;
}

const TransaksiKredit: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaksi, setTransaksi] = useState<Pembelian[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        // Fetch pembelian data
        const pembelianResponse = await axios.get(
          "https://backend-umkm-riau.vercel.app/api/pembelian/CREDIT"
        );
        const pembelianData = pembelianResponse.data.data;

        // Process each pembelian item
        const transaksiData = await Promise.all(
          pembelianData.map(async (item: Pembelian) => {
            // Fetch jumlah_bukti
            const buktiResponse = await axios.get(
              `https://backend-umkm-riau.vercel.app/api/bukti/${item.id}`
            );
            const jumlah_bukti = buktiResponse.data.data.length -1;

            // Fetch produk
            const produkResponse = await axios.get(
              `https://backend-umkm-riau.vercel.app/api/produk/${item.id}`
            );
            const jenis_produk = produkResponse.data.data[0]?.jenis_produk || "N/A";
            console.log(produkResponse.data);
            return {
              id: item.id,
              tanggal_transaksi: item.tanggal_transaksi,
              nama: item.nama,
              tenor: item.tenor,
              jenis_produk,
              jumlah_bukti,
            };
          })
        );

        setTransaksi(transaksiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTransaksi();
  }, []);

  // const transaksi : Pembelian[] = [
  //   { 
  //     id: 1,
  //     tanggal: "2024-11-30",
  //     nama: "John Doe",
  //     tenor: 5,
  //     produk: [
  //       {
  //         jenis_produk: "Booth",
  //       },
  //     ],
  //     jumlah_bukti: 1
 
  //   }
  // ]
  

  return (
    <div className="relative">
       <button
        onClick={handleOpenModal}
        className="absolute right-1 -top-16 text-white bg-primary hover:bg-opacity-50 hover:text-black px-6 sm:px-4 py-2 rounded-lg flex items-center"
      >
        <BsJournalPlus className="sm:mr-2 mr-0 text-lg sm:text-xl" />{" "}
        <span className="text-white hidden md:inline">Tambah Riwayat</span>
      </button>
      {/* Modal */}
      {isModalOpen && (
        <TambahTransaksiKredit isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
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
            {transaksi.map((item, index) => (
              <tr
              key={index}
              className="bg-white border-b hover:bg-gray-50 "
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.tanggal_transaksi}
                </td>
                <td className="px-6 py-4">{item.nama}</td>
                <td className="px-6 py-4">{item.jenis_produk}</td>
                <td className="px-6 py-4">
                  {item.jumlah_bukti} / {item.tenor}
                </td>
                <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    item.jumlah_bukti == item.tenor
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.jumlah_bukti == item.tenor ? "Lunas" : "Belum Lunas"}
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
