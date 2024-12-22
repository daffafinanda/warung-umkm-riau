'use client';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { FiLoader } from 'react-icons/fi';
import L from 'leaflet';

interface Location {
    id: string;
    name: string;
    lat: number;
    lng: number;
    status: 'Aktif' | 'Menunggak';
}

// Data lokasi booth
const boothLocations: Location[] = [
    { id: '1', name: 'Bu Warni', lat: 0.4547, lng: 101.3824, status: 'Aktif' },
    { id: '2', name: 'Booth 2', lat: 0.4637, lng: 101.3900, status: 'Menunggak' },
    { id: '3', name: 'Booth 3', lat: 0.4727, lng: 101.3850, status: 'Aktif' },
    { id: '4', name: 'Booth 4', lat: 0.4547, lng: 101.3924, status: 'Aktif' },
    { id: '5', name: 'Booth 5', lat: 0.4637, lng: 101.3800, status: 'Aktif' },
];

// Properly set custom icon URLs without modifying _getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function LocationMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // Initialize map
        const map = L.map(mapRef.current).setView([0.4547, 101.3824], 14);
        mapInstanceRef.current = map;

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add marker for each location with custom icons
        boothLocations.forEach((location) => {
            const iconUrl = location.status === 'Aktif'
                ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDgwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tYXAtcGluLWNoZWNrIj48cGF0aCBkPSJNMTkuNDMgMTIuOTM1Yy4zNTctLjk2Ny41Ny0xLjk1NS41Ny0yLjkzNWE4IDggMCAwIDAtMTYgMGMwIDQuOTkzIDUuNTM5IDEwLjE5MyA3LjM5OSAxMS43OTlhMSAxIDAgMCAwIDEuMjAyIDAgMzIuMTk3IDMyLjE5NyAwIDAgMCAuODEzLS43MjgiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PHBhdGggZD0ibTE2IDE4IDIgMiA0LTR2MSIvPjwvc3ZnPg=='
                : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4QjAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tYXAtcGluLXgiPjxwYXRoIGQ9Ik0xOS43NTIgMTEuOTAxQTcuNzggNy43OCAwIDAgMCAyMCAxMGE4IDggMCAwIDAtMTYgMGMwIDQuOTkzIDUuNTM5IDEwLjE5MyA3LjM5OSAxMS43OTlhMSAxIDAgMCAwIDEuMjAyIDAgMTkgMTkgMCAwIDAgLjA5LS4wNzcgIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjxwYXRoIGQ9Im0yMS41IDE1LjUtNSA1Ii8+PHBhdGggZD0ibTIxLjUgMjAuNS01LTUiLz48L3N2Zz4='
            const customIcon = L.icon({
                iconUrl,
                iconSize: [30, 30], // Adjust size as needed
                iconAnchor: [15, 30], // Center the icon
                popupAnchor: [0, -30], // Adjust popup position
            });

            const marker = L.marker([location.lat, location.lng], {
                icon: customIcon,
            }).addTo(map);

            // Add popup to marker
            marker.bindPopup(`
                <div class="p-2">
                    <h3 class="font-semibold">${location.name}</h3>
                    <p class="text-sm">Status: ${location.status}</p>
                </div>
            `);
        });

        // Resize map when window is resized
        const handleResize = () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.invalidateSize();
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            // Clean up the map instance and event listeners
            map.remove();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-full bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Lokasi Barang di Sewa</h2>
            </div>
            <div className="p-4">
                <div className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden -z-0">
                    <div ref={mapRef} className="w-full h-full" />
                    {!mapInstanceRef.current && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                            <FiLoader className="w-6 h-6 animate-spin" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(LocationMap), { ssr: false });
