import React, { ChangeEvent } from 'react';
interface ModalTambahRiwayatKerusakanBoothProps {
    isOpen: boolean;
    onClose: () => void;
    newRiwayat: { tanggal: string; deskripsi: string; gambarKerusakan: File };
    setNewRiwayat: React.Dispatch<React.SetStateAction<{ tanggal: string; deskripsi: string; gambarKerusakan: File }>>;
    onTambahRiwayat: () => void;
}


const ModalTambahRiwayatKerusakanBooth: React.FC<ModalTambahRiwayatKerusakanBoothProps> = ({
    isOpen,
    onClose,
    newRiwayat,
    setNewRiwayat,
    onTambahRiwayat
}) => {


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Contoh validasi tipe file
            if (!file.type.startsWith("image/")) {
                alert("File yang diunggah harus berupa gambar.");
                return;
            }

            setNewRiwayat((prevData) => ({
                ...prevData,
                gambarKerusakan: file,
            }));
        }
    };

    if (!isOpen) {
        return null;

    }

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="relative flex flex-col w-full max-w-md gap-3 p-6 bg-white animate-popup rounded-lg shadow-lg">
                    <button className="absolute right-3 top-3 text-black" onClick={onClose}>X</button>
                    <h2 className="text-xl font-semibold text-center text-black">Tambahkan Kerusakan</h2>
                    <textarea
                        className="w-full h-[150px] p-2 text-black border border-gray-300 rounded-md"
                        placeholder="Deskripsikan Kerusakan"
                        value={newRiwayat.deskripsi}
                        onChange={(e) => setNewRiwayat({ ...newRiwayat, deskripsi: e.target.value })}
                    />
                    <input
                        type="file"
                        name="gambarKerusakan"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="p-1 text-black block w-full rounded-md border border-grey-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                    />
                    <button
                        className="bg-primary text-white w-full px-4 py-2 rounded-lg"
                        onClick={onTambahRiwayat} // Call onAddRiwayat to handle adding new data
                    >
                        Konfirmasi
                    </button>
                    <button
                        className="bg-white text-black w-full px-4 py-2 rounded-lg border border-abu2"
                        onClick={onClose}
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalTambahRiwayatKerusakanBooth;
