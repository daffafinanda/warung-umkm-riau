import React from "react";

interface FormData {
  nik: string;
  noHp: string;
  nama: string;
  jenisKelamin: string;
  alamatDomisili: string;
  alamatKTP: string;
  fotoKTP: string;
  durasiPenyewaan: number;
  lokasiBooth: string;
}

interface RentalFormProps {
  formData: FormData;
}

const RentalForm: React.FC<RentalFormProps> = ({ formData }) => {
  return (
    <>
      {/* NIK and No HP */}
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <FormField label="NIK" id="nik" value={formData.nik} />
        <FormField label="No HP" id="noHp" value={formData.noHp} />
      </div>

      {/* Nama and Jenis Kelamin */}
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <FormField label="Nama" id="nama" value={formData.nama} />
        <FormField
          label="Jenis Kelamin"
          id="jenisKelamin"
          value={formData.jenisKelamin}
        />
      </div>

      {/* Alamat Domisili */}
      <FormField
        label="Alamat Domisili"
        id="alamatDomisili"
        value={formData.alamatDomisili}
      />

      {/* Alamat KTP */}
      <FormField
        label="Alamat Sesuai KTP"
        id="alamatKTP"
        value={formData.alamatKTP}
      />

      {/* Foto KTP */}
      <div>
        <label
          htmlFor="fileKTP"
          className="block text-sm font-medium text-gray-700"
        >
          Foto KTP
        </label>
        <div className="bg-background mt-2 w-full h-52 border-2 z-0 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-50 shadow-inner">
          <img
            src={formData.fotoKTP}
            alt="Foto KTP"
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      {/* Lokasi Booth and Durasi Penyewaan */}
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
        {/* Lokasi Booth - Menempati 2 kolom */}
        <div className="sm:col-span-2">
          <FormField
            label="Lokasi Booth"
            id="lokasiBooth"
            value={formData.lokasiBooth}
          />
        </div>

        {/* Durasi Penyewaan - Menempati 1 kolom */}
        <div>
          <label
            htmlFor="durasiPenyewaan"
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            Durasi Penyewaan
          </label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              id="durasiPenyewaan"
              value={formData.durasiPenyewaan}
              readOnly
              className="bg-background block w-full rounded-md border-gray-300 shadow-inner focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-3 py-2"
            />
            <span className="mx-2 text-gray-900">Bulan</span>
          </div>
        </div>
      </div>


    </>
  );
};

interface FormFieldProps {
  label: string;
  id: string;
  value: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, value }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 capitalize"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        readOnly
        className="bg-background mt-1 block w-full rounded-md border-gray-300 shadow-inner focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-3 py-2"
      />
    </div>
  );
};

export default RentalForm;
