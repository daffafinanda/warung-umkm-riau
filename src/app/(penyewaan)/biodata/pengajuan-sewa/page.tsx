"use client";

import React, { useState, useEffect, useRef } from "react";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Biodata: React.FC = () => {
  const [formData, setFormData] = useState<{
    durasi: string;
    harga: number;
    lokasi: string;
    coordinates: { lat: number; lng: number };
  }>({
    durasi: "",
    harga: 0,
    lokasi: "",
    coordinates: { lat: 0.5206, lng: 101.4472 },
  });

  const mapRef = useRef<HTMLDivElement | null>(null); // Reference to the map container
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const router = useRouter();

  const steps = [
    { name: "Login", status: "completed" as const },
    { name: "Data Diri", status: "completed" as const },
    { name: "Pengajuan", status: "current" as const },
    { name: "Proses Survey", status: "upcoming" as const },
    { name: "Pembayaran", status: "upcoming" as const },
  ];

  const mapInstance = useRef<L.Map | null>(null); // Store map instance

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([formData.coordinates.lat, formData.coordinates.lng], 13);
  
      // Tambahkan tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapInstance.current);
  
      // Definisikan ikon khusus
      const customIcon = L.icon({
        iconUrl: "https://www.openstreetmap.org/assets/marker-green-2de0354ac458a358b9925a8b7f5746324122ff884605073e1ee602fe8006e060.png", // Ganti dengan path ikon Anda
  
        iconAnchor: [16, 32], // Titik jangkar (biasanya bagian bawah tengah)
        popupAnchor: [0, -32], // Titik jangkar popup
      });
  
      // Tambahkan marker dengan ikon khusus
      const marker = L.marker([formData.coordinates.lat, formData.coordinates.lng], { icon: customIcon }).addTo(mapInstance.current);
  
      // Event untuk memindahkan marker
      marker.on("moveend", () => {
        const latlng = marker.getLatLng();
        setFormData({
          ...formData,
          coordinates: { lat: latlng.lat, lng: latlng.lng },
          lokasi: `Lat: ${latlng.lat}, Lng: ${latlng.lng}`,
        });
      });
  
      // Event untuk klik pada peta
      mapInstance.current.on("click", (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setFormData({
          ...formData,
          coordinates: { lat, lng },
          lokasi: `Lat: ${lat}, Lng: ${lng}`,
        });
      });
    }
  }, [formData.coordinates]);
  

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      harga: prev.durasi ? Number(prev.durasi) * 300000 : 0,
    }));
  }, [formData.durasi]);

  const validateForm = () => {
    const emptyFields: string[] = [];
    if (!formData.durasi) emptyFields.push("durasi");
    if (!formData.lokasi) emptyFields.push("lokasi");

    setErrorFields(emptyFields);
    return emptyFields.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form is invalid!");
      return;
    }

    const biodata = localStorage.getItem('biodata');

    if (!biodata) {
      console.error("Biodata not found in localStorage");
      return;
    }

    try {
      const parsedBiodata = JSON.parse(biodata);

      if (parsedBiodata.success && parsedBiodata.data && parsedBiodata.data.nik) {
        const biodata_nik = parsedBiodata.data.nik;

        const data = {
          id_sewa: "Sewa001",
          biodata_nik,
          durasi: formData.durasi,
          lokasi: formData.lokasi,
        };

        const response = await fetch("https://backend-umkm-riau.vercel.app/api/penyewaan", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log("Permintaan penyewaan berhasil diajukan!");
          router.push('/pelanggan/pengajuan-sewa');
        } else {
          console.error("Gagal mengajukan permintaan penyewaan");
        }
      } else {
        console.error("NIK not found in biodata or biodata is invalid");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="text-sm mb-4 max-w-4xl mx-auto text-black" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="text-primary">/ Data Penyewa</li>
        </ol>
      </nav>

      <div className="max-w-4xl p-4 md:p-0 mx-auto justify-center items-center">
        <ProgressBar steps={steps} />
      </div>

      <div className="max-w-4xl h-fit mx-auto bg-white shadow-lg rounded-lg text-black p-6">
        <h1 className="text-2xl font-bold text-primary text-center mb-4">Pengajuan Sewa Booth</h1>
        <form className="space-y-4 h-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 capitalize">
              Lokasi <span className="text-red-500">*</span>
            </label>
            <div style={{ height: "300px" }} ref={mapRef}></div>
            <input
              type="text"
              id="lokasi"
              value={formData.lokasi}
              placeholder="Lokasi"
              onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
                errorFields.includes("lokasi") ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errorFields.includes("lokasi") && (
              <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="durasi" className="block text-sm font-medium text-gray-700 capitalize">
                Durasi (bulan) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="durasi"
                value={formData.durasi}
                onChange={(e) => setFormData({ ...formData, durasi: e.target.value })}
                className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
                  errorFields.includes("durasi") ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errorFields.includes("durasi") && (
                <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>
              )}
            </div>
            <div className="w-1/2">
              <label htmlFor="harga" className="block text-sm font-medium text-gray-700 capitalize">
                Harga
              </label>
              <input
                type="text"
                id="harga"
                value={`Rp. ${formData.harga.toLocaleString("id-ID")}`}
                readOnly
                className="bg-gray-200 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 border-gray-300"
              />
            </div>
          </div>
          <div className="text-center mt-6 w-full">
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:opacity-40 text-white w-full font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50"
            >
              Ajukan Sewa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Biodata;
