import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsJournalPlus } from "react-icons/bs";
import MultiStepForm from "@/components/ModalKredit";
import ModalStep3 from "@/components/AngsuranKreditModal";
import axios from "axios";

interface Pembelian {
  id: number;
  tanggal_transaksi: string;
  nama: string;
  tenor: number;
  jenis_produk: string;
  jumlah_bukti: number;
}

const TransaksiKredit: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAngsuranModalOpen, setIsAngsuranModalOpen] = useState(false);
  const [transaksi, setTransaksi] = useState<Pembelian[]>([]);
  const [selectedTransaksi, setSelectedTransaksi] = useState<Pembelian | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const pembelianResponse = await axios.get(
          "https://backend-umkm-riau.vercel.app/api/pembelian/CREDIT"
        );
        const pembelianData = pembelianResponse.data.data;

        const transaksiData = await Promise.all(
          pembelianData.map(async (item: Pembelian) => {
            let jumlah_bukti = 0;
            let jenis_produk = "N/A";

            try {
              const buktiResponse = await axios.get(
                `https://backend-umkm-riau.vercel.app/api/bukti/${item.id}`
              );
              jumlah_bukti = buktiResponse.data.data.length - 1;
            } catch (error) {
              console.error("Error fetching bukti data:", error);
              jumlah_bukti = 0;
            }

            try {
              const produkResponse = await axios.get(
                `https://backend-umkm-riau.vercel.app/api/produk/${item.id}`
              );
              if (produkResponse.data.data.length > 0) {
                jenis_produk = produkResponse.data.data[0]?.jenis_produk || "N/A";
              }
            } catch (error) {
              console.error("Error fetching produk data:", error);
              jenis_produk = "N/A";
            }

            return {
              id: item.id,
              tanggal_transaksi: item.tanggal_transaksi.split("T")[0],
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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleOpenTransaksiModal = () => {
    setIsModalOpen(true);
    setDropdownOpen(false);
  };

  const handleOpenAngsuranModal = () => {
    setIsAngsuranModalOpen(true);
    setDropdownOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAngsuranModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <div className="absolute right-1 -top-16">
        <button
          onClick={toggleDropdown}
          className="text-white bg-primary hover:bg-opacity-50 hover:text-black px-6 sm:px-4 py-2 rounded-lg flex items-center"
        >
          <BsJournalPlus className="sm:mr-2 mr-0 text-lg sm:text-xl" />
          <span className="hidden md:inline">Tambah Riwayat</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
            <button
              onClick={handleOpenTransaksiModal}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Transaksi Kredit
            </button>
            <button
              onClick={handleOpenAngsuranModal}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Angsuran Kredit
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <MultiStepForm isOpen={isModalOpen} onClose={handleCloseModal} selectedTransaksi={selectedTransaksi} />
      <ModalStep3 isOpen={isAngsuranModalOpen} onClose={handleCloseModal}  />


      

      {/* Tabel Transaksi */}
      <div className="overflow-x-auto shadow-2xl shadow-primary rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
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
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.tanggal_transaksi}
                </td>
                <td className="px-6 py-4">{item.nama}</td>
                <td className="px-6 py-4">{item.jenis_produk}</td>
                <td className="px-6 py-4">{item.jumlah_bukti} / {item.tenor}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${item.jumlah_bukti === item.tenor
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {item.jumlah_bukti === item.tenor ? "Lunas" : "Belum Lunas"}
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
