"use client";
import { useState, useEffect } from "react";
import { MdCheckCircle, MdWarning, MdError, MdAddCircle, MdCalendarToday } from "react-icons/md";
import ModalRiwayatKerusakanBooth from "@/components/ModalRiwayatKerusakanBooth";
import ModalTambahRiwayatKerusakanBooth from "@/components/ModalTambahRiwayatKerusakan";

interface BoothCardProps {
    id: string; // Tambahkan ID booth
    boothName: string;
    initialPenyewa: string;
    initialKerusakan: number;
    initialStatus: string;
    riwayat: { tanggal: string; deskripsi: string }[];
    onAddRiwayat: (newRiwayat: { tanggal: string; deskripsi: string }) => void;
    refetchData: () => void;
}

export default function BoothCard({
    id, // Pastikan id diteruskan
    boothName,
    initialPenyewa,
    initialKerusakan,
    initialStatus,
    riwayat,
    onAddRiwayat,
    refetchData,
}: BoothCardProps) {
    const [penyewa, setPenyewa] = useState<string | null>(initialPenyewa);
    const [status, setStatus] = useState(initialStatus);
    const [newRiwayat, setNewRiwayat] = useState({ tanggal: "", deskripsi: "" });


    // Modal Hapus Penyewa
    const [isModalHapusPenyewa, setIsModalHapusPenyewa] = useState(false);
    const openModalHapusPenyewa = () => setIsModalHapusPenyewa(true);
    const closeModalHapusPenyewa = () => setIsModalHapusPenyewa(false);

    // Modal Riwayat Kerusakan
    const [isModalRiwayatKerusakanOpen, setIsModalRiwayatKerusakanOpen] = useState(false);
    const openModalRiwayatKerusakan = () => setIsModalRiwayatKerusakanOpen(true);
    const closeModalRiwayatKerusakan = () => setIsModalRiwayatKerusakanOpen(false);

    // Modal Tambah Riwayat Kerusakan
    const [isModalTambahRiwayatKerusakanOpen, setIsModalTambahRiwayatKerusakanOpen] = useState(false);
    const openModalTambahRiwayatKerusakan = () => setIsModalTambahRiwayatKerusakanOpen(true);
    const closeModalTambahRiwayatKerusakan = () => setIsModalTambahRiwayatKerusakanOpen(false);

    useEffect(() => {
        setStatus(initialStatus);
    }, [initialStatus]);

    useEffect(() => {
        setPenyewa(initialPenyewa);
    }, [initialPenyewa]);

    useEffect(() => {
        console.log("Current status:", status); // Debugging
    }, [status]);



    const mapStatus = {
        "tidak disewa": "TIDAK DISEWA",
        "disewa": "DISEWA",
        "rusak": "RUSAK",
    };

    const handleTambahRiwayat = async () => {
        try {
            // Tambahkan riwayat baru ke array yang sudah ada
            const updatedRiwayat = [
                ...riwayat,
                {
                    tanggal: new Date().toISOString(), // Set tanggal sekarang
                    deskripsi: newRiwayat.deskripsi,
                },
            ];

            // Gabungkan riwayat menjadi format string sesuai kebutuhan backend
            const riwayatString = updatedRiwayat
                .map((item, index) => `${index + 1}. ${item.deskripsi}`)
                .join(" ");

            // Siapkan payload data
            const payload = {
                id_booth: id, // Menggunakan ID dari props
                ukuran: "3x4 meter",
                status: status.toUpperCase(),
                harga_sewa: "50000",
                riwayat_kerusakan: riwayatString,
            };

            // Kirim PUT request ke backend
            const response = await fetch(`https://backend-umkm-riau.vercel.app/api/booth/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error dari backend:", errorData);
                throw new Error("Gagal menambahkan riwayat kerusakan.");
            }

            const data = await response.json();
            console.log("Riwayat kerusakan berhasil diperbarui:", data);

            // Reset input riwayat baru
            setNewRiwayat({ tanggal: "", deskripsi: "" });

            // Tutup modal
            closeModalTambahRiwayatKerusakan();

            // Refetch data untuk memperbarui tampilan
            refetchData();
        } catch (error) {
            console.error("Terjadi kesalahan:", error.message);
        }
    };


    // Penentuan warna berdasarkan status
    const cardColor =
        status === "tidak disewa" ? "border-primary" : status === "rusak" ? "border-yellow-500" : "border-red-500";

    const divColor =
        status === "tidak disewa" ? "bg-primary" : status === "rusak" ? "bg-yellow-500" : "bg-red-500";

    // Fungsi untuk menghapus penyewa
    const handleHapusPenyewa = async () => {
        const newStatus = status === "rusak" ? "rusak" : "tidak disewa";
        setPenyewa(null);
        setStatus(newStatus);
        await updateStatus(newStatus);
    };

    // Fungsi untuk menandai rusak
    const handleTandaiRusak = async () => {
        const newStatus = mapStatus["rusak"];
        setStatus(newStatus);
        await updateStatus(newStatus);
    };

    // Fungsi untuk menandai sudah diperbaiki
    const handleTandaiSudahDiperbaiki = async () => {
        const newStatus = penyewa ? "disewa" : "tidak disewa";
        setStatus(newStatus);
        await updateStatus(newStatus);
    };

    const updateStatus = async (newStatus) => {
        const payload = {
            id_booth: id,
            ukuran: "3x4 meter",
            status: newStatus,
            harga_sewa: "50000",
            riwayat_kerusakan: riwayat.map((item, index) => `${index + 1}. ${item.deskripsi}`).join(" "),
        };

        try {
            const response = await fetch(`https://backend-umkm-riau.vercel.app/api/booth/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error dari backend:", errorData);
                throw new Error("Gagal memperbarui status di backend");
            }

            const data = await response.json();
            console.log("Status berhasil diperbarui:", data);

            // Fetch ulang data setelah status diubah
            refetchData();
        } catch (error) {
            console.error("Error saat memperbarui status:", error.message);
        }
    };


    return (
        <div className={`rounded-lg shadow-md w-full border pb-3 bg-white ${cardColor}`}>
            <ModalRiwayatKerusakanBooth
                isOpen={isModalRiwayatKerusakanOpen}
                onClose={closeModalRiwayatKerusakan}
                riwayat={riwayat} // Pass riwayat to Modal
            />
            <ModalTambahRiwayatKerusakanBooth
                isOpen={isModalTambahRiwayatKerusakanOpen}
                onClose={closeModalTambahRiwayatKerusakan}
                newRiwayat={newRiwayat}
                setNewRiwayat={setNewRiwayat}
                onTambahRiwayat={handleTambahRiwayat}
            />
            

            <div className={`${divColor} rounded-t-lg w-full justify-between flex px-4 py-2`}>
                <h3 className="text-lg font-bold">{boothName}</h3>
                <div className="rounded-lg px-2 items-center flex justify-center border border-white">
                    {status === "tidak disewa" && <MdCheckCircle size={24} color="white" />}
                    {status === "rusak" && <MdWarning size={24} color="white" />}
                    {status === "disewa" && <MdError size={24} color="white" />}
                </div>
            </div>
            <div className="gap-2 ml-4">
                <p className="text-black">{penyewa ? `Penyewa: ${penyewa}` : "Tidak ada penyewa"}</p>
                <p className="text-black">Riwayat Kerusakan: {initialKerusakan}</p>
            </div>
            <div className="mt-4 ml-3 gap-3 w-full flex flex-col items-start">
                <button
                    className="bg-white border flex flex-row items-center justify-center border-primary text-black py-1 px-3 rounded-lg group hover:bg-primary hover:text-white"
                    onClick={openModalRiwayatKerusakan}
                >
                    <MdCalendarToday size={16} className="mr-2" />
                    Lihat Riwayat
                </button>

                <div className="flex flex-row gap-3">
                    <button
                        className="bg-white border flex flex-row items-center justify-center border-primary text-black py-1 px-3 rounded-lg group hover:bg-primary hover:text-white"
                        onClick={openModalTambahRiwayatKerusakan}
                    >
                        <MdAddCircle size={16} className="mr-2" />
                        Tambah Riwayat
                    </button>

                    {(status === "tidak disewa" || status === "disewa") && (
                        <button
                            className="bg-yellow-500 text-white flex flex-row items-center py-1 px-3 rounded-lg hover:bg-yellow-600"
                            onClick={handleTandaiRusak}
                        >
                            Tandai Rusak
                        </button>
                    )}
                </div>
                {status === "rusak" && (
                    <button
                        className="bg-white rounded-lg border text-yellow-500 hover:text-white border-yellow-500 py-1 px-3 hover:bg-yellow-500"
                        onClick={handleTandaiSudahDiperbaiki}
                    >
                        Tandai Sudah Diperbaiki
                    </button>
                )}
                {(status === "disewa" || (status === "rusak" && penyewa)) && (
                    <button
                        className="bg-red-600 py-1 px-3 rounded-lg hover:bg-red-700"
                        onClick={openModalHapusPenyewa}
                    >
                        Hapus Penyewa
                    </button>
                )}
                {isModalHapusPenyewa && (
                    <div className="fixed flex inset-0 items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="relative flex flex-col w-full max-w-md p-6 bg-white animate-popup rounded-lg shadow-lg">
                            <button className="absolute right-3 top-3 text-black" onClick={closeModalHapusPenyewa}>
                                X
                            </button>
                            <h2 className="text-xl font-semibold text-center text-black">Hapus Penyewa</h2>
                            <p className="text-abu text-center">Anda Yakin Ingin Menghapus Penyewa?</p>
                            <div className="flex justify-between mt-6">
                                <button
                                    className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                                    onClick={closeModalHapusPenyewa}
                                >
                                    Batal
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                    onClick={() => {
                                        handleHapusPenyewa();
                                        closeModalHapusPenyewa();
                                    }}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
