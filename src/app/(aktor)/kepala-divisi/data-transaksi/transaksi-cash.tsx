"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsJournalPlus } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface Product {
  jumlah: number;
  subtotal: number;
}
// Define the type for each order item
interface FormData {
  id: string;
  tanggal_transaksi: string;
  nama: string;
  jumlah_produk: number;
  totalTransaksi: number;
}

const TransaksiCash: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<FormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Fetch the transaksi data from the first API

    const fetchTransaksiData = async () => {
      try {
        const transaksiResponse = await axios.get("https://backend-umkm-riau.vercel.app/api/pembelian/CASH");
        const transaksiData = transaksiResponse.data.data;
        
        // Fetch product data based on each transaksi id
        const updatedData = await Promise.all(
          transaksiData.map(async (transaksi: FormData) => {
            const productResponse = await axios.get(`https://backend-umkm-riau.vercel.app/api/produk/${transaksi.id}`);
            const productData = productResponse.data.data;

            // Calculate jumlah_produk and totalTransaksi
            const jumlahProduk = productData.reduce((total: number, item: Product ) => total + item.jumlah, 0);
            const totalTransaksi = productData.reduce((total: number, item: Product) => total + item.subtotal, 0);

            return {
              id: transaksi.id.toString(),
              tanggal_transaksi: transaksi.tanggal_transaksi.split("T")[0], // Formatting date
              nama: transaksi.nama,
              jumlah_produk: jumlahProduk,
              totalTransaksi: totalTransaksi,
            };
          })
        );
        
        setData(updatedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchTransaksiData();
  }, []);
  if (loading) {
    return <p className="text-primary">Loading...</p>;
  }

  return (
    <div className="relative">
      <button className="absolute right-1 -top-16 text-white bg-primary hover:bg-opacity-50 hover:text-black px-6 sm:px-4 py-2 rounded-lg flex items-center">
        <BsJournalPlus className="sm:mr-2 mr-0 text-white text-lg sm:text-xl" />
        <span className="text-white hidden md:inline">Transaksi Cash</span>
      </button>

      {/* Wrapper to enable horizontal scroll only for the table */}
      <div className="overflow-x-auto shadow-2xl shadow-primary rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase border-b bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Tanggal</th>
              <th scope="col" className="px-6 py-3 text-center">Nama</th>
              <th scope="col" className="px-6 py-3 text-center">Jumlah Produk</th>
              <th scope="col" className="px-6 py-3 text-center">Total Transaksi</th>
              <th scope="col" className="px-6 py-3 text-right">Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.tanggal_transaksi}</td>
                <td className="px-6 py-4 text-center">{item.nama}</td>
                <td className="px-6 py-4 text-center">{item.jumlah_produk}</td>
                <td className="px-6 py-4 text-center">{item.totalTransaksi}</td>
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
    </div>
  );
};

export default TransaksiCash;
