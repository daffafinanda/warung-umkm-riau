import { useState } from "react";

interface PemantauanBoothProps {
    isOpen: boolean;
    onClose: () => void;
    boothData: {
        id: string;
        penyewa: string;
        lokasi: string;
        status: string;
        ktpImage: string;
        no_hp: string;
        alamat_domisili: string;
        nik: string;
        jenis_kelamin: string;
        awal_penyewaan: string;
        akhir_penyewaan: string;
        riwayat_pembayaran: string;
        riwayat_kerusakan: string;
    };
}

const DataItem = ({ label, value }: { label: string; value: string }) => (
    <p className="mb-1">
        <span className="font-semibold">{label}:</span>{" "}
        <span>{value}</span>
    </p>
);

export function PemantauanBooth({ isOpen, onClose, boothData }: PemantauanBoothProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    // Make sure riwayat_pembayaran is not undefined and is a string
    const paymentHistoryLinks = (boothData.riwayat_pembayaran || "").split(" | ").map((item, index) => {
        const parts = item.split(", ");
        const buktiLink = parts[2]?.split(": ")[1]; // Check if parts[2] is defined
        return (
            <div key={index} className="mb-2">
                <p>{item.split(", ")[0]}, {item.split(", ")[1]}</p>
                {buktiLink && (
                    <button
                        onClick={() => handleImageClick(buktiLink)}
                        className="text-blue-500 hover:underline"
                    >
                        Lihat Disini untuk melihat bukti
                    </button>
                )}
            </div>
        );
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-full max-w-3xl h-[90vh] bg-white rounded-2xl overflow-hidden shadow-xl relative">
                <div className="sticky top-0 z-10 bg-gray-100 p-4 border-b">
                    <h2 className="text-lg md:text-xl text-black">Detail Booth {boothData.id}</h2>
                    <button
                        className="absolute right-3 top-3 text-black font-bold"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>

                <div className="overflow-auto h-[calc(90vh-4rem)] p-4 md:p-6">
                    <div className="border-0 shadow-none mb-6 text-black">
                        <div className="p-4">
                            <h3 className="text-base md:text-lg text-black">Biodata Penyewa</h3>
                        </div>
                        <div className="p-4 space-y-2">
                            <DataItem label="Nama Penyewa" value={boothData.penyewa} />
                            <DataItem label="No HP" value={boothData.no_hp} />
                            <DataItem label="Alamat Domisili" value={boothData.alamat_domisili} />
                            <DataItem label="Alamat Lokasi Booth" value={boothData.lokasi} />
                            <DataItem label="NIK" value={boothData.nik} />
                            <DataItem label="Jenis Kelamin" value={boothData.jenis_kelamin} />
                            <DataItem label="Awal Penyewaan" value={boothData.awal_penyewaan} />
                            <DataItem label="Akhir Penyewaan" value={boothData.akhir_penyewaan} />
                            <div className="mt-4">
                                <p className="font-semibold mb-2">KTP Penyewa:</p>
                                <img
                                    src={boothData.ktpImage}
                                    alt="KTP Penyewa"
                                    className="rounded-lg border w-full max-w-md h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-0 shadow-none mb-6 text-black">
                        <div className="p-4">
                            <h3 className="text-base md:text-lg">Riwayat Pembayaran</h3>
                        </div>
                        <div className="p-4">
                            {/* Only render the payment history if it's valid */}
                            {paymentHistoryLinks}
                        </div>
                    </div>

                    <div className="border-0 text-black shadow-none">
                        <div className="p-4">
                            <h3 className="text-base md:text-lg">Riwayat Kerusakan</h3>
                        </div>
                        <div className="p-4">
                            <p>{boothData.riwayat_kerusakan}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal to display selected image */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-xl shadow-xl max-w-xl w-full relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-3 right-3 text-black font-bold"
                        >
                            X
                        </button>
                        <img
                            src={selectedImage}
                            alt="Bukti Pembayaran"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
