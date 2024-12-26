interface BoothItemProps {
    booth: {
        id: string
        penyewa: string
        lokasi: string
    }
    onDetailClick: () => void
}

export function PemantauanBoothCard({ booth, onDetailClick }: BoothItemProps) {
    return (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="mb-2">
                <h3 className="text-sm font-bold text-primary">Booth {booth.id}</h3> {/* Tampilkan Booth ID */}
            </div>
            <div>
                <p className="text-sm mb-1 text-black"><span className="font-semibold">Penyewa:</span> {booth.penyewa}</p> {/* Tampilkan Penyewa */}
                <p className="text-sm mb-1 text-black"><span className="font-semibold">Lokasi:</span> {booth.lokasi}</p> {/* Tampilkan Lokasi */}
                <p className="text-sm mb-2">
                </p>
                <button
                    className="w-full py-2 px-4 border-2 border-primary rounded-lg font-bold text-primary hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    onClick={onDetailClick}
                >
                    Detail
                </button>
            </div>
        </div>
    )
}
