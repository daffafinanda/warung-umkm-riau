"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/navigation";
import L from "leaflet";

// Custom Marker Icon
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

const Biodata: React.FC = () => {
  const [formData, setFormData] = useState({
    durasi: "",
    harga: 0,
    lokasi: "",
    coordinates: { lat: 0.5206, lng: 101.4472 }, // Pekanbaru, Riau coordinates
  });

  const router = useRouter();
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const steps = [
    { name: "Login", status: "completed" as const },
    { name: "Data Diri", status: "completed" as const },
    { name: "Pengajuan", status: "current" as const },
    { name: "Proses Survey", status: "upcoming" as const },
    { name: "Pembayaran", status: "upcoming" as const },
  ];

  // Update harga berdasarkan durasi
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      harga: prev.durasi ? Number(prev.durasi) * 300000 : 0,
    }));
  }, [formData.durasi]);

  const validateForm = () => {
    const emptyFields: string[] = [];
    for (const key in formData) {
      if (formData[key as keyof typeof formData] === "") {
        emptyFields.push(key);
      }
    }
    setErrorFields(emptyFields);
    return emptyFields.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form is invalid!");
      return;
    }
    router.push("/pelanggan/pengajuan-sewa");
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFormData((prev) => ({
          ...prev,
          lokasi: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
          coordinates: { lat, lng },
        }));
      },
    });
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Breadcrumb */}
      <nav
        className="text-sm mb-4 max-w-4xl mx-auto text-black"
        aria-label="Breadcrumb"
      >
        <ol className="list-none p-0 inline-flex">
          <li className="text-primary">/ Data Penyewa</li>
        </ol>
      </nav>

      {/* Step Progress */}
      <div className="max-w-4xl p-4 md:p-0 mx-auto justify-center items-center">
        <ProgressBar steps={steps} />
      </div>

      <div className="max-w-4xl h-fit mx-auto bg-white shadow-lg rounded-lg text-black p-6">
        <h1 className="text-2xl font-bold text-primary text-center mb-4">
          Pengajuan Sewa Booth
        </h1>
        <form className="space-y-4 h-full" onSubmit={handleSubmit}>
          {/* Lokasi */}
          <div>
            <label
              htmlFor="lokasi"
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              Lokasi <span className="text-red-500">*</span>
            </label>
            <div className="h-64 mb-4">
              {/* Map */}
              <MapContainer
                center={[formData.coordinates.lat, formData.coordinates.lng]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full rounded-lg"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    formData.coordinates.lat,
                    formData.coordinates.lng,
                  ]}
                  icon={markerIcon}
                />
                <MapEvents />
              </MapContainer>
            </div>
            <input
              type="text"
              id="lokasi"
              value={formData.lokasi}
              placeholder="Klik pada peta untuk memilih lokasi"
              readOnly
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
                errorFields.includes("lokasi")
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errorFields.includes("lokasi") && (
              <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>
            )}
          </div>

          {/* Durasi dan Harga */}
          <div className="flex gap-4">
            {/* Durasi */}
            <div className="w-1/2">
              <label
                htmlFor="durasi"
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                Durasi (bulan) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="durasi"
                value={formData.durasi}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 2) {
                    setFormData({ ...formData, durasi: value });
                  }
                }}
                className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
                  errorFields.includes("durasi")
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errorFields.includes("durasi") && (
                <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>
              )}
            </div>

            {/* Harga */}
            <div className="w-1/2">
              <label
                htmlFor="harga"
                className="block text-sm font-medium text-gray-700 capitalize"
              >
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

          {/* Submit Button */}
          <div className="text-center mt-6 w-full">
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:opacity-40  text-white w-full font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50"
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
