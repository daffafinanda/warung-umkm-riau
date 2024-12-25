'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { PemantauanBooth } from '@/components/PemantauanBooth'
import { PemantauanBoothCard } from '@/components/PemantauanBoothCard'
import LocationPemantauan from '@/components/LocationPemantauan'

// Define the Booth type
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
    penyewa_nama?: string // To store the name after fetching
    kecamatan?: string // To store the district name after geocoding
}

export default function PemantauanBisnis() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null)
    const [boothData, setBoothData] = useState<Booth[]>([])
    const [rentedBoothCount, setRentedBoothCount] = useState(0)
    const [soldItemsCount, setSoldItemsCount] = useState(0)

    // Fetch the name for a given biodata_nik
    const fetchBiodataName = async (biodata_nik: string) => {
        try {
            const response = await axios.get(`https://backend-umkm-riau.vercel.app/api/biodata/nik/${biodata_nik}`)
            if (response.data.success && response.data.data) {
                return response.data.data.nama // assuming the response contains 'nama'
            }
        } catch (error) {
            console.error("Error fetching biodata:", error)
        }
        return null
    }

    // Fetch address (district) from coordinates using OpenStreetMap Nominatim API
    // Fetch address (district) from coordinates using OpenStreetMap Nominatim API
    const fetchKecamatanFromCoordinates = async (latitude: number, longitude: number) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            )
            console.log("OpenStreetMap Response:", response.data); // Log untuk memeriksa struktur lengkap

            if (response.data && response.data.address) {
                const address = response.data.address;
                console.log("Address Data:", address); // Log untuk melihat data alamat

                // Prioritaskan 'district' atau 'city_district'
                const district =
                    address['district'] || // Mencari 'district' terlebih dahulu
                    address['city_district'] || // Jika tidak ada, coba 'city_district'
                    address['municipality'] || // Jika tidak ada, coba 'municipality'
                    address['administrative_area_level_2'] || // Terakhir, coba 'administrative_area_level_2'
                    'Unknown District';  // Jika semuanya gagal, kembalikan 'Unknown District'

                return district;
            } else {
                return 'Unknown District';  // Jika address tidak ada
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            return 'Unknown District'; // Jika terjadi error, kembalikan 'Unknown District'
        }
    }




    const handleDetailClick = (booth: Booth) => {
        setSelectedBooth(booth)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }



    useEffect(() => {
        // Fetch rented booth count and booth data
        const fetchBoothData = async () => {
            try {
                const response = await axios.get('https://backend-umkm-riau.vercel.app/api/penyewaan')
                if (response.data.success && response.data.data) {
                    // Filter booths with status "DISETUJUI"
                    const approvedBooths = response.data.data.filter((booth: any) => booth.status === 'DISETUJUI')

                    // Fetch name and district for each booth
                    const boothsWithNamesAndDistricts = await Promise.all(approvedBooths.map(async (booth: any) => {
                        const name = await fetchBiodataName(booth.biodata_nik)

                        // Parse coordinates from the "lokasi" field (which is a string in the form of "latitude,longitude")
                        const [latitude, longitude] = booth.lokasi.split(',').map(coord => parseFloat(coord))

                        // Fetch the district (kecamatan) from coordinates using reverse geocoding
                        const kecamatan = await fetchKecamatanFromCoordinates(latitude, longitude)

                        return { ...booth, penyewa_nama: name || 'Unknown', kecamatan }
                    }))

                    setBoothData(boothsWithNamesAndDistricts) // Set booths with names and districts
                    setRentedBoothCount(boothsWithNamesAndDistricts.length) // Set rented booth count
                }
            } catch (error) {
                console.error("Error fetching booth data:", error)
            }
        }

        // Fetch sold items count
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
                    <h2 className="text-sm font-bold text-gray-800">Barang terjual</h2>
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
                    boothData={{ ...selectedBooth, ktpImage: "/placeholder.svg?height=200&width=320" }}
                />
            )}
        </div>
    )
}
