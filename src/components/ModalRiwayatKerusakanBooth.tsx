interface ModalRiwayatKerusakanBoothProps {
    isOpen: boolean;
    onClose: () => void;
    riwayat: { tanggal: string; deskripsi: string }[];
}

const ModalRiwayatKerusakanBooth: React.FC<ModalRiwayatKerusakanBoothProps> = ({
    isOpen,
    onClose,
    riwayat,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed flex inset-0 items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative flex flex-col w-full max-w-md gap-3 p-6 bg-white animate-popup rounded-lg shadow-lg">
                <button className="absolute right-3 top-3 text-black" onClick={onClose}>
                    X
                </button>
                <h2 className="text-xl font-semibold text-center text-black">Riwayat Kerusakan</h2>
                <div className="flex flex-col gap-4 mt-4">
                    {riwayat.map((item, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold text-primary">{item.tanggal}</h3>
                            <p className="font-medium text-black">{item.deskripsi}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModalRiwayatKerusakanBooth;
