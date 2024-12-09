"use client";
import { useState } from "react";
import BoothCard from "@/components/BoothCard";

const dummyBooths = [
    {
        boothName: "Booth A",
        initialPenyewa: "John Doe",
        initialKerusakan: 2,
        initialStatus: "terisi",
        riwayat: [
            { tanggal: "2024-02-02", deskripsi: "Kerusakan pada bagian dinding" },
            { tanggal: "2024-03-15", deskripsi: "Kerusakan pada sistem listrik" },
        ],
    },
    {
        boothName: "Booth B",
        initialPenyewa: "",
        initialKerusakan: 3,
        initialStatus: "rusak",
        riwayat: [
            { tanggal: "2024-01-12", deskripsi: "Kerusakan pada engsel pintu" },
        ],
    },
    {
        boothName: "Booth C",
        initialPenyewa: "Jane Smith",
        initialKerusakan: 0,
        initialStatus: "terisi",
        riwayat: [],
    },
    {
        boothName: "Booth D",
        initialPenyewa: "",
        initialKerusakan: 0,
        initialStatus: "kosong",
        riwayat: [],
    },
];

export default function Page() {
    const [booths, setBooths] = useState(dummyBooths);

    // Function to handle adding a new riwayat to a specific booth
    const handleAddRiwayat = (boothIndex: number, newRiwayat: { tanggal: string; deskripsi: string }) => {
        const updatedBooths = [...booths];
        updatedBooths[boothIndex].riwayat.push(newRiwayat); // Add the new riwayat to the correct booth
        setBooths(updatedBooths); // Update state with the new riwayat
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {booths.map((booth, index) => (
                <BoothCard
                    key={index}
                    boothName={booth.boothName}
                    initialPenyewa={booth.initialPenyewa}
                    initialKerusakan={booth.initialKerusakan}
                    initialStatus={booth.initialStatus}
                    riwayat={booth.riwayat} // Pass riwayat to BoothCard
                    onAddRiwayat={(newRiwayat) => handleAddRiwayat(index, newRiwayat)} // Pass handler to BoothCard
                />
            ))}
        </div>
    );
}
