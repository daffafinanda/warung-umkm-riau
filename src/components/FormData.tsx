import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FiLink } from "react-icons/fi"
import Image from 'next/image';

interface FormData {
  nik: string;
  noHp: string;
  nama: string;
  jenisKelamin: string;
  alamatDomisili: string;
  alamatKTP: string;
  fotoKTP: string | null;
  durasiPenyewaan: number;
  lokasiBooth: string; 
}

interface RentalFormProps {
  formData: FormData;
}

const RentalForm: React.FC<RentalFormProps> = ({ formData }) => {
  useEffect(() => {
    if (!formData.lokasiBooth) return; // Validate lokasiBooth
  
    // Parse lokasiBooth into coordinates
    const coordinates = formData.lokasiBooth.split(",").map(Number) as [number, number];
  
    if (coordinates.length !== 2 || coordinates.some(isNaN)) {
      console.error("Invalid lokasiBooth format");
      return;
    }
  
    // Initialize the map
    const map = L.map("map").setView(coordinates, 13);
  
    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    // Create a custom icon
    const customIcon = L.icon({
      iconUrl: "https://www.openstreetmap.org/assets/marker-green-2de0354ac458a358b9925a8b7f5746324122ff884605073e1ee602fe8006e060.png", // Replace with your icon file path
      iconAnchor: [19, 38], // Point of the icon which will correspond to marker's location
      popupAnchor: [0, -30], // Point from which the popup should open relative to the icon anchor
    });
  
    // Add a marker with the custom icon
    L.marker(coordinates, { icon: customIcon })
      .addTo(map)
      .bindPopup("Lokasi Booth")
      .openPopup();
  
    // Cleanup function
    return () => {
      map.remove(); // Clean up the map instance on unmount
    };
  }, [formData.lokasiBooth]);
  

  const hargaSewa = formData.durasiPenyewaan * 300000;

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
          {formData.fotoKTP && (
            <Image
              src={formData.fotoKTP}
              alt="Foto KTP"
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
      </div>

      {/* Lokasi Booth */}
      <div>
      <label
        htmlFor="lokasiBooth"
        className="block text-sm font-medium text-gray-700 capitalize"
      >
        Lokasi Booth
      </label>
      <div id="map" className=" w-full h-64 z-0 mt-4 border border-gray-300 rounded-md"></div>
      <div className="mt-4 flex items-center">
        <a
          href={`https://www.google.co.id/maps/place/${formData.lokasiBooth}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:underline flex items-center"
        >
          <FiLink className="mr-2" /> Lihat di Google Maps
        </a>
      </div>
      <div>
        <input
          type="text"
          id="lokasiBooth"
          value={formData.lokasiBooth}
          readOnly
          className="bg-background mt-1 block w-full rounded-md border-gray-300 shadow-inner focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-3 py-2"
        />
      </div>
    </div>

      {/* Durasi Penyewaan */}
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

      {/* Harga Sewa */}
      <div>
        <label
          htmlFor="hargaSewa"
          className="block text-sm font-medium text-gray-700 capitalize"
        >
          Harga Sewa
        </label>
        <input
          type="text"
          id="hargaSewa"
          value={hargaSewa}
          readOnly
          className="bg-background mt-1 block w-full rounded-md border-gray-300 shadow-inner focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-3 py-2"
        />
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
