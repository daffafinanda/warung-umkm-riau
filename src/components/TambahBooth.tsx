import React, { useState } from 'react';
import { useModal } from './ModalContext';

interface BoothData {
    id_booth: string;
    ukuran: string;
    status: string;
    harga_sewa: string;
    riwayat_kerusakan: { tanggal: string; deskripsi: string }[];

}

interface TambahBoothModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: BoothData) => Promise<void>;
    existingBoothIds: string[]; // New prop for existing booth IDs

}

const TambahBoothModal: React.FC<TambahBoothModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { showError, showNotification } = useModal();
    const [formData, setFormData] = useState<BoothData>({
        id_booth: '',
        ukuran: '',
        status: "TIDAK DISEWA", // Status default
        harga_sewa: "",
        riwayat_kerusakan: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi input: pastikan semua field diisi
        if (!formData.id_booth.trim() || !formData.ukuran.trim()) {
            showError("Semua field harus diisi!");
            onClose();
            return;
        }

        // Tambahkan status default dan riwayat kerusakan kosong
        const boothData = {
            ...formData,
            status: "TIDAK DISEWA", // Default status
            riwayat_kerusakan: ""  // Default riwayat kosong
        };

        onSubmit(boothData);
        setFormData({ id_booth: '', ukuran: '', status: "TIDAK DISEWA", harga_sewa: "", riwayat_kerusakan: [] }); // Reset form
        showNotification('Data berhasil ditambahkan!');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4 text-primary">Tambah Booth</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="id_booth" className="block text-sm font-medium text-gray-700">ID Booth</label>
                        <input
                            type="text"
                            id="id_booth"
                            name="id_booth"
                            value={formData.id_booth}
                            onChange={handleChange}
                            className="mt-1 block w-full text-black p-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ukuran" className="block text-sm font-medium text-gray-700">Ukuran</label>
                        <input
                            type="text"
                            id="ukuran"
                            name="ukuran"
                            value={formData.ukuran}
                            onChange={handleChange}
                            className="mt-1 block w-full text-black rounded-md p-1 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"

                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TambahBoothModal;

