"use client";

import { useState, useEffect } from "react";
import ImageModal from "@/components/ImageModal";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

interface BoothData {
  id_sewa: number;
  mulai_sewa: string;
  akhir_sewa: string;
  lokasi: string;
  booth_id_booth: string;
  durasi: number;
}

const BoothSaya = () => {
  const [data, setData] = useState<BoothData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const biodata = localStorage.getItem("biodata");
      if (!biodata) return;

      try {
        const { nik } = JSON.parse(biodata); // Parse localStorage
        const response = await axios.get(`https://backend-umkm-riau.vercel.app/api/penyewaan/${nik}`);

        if (response.data.success && response.data.data.length > 0) {
          setData(response.data.data[0]);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const mapContainer = document.getElementById("map");
      if (!mapContainer) return;

      const [lat, lng] = data.lokasi.split(",").map(Number);
      const map = L.map("map").setView([lat, lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const markerIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      const marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);
      marker.bindPopup("<b>Booth Anda</b>").openPopup();

      marker.on("click", () => {
        marker.openPopup();
      });

      return () => {
        map.remove(); // Clean up map when component unmounts or data changes
      };
    }
  }, [data]);

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  if (!data) {
    return (
      <div className="fixed mt-12 ml-64 inset-0 z-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Anda tidak sedang melakukan penyewaan</h1>
          <a
            href="/biodata/pengajuan-sewa"
            className="text-primary underline hover:text-primary-dark text-lg"
          >
            Ajukan Sewa Disini
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto p-6 bg-foreground rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-primary mb-6">Informasi booth anda</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: "ID Sewa", value: data.id_sewa },
            { label: "ID Booth", value: data.booth_id_booth },
            { label: "Mulai Sewa", value: new Date(data.mulai_sewa).toLocaleDateString() },
            { label: "Akhir Sewa", value: new Date(data.akhir_sewa).toLocaleDateString() },
          ].map((item, index) => (
            <div key={index} className="flex flex-col border p-4 rounded-lg">
              <label className="font-semibold text-gray-700">{item.label}</label>
              <p className="text-gray-600">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="w-full mb-6">
          <div className="flex flex-col border p-4 rounded-lg">
            <label className="font-semibold text-gray-700">Lokasi</label>
            <p className="text-gray-600">{data.lokasi}</p>
            <div id="map" className="w-full h-64 sm:h-96 mt-4 rounded-lg"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: "Durasi Sewa", value: `${data.durasi} Bulan` },
            { label: "Harga Sewa", value: `Rp. ${(data.durasi * 300000).toLocaleString()}` },
          ].map((item, index) => (
            <div key={index} className="flex flex-col border p-4 rounded-lg">
              <label className="font-semibold text-gray-700">{item.label}</label>
              <p className="text-gray-600">{item.value}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Riwayat Pembayaran</h2>
          <button
            onClick={() => openModal("https://via.placeholder.com/150")}
            className="text-primary underline hover:text-primary-dark"
          >
            Lihat Riwayat Pembayaran
          </button>
        </div>
      </div>

      <ImageModal isOpen={isModalOpen} imageSrc={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default BoothSaya;
