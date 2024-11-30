interface ModalPenolakanPenyewaanProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalPenolakanPenyewaan: React.FC<ModalPenolakanPenyewaanProps> = ({
    isOpen,
    onClose,
}) => {
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
                    />
                    <button
                        className="bg-red-500 text-white w-full px-4 py-2 rounded-lg"
                        onClick={onClose}
                    >
                        Konfirmasi Penolakan
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
    )

}

export default ModalPenolakanPenyewaan