'use client'

import { useState } from 'react'
import { PemantauanBooth } from '@/components/PemantauanBooth'
import { PemantauanBoothCard } from '@/components/PemantauanBoothCard'
import LocationPemantauan from '@/components/LocationPemantauan'
// Define the Booth type
type Booth = {
  id: string
  penyewa: string
  lokasi: string
  status: string
  ktpImage: string
}

const boothData: Booth[] = [
    { id: "1", penyewa: "Bu Warni", lokasi: "Panam", status: "Aktif", ktpImage: "/placeholder.svg?height=200&width=320" },
    { id: "2", penyewa: "Pak Budi", lokasi: "Sukajadi", status: "Menunggak", ktpImage: "/placeholder.svg?height=200&width=320" },
    { id: "3", penyewa: "Ibu Siti", lokasi: "Marpoyan", status: "Aktif", ktpImage: "/placeholder.svg?height=200&width=320" },
    { id: "4", penyewa: "Pak Ahmad", lokasi: "Rumbai", status: "Aktif", ktpImage: "/placeholder.svg?height=200&width=320" },
    { id: "5", penyewa: "Bu Rina", lokasi: "Tampan", status: "Aktif", ktpImage: "/placeholder.svg?height=200&width=320" },
]

export default function PemantauanBisnis() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBooth, setSelectedBooth] = useState<Booth>(boothData[0]) // Use the Booth type here

    const handleDetailClick = (booth: Booth) => {  // Define booth type here
        setSelectedBooth(booth)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="mx-auto p-4 space-y-4 bg-gray-100 h-screen overflow-y-auto pb-32">
            <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-sm font-bold text-gray-800">Total Pendapatan</h2>
                    <p className="text-2xl font-bold text-gray-800">Rp 5.300.000</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-sm font-bold text-gray-800">Booth Disewakan</h2>
                    <p className="text-2xl font-bold text-gray-800">5</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-sm font-bold text-gray-800">Barang terjual</h2>
                    <p className="text-2xl font-bold text-gray-800">5</p>
                </div>
            </div>
            <LocationPemantauan/>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <h2 className='font-bold text-gray-800'>Data Penyewa Booth</h2>
                </div>
                <div className="mt-4">
                    <div className="hidden md:block">
                        <table className="min-w-full table-auto text-black text-left">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">ID Booth</th>
                                    <th className="px-4 py-2 border-b">Penyewa</th>
                                    <th className="px-4 py-2 border-b">Lokasi</th>
                                    <th className="px-4 py-2 border-b">Status</th>
                                    <th className="px-4 py-2 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {boothData.map((booth) => (
                                    <tr key={booth.id}>
                                        <td className="px-4 py-2 border-b">{booth.id}</td>
                                        <td className="px-4 py-2 border-b">{booth.penyewa}</td>
                                        <td className="px-4 py-2 border-b">{booth.lokasi}</td>
                                        <td className="px-4 py-2 border-b">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${booth.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                {booth.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            <button
                                                className="font-bold text-gray-800 bg-transparent border-2 border-gray-800 py-1 px-3 rounded"
                                                onClick={() => handleDetailClick(booth)}
                                            >
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="md:hidden">
                        {boothData.map((booth) => (
                            <PemantauanBoothCard
                                key={booth.id}
                                booth={booth}
                                onDetailClick={() => handleDetailClick(booth)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <PemantauanBooth
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                boothData={{ ...selectedBooth, ktpImage: selectedBooth.ktpImage }}
            />
        </div>
    )
}
