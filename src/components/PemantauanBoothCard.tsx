interface BoothItemProps {
    booth: {
        id: string
        penyewa: string
        lokasi: string
        status: string
    }
    onDetailClick: () => void
}

export function BoothItem({ booth, onDetailClick }: BoothItemProps) {
    return (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="mb-2">
                <h3 className="text-sm font-bold text-unik">Booth {booth.id}</h3>
            </div>
            <div>
                <p className="text-sm mb-1"><span className="font-semibold">Penyewa:</span> {booth.penyewa}</p>
                <p className="text-sm mb-1"><span className="font-semibold">Lokasi:</span> {booth.lokasi}</p>
                <p className="text-sm mb-2">
                    <span className="font-semibold">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${booth.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {booth.status}
                    </span>
                </p>
                <button 
                    className="w-full py-2 px-4 border-2 border-unik rounded-lg font-bold text-unik hover:bg-unik-100 focus:outline-none focus:ring-2 focus:ring-unik-200"
                    onClick={onDetailClick}
                >
                    Detail
                </button>
            </div>
        </div>
    )
}
