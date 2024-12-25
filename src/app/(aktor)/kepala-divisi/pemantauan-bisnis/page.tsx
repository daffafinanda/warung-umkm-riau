'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { PemantauanBooth } from '@/components/PemantauanBooth'
import { PemantauanBoothCard } from '@/components/PemantauanBoothCard'
import LocationPemantauan from '@/components/LocationPemantauan'

type Booth = {
    id_sewa: string
    mulai_sewa: string | null
    akhir_sewa: string | null
    permintaan_dibuat: string
    lokasi: string // Koordinat "latitude,longitude"
    status: string
    booth_id_booth: string | null
    biodata_nik: string
    durasi: number
    penyewa_nama?: string
    kecamatan?: string
}

export default function PemantauanBisnis() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null)
    const [boothData, setBoothData] = useState<Booth[]>([])
    const [rentedBoothCount, setRentedBoothCount] = useState(0)
    const [soldItemsCount, setSoldItemsCount] = useState(0)

    const fetchBiodataName = async (biodata_nik: string) => {
        try {
            const response = await axios.get(`https://backend-umkm-riau.vercel.app/api/biodata/nik/${biodata_nik}`)
            return response.data.success ? response.data.data.nama : null
        } catch (error) {
            console.error("Error fetching biodata:", error)
            return null
        }
    }

    const fetchKecamatanFromCoordinates = async (latitude: number, longitude: number) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            )
            const address = response.data?.address || {}
            return address.district || address.city_district || address.municipality || address.administrative_area_level_2 || 'Unknown District'
        } catch (error) {
            console.error("Error fetching address:", error)
            return 'Unknown District'
        }
    }

    const handleDetailClick = async (booth: Booth) => {
        setSelectedBooth(null); // Reset state
        setIsModalOpen(true); // Open modal

        try {
            const response = await axios.get(
                `https://backend-umkm-riau.vercel.app/api/pemantauan-bisnis/all/${booth.booth_id_booth}`
            );
            if (response.data.success && response.data.data.length > 0) {
                const detail = response.data.data[0];

                // Format data sesuai props PemantauanBooth
                const formattedBooth = {
                    id: booth.booth_id_booth || 'Unknown',
                    penyewa: detail.nama || 'Unknown',
                    lokasi: detail.lokasi || 'Unknown',
                    status: booth.status || 'Unknown',
                    ktpImage: detail.foto_ktp || '/placeholder.svg?height=200&width=320',
                    no_hp: detail.no_hp || 'Unknown',
                    alamat_domisili: detail.alamat_domisili || 'Unknown',
                    nik: detail.nik || 'Unknown',
                    jenis_kelamin: detail.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan',
                    awal_penyewaan: new Date(detail.awal_penyewaan).toLocaleDateString() || 'Unknown',
                    akhir_penyewaan: new Date(detail.akhir_penyewaan).toLocaleDateString() || 'Unknown',
                    riwayat_pembayaran: detail.riwayat_pembayaran || 'Unknown',
                    riwayat_kerusakan: detail.riwayat_kerusakan || 'Unknown',
                };

                setSelectedBooth(formattedBooth); // Set selected booth to show in modal
            }
        } catch (error) {
            console.error("Error fetching booth details:", error);
        }
    };









    const handleCloseModal = () => setIsModalOpen(false)

    useEffect(() => {
        const fetchBoothData = async () => {
            try {
                const response = await axios.get('https://backend-umkm-riau.vercel.app/api/penyewaan')
                if (response.data.success && response.data.data) {
                    const approvedBooths = response.data.data.filter((booth: any) => booth.status === 'DISETUJUI')
                    const boothsWithDetails = await Promise.all(
                        approvedBooths.map(async (booth: any) => {
                            const name = await fetchBiodataName(booth.biodata_nik)
                            const [latitude, longitude] = booth.lokasi.split(',').map(coord => parseFloat(coord))
                            const kecamatan = await fetchKecamatanFromCoordinates(latitude, longitude)
                            return { ...booth, penyewa_nama: name || 'Unknown', kecamatan }
                        })
                    )
                    setBoothData(boothsWithDetails)
                    setRentedBoothCount(boothsWithDetails.length)
                }
            } catch (error) {
                console.error("Error fetching booth data:", error)
            }
        }

        const fetchSoldItemsData = async () => {
            try {
                const response = await axios.get('https://backend-umkm-riau.vercel.app/api/produk')
                if (response.data.success && response.data.data) {
                    setSoldItemsCount(response.data.data.totalJumlah)
                }
            } catch (error) {
                console.error("Error fetching sold items data:", error)
            }
        }

        fetchBoothData()
        fetchSoldItemsData()
    }, [])

    return (
        <div className="mx-auto p-4 space-y-4 bg-gray-100 h-screen overflow-y-auto pb-32">
            <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-sm font-bold text-gray-800">Total Pendapatan</h2>
                    <p className="text-2xl font-bold text-gray-800">Rp 5.300.000</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-sm font-bold text-gray-800">Booth Disewakan</h2>
                    <p className="text-2xl font-bold text-gray-800">{rentedBoothCount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-sm font-bold text-gray-800">Barang Terjual</h2>
                    <p className="text-2xl font-bold text-gray-800">{soldItemsCount}</p>
                </div>
            </div>
            <LocationPemantauan />
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
                                    <th className="px-4 py-2 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {boothData.map((booth) => (
                                    <tr key={booth.id_sewa}>
                                        <td className="px-4 py-2 border-b">{booth.booth_id_booth}</td>
                                        <td className="px-4 py-2 border-b">{booth.penyewa_nama || booth.biodata_nik}</td>
                                        <td className="px-4 py-2 border-b">{booth.kecamatan || 'Unknown'}</td>
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
                                key={booth.id_sewa}
                                booth={booth}
                                onDetailClick={() => handleDetailClick(booth)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {selectedBooth && (
                <PemantauanBooth
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    boothData={selectedBooth} // Pass the booth data to the modal
                />
            )}
        </div>
    )
}
