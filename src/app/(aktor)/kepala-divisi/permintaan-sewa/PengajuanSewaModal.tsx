import React, { useState, useEffect } from "react";
import FormData from "@/components/FormData";
import ConfirmationPopup from "@/components/ConfirmationPopUp";

import axios from "axios";

interface RentalRequest {
  id: number;
  nama: string;
  tanggalPermintaan: string;
  noHp: string;
  nik: string;
  jenisKelamin: string;
  alamatDomisili: string;
  alamatKTP: string;
  fotoKTP: string;
  durasiPenyewaan: number;
  status : string;
  lokasiBooth: string;
  idbooth: string | null;
  mulaiSewa: string | null;
  akhirSewa: string | null;
}

interface PengajuanSewaModalProps {
  request: RentalRequest | null;
  onClose: () => void;
  onSave: (id: number, selectedBooth: string) => void;
  onDelete: (id: number) => void;
}

const PengajuanSewaModal: React.FC<PengajuanSewaModalProps> = ({
  request,
  onClose,
  onDelete,
  onSave,
}) => {
  const [showBoothSelector, setShowBoothSelector] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState("");
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
  });
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showBoothConfirmPopup, setShowBoothConfirmPopup] = useState(false);
  const [boothOptions, setBoothOptions] = useState<{ id_booth: string }[]>([]);
  
  useEffect(() => {
    // Fetch data booth saat komponen dimount
    const fetchBoothData = async () => {
      try {
        const response = await axios.get(
          "https://backend-umkm-riau.vercel.app/api/booth/ready"
        );
        if (response.data.success) {
          setBoothOptions(response.data.data); // Simpan data booth
        }
      } catch (error) {
        console.error("Error fetching booth data:", error);
      }
    };
  
    if (showBoothSelector) {
      fetchBoothData(); // Panggil fetch hanya saat selector dibuka
    }
  }, [showBoothSelector]);
  
  if (!request) return null;
  // Hitung tanggal akhir penyewaan
  const calculateEndDate = (startDate: string, duration: number) => {
    if (!startDate) return ""; // Jika tanggal awal kosong
    const start = new Date(startDate);
    start.setDate(start.getDate() + duration * 30); // Tambah durasi penyewaan
    return start.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };



const handleBoothSelectionConfirm = async () => {
  if (!request || !selectedBooth) return;

  // Siapkan payload
  const payload = {
    mulai_sewa: startDate,
    akhir_sewa: endDate,
    status: "DISETUJUI",
    booth_id_booth: selectedBooth,
  };
  console.log(payload);
  try {
    // Kirim data dengan metode PUT ke API
    const response = await axios.put(
      `https://backend-umkm-riau.vercel.app/api/penyewaan/${request.nik}`,
      payload
    );
    console.log(request.nik);
    console.log(response.data);
    if (response.data.success) {
      alert("Booth berhasil disimpan!");
      onSave(request.id, selectedBooth); // Callback untuk menyimpan
      setShowBoothConfirmPopup(false);
      setShowBoothSelector(false);
      onClose();
    } else {
      console.error("Error:", response.data);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Gagal menyimpan data. Silakan coba lagi.");
  }
};

  const handleDelete = () => {
    onDelete(request.id);
    setShowDeletePopup(false);
    onClose();
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, "0"); // Ensure two-digit day
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Ensure two-digit month
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
  };
  
  const endDate = calculateEndDate(startDate, request.durasiPenyewaan);

  return (
    <div className="fixed top-0 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative max-w-3xl w-full bg-white p-6 rounded-lg shadow-2xl">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          Permintaan Sewa {request.nama}
        </h1>

        <div className="overflow-auto max-h-[calc(100vh-250px)]">
          <form className="space-y-4 overflow-auto">
            <FormData formData={request} />
          </form>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          {request.status !== "DISETUJUI" && (
            <>
              <button
                onClick={() => setShowDeletePopup(true)}
                className="py-2 bg-red-600 text-white rounded-xl hover:bg-opacity-75"
              >
                Tolak pengajuan
              </button>
              <button
                onClick={() => setShowBoothSelector(true)}
                className="py-2 bg-primary text-white rounded-xl hover:bg-opacity-75"
              >
                Pilih Booth
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-end border-t-2 pt-2">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-200"
          >
            Tutup
          </button>
        </div>
      </div>

      {showBoothSelector && (
        <div className="fixed top-0 inset-0 z-60 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white p-6 rounded-lg shadow-2xl w-96">
            <h2 className="text-xl text-primary font-bold mb-4">Pilih Booth</h2>

            <select
              value={selectedBooth}
              onChange={(e) => setSelectedBooth(e.target.value)}
              className="w-full p-2 border text-gray-800 border-gray-300 rounded-lg mb-4"
            >
              <option value="">Pilih Booth</option>
              {boothOptions.map((booth) => (
                <option key={booth.id_booth} value={booth.id_booth}>
                  {booth.id_booth}
                </option>
              ))}
            </select>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tanggal Awal Penyewaan
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border text-gray-800 border-gray-300 rounded-lg"
                min={new Date().toISOString().split("T")[0]} 
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                Akhir Penyewaan
              </label>
              <input
                type="text"
                id="endDate"
                value={formatDate(endDate)} // Format the endDate here
                readOnly
                className="w-full p-2 border text-gray-800 border-gray-300 rounded-lg bg-gray-100"
              />
            </div>


            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setShowBoothSelector(false)}
                className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={() => setShowBoothConfirmPopup(true)}
                className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-lime-800"
                disabled={!selectedBooth || !startDate}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <ConfirmationPopup
          title="Konfirmasi Penolakan"
          message="Apakah Anda yakin ingin menolak pengajuan ini?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {showBoothConfirmPopup && (
        <ConfirmationPopup
          title="Konfirmasi Pemilihan Booth"
          message={`Apakah Anda yakin ingin memilih ${selectedBooth}?`}
          onConfirm={handleBoothSelectionConfirm}
          onCancel={() => setShowBoothConfirmPopup(false)}
        />
      )}
    </div>
  );
};

export default PengajuanSewaModal;
