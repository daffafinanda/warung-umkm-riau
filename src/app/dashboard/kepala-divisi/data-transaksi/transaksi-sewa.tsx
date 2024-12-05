"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"
import { BsJournalPlus } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

interface PenyewaanData {
  id_sewa: string;
  id_booth: string;
  nama_penyewa: string;
  durasi: string;
}

const dummyData: PenyewaanData[] = [
  { id_sewa: "001", id_booth: "A1", nama_penyewa: "John Doe", durasi: "6 Bulan" },
  { id_sewa: "002", id_booth: "B2", nama_penyewa: "Jane Smith", durasi: "3 Bulan" },
  { id_sewa: "003", id_booth: "C3", nama_penyewa: "Michael Lee", durasi: "1 Tahun" },
];

const RiwayatPenyewaan = () => {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    id_sewa: "",
    tanggal: new Date().toISOString().split("T")[0], // Default tanggal hari ini
    jumlah: "",
    bukti: null as File | null,
    buktiPreview: "", // URL untuk preview gambar
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "bukti" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        bukti: file,
        buktiPreview: URL.createObjectURL(file), // Buat preview URL
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Tambahkan logika untuk mengirim data ke backend
    setShowPopup(false);
    // Hapus URL objek setelah penggunaan untuk mencegah kebocoran memori
    if (formData.buktiPreview) {
      URL.revokeObjectURL(formData.buktiPreview);
    }
  };

  return (
    <div>
      <div className="my-4 text-primary flex text-xl font-bold items-center bg-foreground rounded-lg justify-between shadow-md p-4">
        Riwayat Penyewaan
        <button
          onClick={() => setShowPopup(true)}
          className="bg-primary hidden sm:flex text-white justify-center items-center gap-2 text-base px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          <FaPlus />
          Tambah Pembayaran Sewa
        </button>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-primary sm:hidden text-white flex justify-center items-center gap-2 text-base px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          <BsJournalPlus />
        </button>
      </div>
      <div className="p-4 bg-foreground">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">ID Sewa</th>
                <th scope="col" className="px-6 py-3">ID Booth</th>
                <th scope="col" className="px-6 py-3">Nama Penyewa</th>
                <th scope="col" className="px-6 py-3">Durasi</th>
                <th scope="col" className="px-6 py-3">Detail</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.id_sewa}
                  </td>
                  <td className="px-6 py-4">{item.id_booth}</td>
                  <td className="px-6 py-4">{item.nama_penyewa}</td>
                  <td className="px-6 py-4">{item.durasi}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                    onClick={() =>
                      router.push(`/dashboard/kepala-divisi/data-transaksi/penyewaan/${item.id_sewa}`)
                    }
                    className="font-medium text-blue-600 hover:underline">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pop-up Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96">
            <h3 className="text-lg font-bold mb-4">Tambah Pembayaran Sewa</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="id_sewa" className="block text-sm font-medium">
                  ID Sewa
                </label>
                <input
                  type="text"
                  name="id_sewa"
                  id="id_sewa"
                  className="w-full mt-1 p-2 border rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tanggal" className="block text-sm font-medium">
                  Tanggal
                </label>
                <input
                  type="date"
                  name="tanggal"
                  id="tanggal"
                  className="w-full mt-1 p-2 border rounded-lg"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="jumlah" className="block text-sm font-medium">
                  Jumlah
                </label>
                <input
                  type="number"
                  name="jumlah"
                  id="jumlah"
                  className="w-full mt-1 p-2 border rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bukti" className="block text-sm font-medium">
                  Bukti Pembayaran
                </label>
                <input
                  type="file"
                  name="bukti"
                  id="bukti"
                  className="w-full mt-1 p-2 border rounded-lg"
                  accept="image/*"
                  onChange={handleInputChange}
                  required
                />
                {formData.buktiPreview && (
                  <img
                    src={formData.buktiPreview}
                    alt="Preview Bukti Pembayaran"
                    className="mt-4 w-full h-auto rounded-lg shadow-md"
                  />
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiwayatPenyewaan;
