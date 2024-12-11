"use client";

import { useRouter } from "next/navigation";

interface PenyewaanData {
  id_sewa: string;
  id_booth: string;
  nama_penyewa: string;
  durasi: string;
}

const dummyData: PenyewaanData[] = [
  { id_sewa: "001", id_booth: "A1", nama_penyewa: "John Doe", durasi: "6 Bulan" },
  { id_sewa: "002", id_booth: "B2", nama_penyewa: "Jane Smith", durasi: "3 Bulan" },
  { id_sewa: "003", id_booth: "C3", nama_penyewa: "Michael Lee", durasi: "1 Tahun" },
];

const RiwayatPenyewaan = () => {
  const router = useRouter();

  return (
    <div className="p-6 bg-foreground rounded-lg shadow-md">
  <div className="overflow-x-auto shadow-md sm:rounded-lg">
    <table className="min-w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">ID Sewa</th>
          <th scope="col" className="px-6 py-3">ID Booth</th>
          <th scope="col" className="px-6 py-3">Nama Penyewa</th>
          <th scope="col" className="px-6 py-3">Durasi</th>
          <th scope="col" className="px-6 py-3">Detail</th>
        </tr>
      </thead>
      <tbody>
        {dummyData.map((item, index) => (
          <tr key={index} className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.id_sewa}</td>
            <td className="px-6 py-4">{item.id_booth}</td>
            <td className="px-6 py-4">{item.nama_penyewa}</td>
            <td className="px-6 py-4">{item.durasi}</td>
            <td className="px-6 py-4 text-right">
              <button
                onClick={() =>
                  router.push(`data-transaksi/sewa/${item.id_sewa}`)
                }
                className="font-medium text-blue-600 hover:underline"
              >
                Detail
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default RiwayatPenyewaan;
