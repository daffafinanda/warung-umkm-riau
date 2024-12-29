"use client";
import { useState, useEffect } from "react";
import { MdCheckCircle, MdWarning, MdError, MdAddCircle, MdCalendarToday } from "react-icons/md";
import ModalRiwayatKerusakanBooth from "@/components/ModalRiwayatKerusakanBooth";
import ModalTambahRiwayatKerusakanBooth from "@/components/ModalTambahRiwayatKerusakan";
import { useModal } from "./ModalContext";

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
    const { showError, showNotification } = useModal();

    const [riwayatKerusakan, setRiwayatKerusakan] = useState([]);
    const [isLoadingRiwayat, setIsLoadingRiwayat] = useState(false);


    // Modal Riwayat Kerusakan
    const [isModalRiwayatKerusakanOpen, setIsModalRiwayatKerusakanOpen] = useState(false);
    // Modal Riwayat Kerusakan
    const openModalRiwayatKerusakan = async () => {
        setIsLoadingRiwayat(true);
        try {
            const response = await fetch(`https://backend-umkm-riau.vercel.app/api/kerusakan/${id}`);
            if (!response.ok) {
                throw new Error("Gagal mengambil data riwayat kerusakan");
            }
            const data = await response.json();
            if (data.success) {
                const riwayatKerusakan = data.data.map((item) => ({
                    id: item.id,
                    tanggal: item.tanggal_kerusakan.split("T")[0],
                    deskripsi: item.riwayat_kerusakan,
                }));
                setRiwayatKerusakan(riwayatKerusakan);
            } else {
                console.error("Response tidak berhasil:", data);
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error.message);
        } finally {
            setIsLoadingRiwayat(false);
            setIsModalRiwayatKerusakanOpen(true);
        }
    };

    useEffect(() => {
        // Ambil riwayat kerusakan saat komponen pertama kali dimuat
        const fetchRiwayatKerusakan = async () => {
            setIsLoadingRiwayat(true);
            try {
                const response = await fetch(`https://backend-umkm-riau.vercel.app/api/kerusakan/${id}`);
                if (!response.ok) {
                    throw new Error("Gagal mengambil data riwayat kerusakan");
                }
                const data = await response.json();
                if (data.success) {
                    const riwayatKerusakan = data.data.map((item) => ({
                        id: item.id,
                        tanggal: item.tanggal_kerusakan.split("T")[0],
                        deskripsi: item.riwayat_kerusakan,
                    }));
                    setRiwayatKerusakan(riwayatKerusakan);
                } else {
                    console.error("Response tidak berhasil:", data);
                }
            } catch (error) {
                console.error("Terjadi kesalahan:", error.message);
            } finally {
                setIsLoadingRiwayat(false);
            }
        };

        fetchRiwayatKerusakan();
    }, [id]); // Menjalankan sekali saat pertama kali komponen di-render

    const handleDeleteRiwayat = async (idKerusakan: string) => {  // Pastikan parameter adalah ID kerusakan
        if (!idKerusakan) {
            console.error("ID:" + idKerusakan);
            return;
        }

        try {
            const response = await fetch(`https://backend-umkm-riau.vercel.app/api/kerusakan/${idKerusakan}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                throw new Error('Gagal menghapus riwayat kerusakan');
            }

            console.log('Riwayat kerusakan berhasil dihapus');
            refetchData(); // Refetch untuk memperbarui UI
        } catch (error) {
            console.error('Terjadi kesalahan:', error.message);
        }
    };


    const closeModalRiwayatKerusakan = () => setIsModalRiwayatKerusakanOpen(false);
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
        // Validasi input sebelum melanjutkan
        if (!newRiwayat.deskripsi.trim()) {
            showError("Deskripsi kerusakan tidak boleh kosong.");
            closeModalTambahRiwayatKerusakan();
            return;
        }

        try {
            // Siapkan payload untuk POST request
            const payload = {
                id_booth: id, // Tambahkan id_booth ke payload
                tanggal_kerusakan: new Date().toISOString().split("T")[0], // Tanggal saat ini dalam format YYYY-MM-DD
                riwayat_kerusakan: newRiwayat.deskripsi.trim(), // Deskripsi dari input (hapus spasi di awal/akhir)
            };

            // Kirim data ke endpoint backend
            const response = await fetch(
                `https://backend-umkm-riau.vercel.app/api/kerusakan`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            // Periksa apakah respons berhasil
            if (!response.ok) {
                const textResponse = await response.text();
                console.error("Error respons backend:", textResponse);

                // Deteksi jika server mengembalikan HTML
                if (textResponse.startsWith("<!DOCTYPE")) {
                    throw new Error("Server mengembalikan HTML, bukan JSON. Periksa URL atau konfigurasi backend.");
                }

                // Lemparkan error jika respons gagal
                throw new Error(`Gagal menambahkan riwayat kerusakan. Status: ${response.status}`);
            }

            // Ambil data JSON dari respons
            const data = await response.json();
            console.log("Riwayat kerusakan berhasil ditambahkan:", data);

            // Reset input riwayat baru
            setNewRiwayat({ tanggal: "", deskripsi: "" });

            // Tutup modal
            closeModalTambahRiwayatKerusakan();

            // Refetch data untuk memperbarui tampilan
            refetchData();

            // Berikan notifikasi kepada pengguna
            showNotification("Riwayat kerusakan berhasil ditambahkan.");
        } catch (error: any) {
            // Tangani kesalahan
            console.error("Terjadi kesalahan:", error.message);
            showError(error.message || "Terjadi kesalahan saat menambahkan riwayat kerusakan.");
        }
    };







    // Penentuan warna berdasarkan status
    const cardColor =
        status === "tidak disewa" ? "border-primary" : status === "rusak" ? "border-yellow-500" : "border-red-500";

    const divColor =
        status === "tidak disewa" ? "bg-primary" : status === "rusak" ? "bg-yellow-500" : "bg-red-500";

    // Fungsi untuk menghapus penyewa
    const handleHapusPenyewa = async () => {
        try {
            // Step 1: Get id_penyewaan dari booth ID
            const responseGetPenyewaan = await fetch(
                `https://backend-umkm-riau.vercel.app/api/penyewaan/booth/${id}`
            );

            if (!responseGetPenyewaan.ok) {
                throw new Error("Gagal mendapatkan id_penyewaan.");
            }

            const dataPenyewaan = await responseGetPenyewaan.json();

            if (!dataPenyewaan.success || !dataPenyewaan.data || dataPenyewaan.data.length === 0) {
                throw new Error("Data id_penyewaan tidak ditemukan.");
            }

            const idPenyewaan = dataPenyewaan.data[0].id_sewa;

            // Step 2: Hapus bayar_sewa berdasarkan id_penyewaan
            const responseHapusBayarSewa = await fetch(
                `https://backend-umkm-riau.vercel.app/api/sewa/hapus/${idPenyewaan}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!responseHapusBayarSewa.ok) {
                throw new Error("Gagal menghapus bayar_sewa.");
            }

            // Step 3: Hapus penyewaan berdasarkan id_penyewaan
            const responseHapusPenyewaan = await fetch(
                `https://backend-umkm-riau.vercel.app/api/penyewaan/${idPenyewaan}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!responseHapusPenyewaan.ok) {
                throw new Error("Gagal menghapus penyewaan.");
            }

            // Step 4: Update status booth
            const newStatus = status === "rusak" ? "rusak" : "tidak disewa";
            setPenyewa(null);
            setStatus(newStatus);
            await updateStatus(newStatus);

            console.log("Penyewa berhasil dihapus.");
            refetchData(); // Refetch untuk memperbarui UI
        } catch (error) {
            console.error("Terjadi kesalahan:", error.message);
        }
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
            status: newStatus,
        };

        try {
            const response = await fetch(`https://backend-umkm-riau.vercel.app/api/booth/status/${id}`, {
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
                riwayat={riwayatKerusakan} // Kirim data riwayat ke modal
                isLoading={isLoadingRiwayat} // Opsional: Untuk menampilkan spinner jika data sedang dimuat
                onDelete={handleDeleteRiwayat} // Fungsi untuk menghapus riwayat
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
                <p className="text-black">Status: {status}</p>
                <p className="text-black">Riwayat Kerusakan: {riwayatKerusakan.length}</p>
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

                    {(status === "tidak disewa" || status === "") && (
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
