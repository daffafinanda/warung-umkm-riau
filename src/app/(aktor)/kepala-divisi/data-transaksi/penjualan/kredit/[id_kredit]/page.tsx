
"use client"; 
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MdOutlineArrowBackIos } from "react-icons/md";
import ImageModal from "@/components/ImageModal";


interface Identitas {
  nama: string;
  noHp: string;
  alamat: string;
  fotoKtp: string;
}

interface Produk {
  nama: string;
  ukuran: string;
  harga: number;
}

interface Pembayaran {
  tanggal: string;
  pembayaranKe: number;
  jumlah: number;
  buktiPembayaran: string;
}

interface FormData {
  id: string;
  tanggal: string;
  identitas: Identitas;
  produk: Produk;
  dp: number;
  tenor: number;
  jumlahCicilan: number;
  cicilanPerBulan: number;
  sisaCicilan: number;
  prosesCicilan: string;
  statusCicilan: 'Lunas' | 'Belum Lunas';
  pembayaran: Pembayaran[];
}

const TransaksiDetail: React.FC = () => {
  const { id_kredit } = useParams(); // Mendapatkan id dari URL
  const [transaksi, setTransaksi] = useState<FormData | null>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");


  useEffect(() => {
    // Simulasi pengambilan data berdasarkan id_kredit
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
    

    // Mencari transaksi berdasarkan id_kredit dan update state
    const foundTransaksi = data.find(item => item.id === id_kredit);
    setTransaksi(foundTransaksi || null);
  }, [id_kredit]); // Menambahkan id_kredit ke dependensi useEffect

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
      <span className="text-gray-900 font-semibold">Detail Transaksi Kredit</span>
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
      Detail Transaksi Kredit
    </h1>

    {/* Data Transaksi */}
    <div className="mb-6">
    <div className="grid mb-4 grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { label: "ID Transaksi", value: transaksi.id },
        { label: "Tanggal Transaksi", value: transaksi.tanggal },
      ].map((item, index) => (
        <div key={index} className="flex flex-col border p-4 rounded-lg">
          <label className="font-semibold text-gray-700">{item.label}</label>
          <p className="text-gray-600">{item.value}</p>
        </div>
      ))}
    </div>
  {/* Identitas Pembeli */}
  <h3 className="font-semibold text-lg text-black mb-2">Pembeli</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    {[
      { label: "Nama Pembeli", value: transaksi.identitas.nama },
      { label: "No. HP", value: transaksi.identitas.noHp },
      { label: "Alamat", value: transaksi.identitas.alamat },
    ].map((item, index) => (
      <div key={index} className="flex flex-col border p-4 rounded-lg">
        <label className="font-semibold text-gray-700">{item.label}</label>
        <p className="text-gray-600">{item.value}</p>
      </div>
    ))}

    {/* Foto KTP */}
    <div className="flex flex-col border p-4 rounded-lg">
        <label className="font-semibold text-gray-700">Foto KTP</label>
        <button
            onClick={() => openModal(transaksi.identitas.fotoKtp)}
            className="text-primary text-left underline hover:text-primary-dark"
            >
            Lihat Foto KTP
        </button>
        </div>
  </div>

  {/* Produk */}
  <div className="mb-4">
    <h3 className="font-semibold text-lg text-black mb-2">Produk</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { label: "Nama Barang", value: transaksi.produk.nama },
        { label: "Ukuran", value: transaksi.produk.ukuran },
        { label: "Harga", value: `Rp ${transaksi.produk.harga.toLocaleString()}` },
      ].map((item, index) => (
        <div key={index} className="flex flex-col border p-4 rounded-lg">
          <label className="font-semibold text-gray-700">{item.label}</label>
          <p className="text-gray-600">{item.value}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Cicilan */}
  <div className="mb-4">
    <h3 className="font-semibold text-lg text-black mb-2">Cicilan</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { label: "Tenor", value: `${transaksi.tenor} kali cicilan` },
        { label: "DP", value: `Rp ${transaksi.dp.toLocaleString()}` },
        { label: "Status Cicilan", value: transaksi.statusCicilan },
        { label: "Cicilan", value: `Rp ${transaksi.cicilanPerBulan.toLocaleString()} per bulan` },
        { label: "Total Cicilan", value: `Rp ${transaksi.jumlahCicilan.toLocaleString()}` },
        
        { label: "Sisa Cicilan", value: `Rp ${transaksi.sisaCicilan.toLocaleString()}` },
      ].map((item, index) => (
        <div key={index} className="flex flex-col border p-4 rounded-lg">
          <label className="font-semibold text-gray-700">{item.label}</label>
          <p className="text-gray-600">{item.value}</p>
        </div>
      ))}
    </div>
  </div>
</div>


    {/* Riwayat Pembayaran */}
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Riwayat Pembayaran</h2>
      <div className="flex flex-row-fit border py-2 px-4 rounded-lg mb-6">
          <label className="font-semibold mr-2 text-gray-700">Proses Cicilan : </label>
          <p className="text-gray-600">{transaksi.prosesCicilan}</p>
        </div>
      {transaksi.pembayaran.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left">
                <th className="py-3 px-4 border-b">Tanggal</th>
                <th className="py-3 px-4 border-b">Pembayaran Ke</th>
                <th className="py-3 px-4 border-b">Jumlah</th>
                <th className="py-3 px-4 border-b">Bukti Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {transaksi.pembayaran.map((pay, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-gray-700">{pay.tanggal}</td>
                  <td className="py-3 px-4 border-b text-gray-700">{pay.pembayaranKe}</td>
                  <td className="py-3 px-4 border-b text-gray-700">Rp {pay.jumlah.toLocaleString()}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => openModal(pay.buktiPembayaran)}
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

export default TransaksiDetail;
