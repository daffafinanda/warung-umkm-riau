import React from 'react';

import { LuTrash2 } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";

interface ModalRiwayatKerusakanBoothProps {
    isOpen: boolean;
    onClose: () => void;
    riwayat: { id: string; tanggal: string; deskripsi: string; gambarKerusakan: string }[]; // Tambahkan gambarKerusakan
    onDelete: (id: string) => void;
    isLoading: boolean;
}

const ModalRiwayatKerusakanBooth: React.FC<ModalRiwayatKerusakanBoothProps> = ({
    isOpen,
    onClose,
    riwayat,
    onDelete,
    isLoading,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative flex flex-col w-full max-w-md gap-3 p-6 bg-white rounded-lg shadow-lg animate-popup">
                <button
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <IoCloseSharp className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold text-center text-black">Riwayat Kerusakan</h2>

                {/* Tampilkan loading jika sedang memuat */}
                {isLoading ? (
                    <div className="flex justify-center items-center mt-4">
                        <div className="w-6 h-6 border-t-4 border-primary border-solid rounded-full animate-spin"></div> {/* Spinner */}
                        <p className="ml-2">Loading...</p> {/* Teks Loading */}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 mt-4">
                        {riwayat.map((item) => (
                            <div key={item.id} className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-primary">{item.tanggal}</h3>
                                    <p className="font-medium text-black">{item.deskripsi}</p>
                                </div>

                                <div className="flex flex-col items-end">
                                    <button
                                        onClick={() => window.open(item.gambarKerusakan, "_blank")} // Buka gambar di tab baru
                                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
                                    >
                                        Lihat Bukti Kerusakan
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)} // Menghapus item
                                        className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1 rounded-full transition-colors mt-2"
                                        aria-label={`Delete riwayat from ${item.tanggal}`}
                                    >
                                        <LuTrash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalRiwayatKerusakanBooth;
