"use client";

import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from 'next/navigation';

const DataPenyewa: React.FC = () => {
  const [formData, setFormData] = useState({
    nik: "",
    noHp: "",
    nama: "",
    jenisKelamin: "",
    alamatDomisili: "",
    alamatKTP: "",
    fotoKTP: "",
  });
  
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<string[]>([]);

  
  const steps = [
    { name: 'Login', status: 'completed' as const },
    { name: 'Data Diri', status: 'current' as const },
    { name: 'Pengajuan', status: 'upcoming' as const },
    { name: 'Proses Survey', status: 'upcoming' as const },
    { name: 'Pembayaran', status: 'upcoming' as const },
  ]


  // Validation function
  const validateForm = () => {
    const emptyFields: string[] = [];
    for (const key in formData) {
      if (formData[key as keyof typeof formData] === "" && key !== "fotoKTP") {
        emptyFields.push(key);
      }
    }

    // If fotoKTP is not selected, it should be considered an error
    if (!formData.fotoKTP) {
      emptyFields.push("fotoKTP");
    }

    setErrorFields(emptyFields);
    return emptyFields.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Validating...");
    if (!validateForm()) {
      console.log("Form is invalid!");
      return;
    }

    // Console log the form data when it is valid
    console.log("Form submitted with the following data:");
    console.log(formData);

    router.push('/data-penyewa/pengajuan-sewa');
  };
  


  // Helper function to check for empty fields
 

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4 max-w-4xl mx-auto text-black" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="text-primary">/ Data Penyewa</li>
        </ol>
      </nav>

      {/* Step Progress */}
      <div className="max-w-4xl p-4 md:p-0 mx-auto justify-center items-center">
        <ProgressBar steps={steps}/>
      </div>

      <div className="max-w-4xl h-fit mx-auto bg-white shadow-lg rounded-lg text-black p-6">
        <h1 className="text-2xl font-bold text-primary text-center mb-4">Data Diri Calon Penyewa</h1>
        <form className="space-y-4 h-full" onSubmit={handleSubmit}>
          <div className="flex flex-row overflow-auto gap-4 ">
            {/* NIK */}
            <div className="w-full">
              <label htmlFor="nik" className="block text-sm font-medium text-gray-700 capitalize">NIK <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="nik"
                value={formData.nik}
                placeholder="Masukkan 16 karakter NIK"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setFormData({ ...formData, nik: value });
                  }
                }}
                maxLength={16}
                className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${errorFields.includes('nik') ? 'border-red-500' : 'border-gray-300'}`}
              />
              <div className="flex flex-row justify-between">
                <p className="text-gray-500 text-xs mt-1">{formData.nik.length}/16 karakter</p>
                {errorFields.includes('nik') && <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>}
              </div>
            </div>

            {/* No HP */}
            <div className="w-full">
              <label htmlFor="noHp" className="block text-sm font-medium text-gray-700 capitalize">No HP <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="noHp"
                value={formData.noHp}
                placeholder="Masukkan No HP Anda"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setFormData({ ...formData, noHp: value });
                  }
                }}
                maxLength={13}
                className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${errorFields.includes('noHp') ? 'border-red-500' : 'border-gray-300'}`}
              />
              <div className="flex flex-row justify-between">
                <p className="text-gray-500 text-xs mt-1">{formData.noHp.length}/13 karakter</p>
                {errorFields.includes('noHp') && <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            {/* Nama */}
            <div className="w-full">
              <label htmlFor="nama" className="block text-sm font-medium text-gray-700 capitalize">Nama <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="nama"
                value={formData.nama}
                placeholder="Masukkan nama anda"
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                maxLength={40}
                className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${errorFields.includes('nama') ? 'border-red-500' : 'border-gray-300'}`}
              />
              <div className="flex flex-row justify-between">
                <p className="text-gray-500 text-xs mt-1">{formData.nama.length}/40 karakter</p>
                {errorFields.includes('nama') && <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>}
              </div>
            </div>

            {/* Jenis Kelamin */}
            <div className="w-full">
              <label htmlFor="jenisKelamin" className="block text-sm font-medium text-gray-700 capitalize">Jenis Kelamin <span className="text-red-500">*</span></label>
              <select
                id="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${errorFields.includes('jenisKelamin') ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="" disabled>Pilih jenis kelamin</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              <div className="flex flex-row justify-end">
                {errorFields.includes('jenisKelamin') && <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>}
              </div> 
             </div>
          </div>

          {/* Alamat Domisili */}
          <div>
            <label htmlFor="alamatDomisili" className="block text-sm font-medium text-gray-700 capitalize">Alamat Domisili <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="alamatDomisili"
              value={formData.alamatDomisili}
              placeholder="Masukkan alamat tempat tinggal anda saat ini"
              maxLength={40}
              onChange={(e) => setFormData({ ...formData, alamatDomisili: e.target.value })}
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${errorFields.includes('alamatDomisili') ? 'border-red-500' : 'border-gray-300'}`}
            />
            <div className="flex flex-row justify-between">
              <p className="text-gray-500 text-xs mt-1">{formData.alamatDomisili.length}/40 karakter</p>
              {errorFields.includes('alamatDomisili') && <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>}
            </div>
          </div>

          {/* Alamat KTP */}
          <div>
            <label htmlFor="alamatKTP" className="block text-sm font-medium text-gray-700 capitalize">Alamat Sesuai KTP <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="alamatKTP"
              value={formData.alamatKTP}
              placeholder="Masukkan alamat yang tertera pada KTP"
              maxLength={40}
              onChange={(e) => setFormData({ ...formData, alamatKTP: e.target.value })}
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${errorFields.includes('alamatKTP') ? 'border-red-500' : 'border-gray-300'}`}
            />
            <div className="flex flex-row justify-between">
              <p className="text-gray-500 text-xs mt-1">{formData.alamatKTP.length}/40 karakter</p>
              {errorFields.includes('alamatKTP') && <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>}
            </div>
          </div>

          {/* Foto KTP */}
          <div>
            <label htmlFor="fileKTP" className="block text-sm font-medium text-gray-700">
              Foto KTP <span className="text-red-500">*</span>
            </label>
            <div
              className={`bg-gray-50 mt-2 w-full h-52 border-2 ${
                errorFields.includes('fotoKTP') ? 'border-red-500' : 'border-dashed border-primary-300'
              } rounded-md flex items-center justify-center overflow-hidden shadow-inner cursor-pointer`}
              onClick={() => document.getElementById('fileKTP')?.click()}
            >
              {formData.fotoKTP ? (
                <img
                  src={formData.fotoKTP}
                  alt="Foto KTP"
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FiUpload className="text-4xl text-gray-400" />
                  <p className="text-gray-500 mt-2 text-sm">Klik untuk upload foto KTP</p>
                </div>
              )}
            </div>
            <input
              type="file"
              id="fileKTP"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setFormData({ ...formData, fotoKTP: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {errorFields.includes('fotoKTP') && (
              <p className="text-red-500 text-xs mt-2">Field ini harus diisi!</p>
            )}
          </div>



          {/* Submit Button */}
          <div className="text-center mt-6 w-full">
            <button
              type="submit"

              className="px-4 py-2 bg-primary text-white w-full font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataPenyewa;
