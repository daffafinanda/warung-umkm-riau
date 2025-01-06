// components/Map.tsx
"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  coordinates: { lat: number; lng: number };
  onLocationSelect: (lat: number, lng: number) => void;
}

const Map: React.FC<MapProps> = ({ coordinates, onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([coordinates.lat, coordinates.lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapInstance.current);

      const customIcon = L.icon({
        iconUrl: "https://www.openstreetmap.org/assets/marker-green-2de0354ac458a358b9925a8b7f5746324122ff884605073e1ee602fe8006e060.png",
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      markerRef.current = L.marker([coordinates.lat, coordinates.lng], { icon: customIcon })
        .addTo(mapInstance.current);

      mapInstance.current.on("click", (e) => {
        const { lat, lng } = e.latlng;
        markerRef.current?.setLatLng([lat, lng]);
        onLocationSelect(lat, lng);
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [coordinates, onLocationSelect]);

  return <div ref={mapRef} style={{ height: "300px" }} />;
};

export default Map;