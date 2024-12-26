import React from 'react';

import { LuTrash2 } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";

interface ModalRiwayatKerusakanBoothProps {
    isOpen: boolean;
    onClose: () => void;
    riwayat: { id: string; tanggal: string; deskripsi: string }[];
    onDelete: (id: string) => void;
}

const ModalRiwayatKerusakanBooth: React.FC<ModalRiwayatKerusakanBoothProps> = ({
    isOpen,
    onClose,
    riwayat,
    onDelete,
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
                <div className="flex flex-col gap-4 mt-4">
                    {riwayat.map((item) => (
                        <div key={item.id} className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-primary">{item.tanggal}</h3>
                                <p className="font-medium text-black">{item.deskripsi}</p>
                            </div>
                            <button
                                onClick={() => onDelete(item.id)}  // Mengirim ID kerusakan saat dihapus
                                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1 rounded-full transition-colors"
                                aria-label={`Delete riwayat from ${item.tanggal}`}
                            >
                                <LuTrash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModalRiwayatKerusakanBooth;
