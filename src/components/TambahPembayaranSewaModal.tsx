"use client";
import React, { useState } from "react";

interface SewaModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: {
    idSewa: string;
    tanggal: string;
    buktiPembayaran: File | null;
  }) => void;
}

const TambahPembayaranSewa: React.FC<SewaModalProps> = ({ isVisible, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    idSewa: "",
    tanggal: new Date().toISOString().split("T")[0], // Format tanggal hari ini (YYYY-MM-DD)
    buktiPembayaran: null as File | null,
  });
  const [errors, setErrors] = useState({
    idSewa: false,
    tanggal: false,
    buktiPembayaran: false,
  });


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, buktiPembayaran: file }));
    setErrors((prevErrors) => ({ ...prevErrors, buktiPembayaran: false }));
  };

  const validateForm = () => {
    const newErrors = {
      idSewa: formData.idSewa.trim() === "",
      tanggal: formData.tanggal.trim() === "",
      buktiPembayaran: formData.buktiPembayaran === null,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      console.log("Validasi gagal, semua input harus diisi.");
      return;
    }
    onSave(formData);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 text-black max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Tambah Pembayaran Sewa</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="idSewa" className="block text-sm font-medium">
              ID Sewa
            </label>
            <input
              type="text"
              id="idSewa"
              name="idSewa"
              value={formData.idSewa}
              onChange={handleInputChange}
              className={`w-full border rounded-lg p-2 ${
                errors.idSewa ? "border-red-500" : ""
              }`}
              placeholder="Masukkan ID Sewa"
            />
            {errors.idSewa && (
              <p className="text-red-500 text-sm mt-1">ID Sewa harus diisi.</p>
            )}
          </div>
          <div>
            <label htmlFor="tanggal" className="block text-sm font-medium">
              Tanggal
            </label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleInputChange}
              className={`w-full border rounded-lg p-2 ${
                errors.tanggal ? "border-red-500" : ""
              }`}
            />
            {errors.tanggal && (
              <p className="text-red-500 text-sm mt-1">Tanggal harus diisi.</p>
            )}
          </div>
          <div>
            <label htmlFor="buktiPembayaran" className="block text-sm font-medium">
              Bukti Pembayaran
            </label>
            <input
              type="file"
              id="buktiPembayaran"
              name="buktiPembayaran"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full border rounded-lg p-2 ${
                errors.buktiPembayaran ? "border-red-500" : ""
              }`}
            />
            {errors.buktiPembayaran && (
              <p className="text-red-500 text-sm mt-1">
                Bukti pembayaran harus diunggah.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahPembayaranSewa;
