'use client'

import { useState } from 'react'
// import { LocationMap } from '@/components/Location'
import { BoothItem } from '@/components/PemantauanBoothCard'
import { PemantauanBooth } from '@/components/PemantauanBooth'

const boothData = [
    { id: "1", penyewa: "Bu Warni", lokasi: "Panam", status: "Aktif", ktpImage: "/placeholder.svg?height=200&width=320" },
    { id: "2", penyewa: "Pak Budi", lokasi: "Sukajadi", status: "Menunggak", ktpImage: "/placeholder.svg?height=200&width=320" },
    { id: "3", penyewa: "Ibu Siti", lokasi: "Marpoyan", status: "Aktif", ktpImage: "/placeholder.svg?height=200&width=320" },
    { id: "4", penyewa: "Pak Ahmad", lokasi: "Rumbai", status: "Aktif", ktpImage: "/placeholder.svg?height=200&width=320" },
    { id: "5", penyewa: "Bu Rina", lokasi: "Tampan", status: "Aktif", ktpImage: "/placeholder.svg?height=200&width=320" },
]

export default function PemantauanBisnis() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBooth, setSelectedBooth] = useState(boothData[0])

    const handleDetailClick = (booth) => {
        setSelectedBooth(booth)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="mx-auto p-4 space-y-4 bg-gray-100 h-full overflow-y-auto pb-32">
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

            {/* <LocationMap /> */}

            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <h2 className='font-bold text-gray-800'>Data Penyewa Booth</h2>
                </div>
                <div className="mt-4">
                    <div className="hidden md:block text-black">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b text-left">ID Booth</th>
                                    <th className="px-4 py-2 border-b text-left">Penyewa</th>
                                    <th className="px-4 py-2 border-b text-left">Lokasi</th>
                                    <th className="px-4 py-2 border-b text-left">Status</th>
                                    <th className="px-4 py-2 border-b text-left"></th>
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
                            <BoothItem
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
