interface PemantauanBoothProps {
    isOpen: boolean
    onClose: () => void
    boothData: {
        id: string
        penyewa: string
        lokasi: string
        status: string
        ktpImage: string
    }
}

const DataItem = ({ label, value }: { label: string; value: string }) => (
    <p className="mb-1">
        <span className="font-semibold">{label}:</span>{" "}
        <span>{value}</span>
    </p>
)

export function PemantauanBooth({ isOpen, onClose, boothData }: PemantauanBoothProps) {
    if (!isOpen) return null;

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
                            <DataItem label="No HP" value="081234567890" />
                            <DataItem label="Alamat Domisili" value="Jl. Sudirman No. 123, Pekanbaru" />
                            <DataItem label="Alamat Lokasi Booth" value={boothData.lokasi} />
                            <DataItem label="NIK" value="1471XXXXXXXXXX" />
                            <DataItem label="Jenis Kelamin" value="Perempuan" />
                            <DataItem label="Awal Penyewaan" value="01/01/2023" />
                            <DataItem label="Akhir Penyewaan" value="31/12/2023" />
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
                            <ul className="space-y-2 text-sm md:text-base">
                                <li>Tanggal: 01/05/2023, Jumlah: Rp 500.000, Jatuh Tempo: 15/05/2023</li>
                                <li>Tanggal: 01/04/2023, Jumlah: Rp 500.000, Jatuh Tempo: 15/04/2023</li>
                                <li>Tanggal: 01/03/2023, Jumlah: Rp 500.000, Jatuh Tempo: 15/03/2023</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-0 text-black shadow-none">
                        <div className="p-4 ">
                            <h3 className="text-base md:text-lg ">Riwayat Kerusakan</h3>
                        </div>
                        <div className="p-4">
                            <ul className="space-y-2 text-sm md:text-base">
                                <li>Tanggal: 10/04/2023, Kerusakan: Kebocoran atap</li>
                                <li>Tanggal: 05/02/2023, Kerusakan: Pintu rusak</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PemantauanBooth