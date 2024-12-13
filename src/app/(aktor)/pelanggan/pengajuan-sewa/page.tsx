"use client";
import FormData from "@/components/FormData";

const PengajuanSewa: React.FC = () => {
  // Mendefinisikan tipe status yang bisa ada
  type Status = "Disetujui" | "Menunggu" | "Diproses" | "Ditolak";

  // Data untuk form dengan statusProses yang didefinisikan dengan tipe Status
  const formData = {
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    alamatDomisili: "Jl. Kebon Kacang No. 12, Jakarta",
    alamatKTP: "Jl. Kebon Melati No. 5, Jakarta",
    fotoKTP: "https://about.lovia.id/wp-content/uploads/2020/05/150067.jpg", // URL gambar KTP
    durasiPenyewaan: 2,
    lokasiBooth: "Mall Senayan",
    statusProses: "Diproses" as Status, // Cast statusProses ke tipe Status
    nik: "1234567890123456", // NIK
    noHp: "081234567890", // No HP
  };

  // Fungsi untuk menentukan kelas status berdasarkan status proses
  const getStatusClass = (status: Status): string => {
    switch (status) {
      case "Disetujui":
        return "bg-green-500";
      case "Menunggu":
        return "bg-gray-400 ";
      case "Diproses":
        return "bg-yellow-400 ";
      case "Ditolak":
        return "bg-red-400 ";
      default:
        return "bg-gray-300 "; // default jika status tidak dikenali
    }
  };

  // Fungsi untuk menampilkan tombol berdasarkan status
  const renderButtons = (status: Status) => {
    switch (status) {
      case "Menunggu":
        return (
          <button
            type="button"
            className="w-full bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 focus:outline-none"
          >
            Batalkan Pengajuan
          </button>
        );
      case "Disetujui":
        return (
          <button
            type="button"
            className="w-full bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-70 focus:outline-none"
          >
            Lihat Booth
          </button>
        );
      case "Ditolak":
        return (
          <div className="flex space-x-4 w-full">
            <button
              type="button"
              className="w-full bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 focus:outline-none"
            >
              Edit
            </button>
            <button
              type="button"
              className="w-full bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 focus:outline-none"
            >
              Batalkan Pengajuan
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl sm:mx-auto mx-3 mt-8 bg-white p-6 rounded-lg shadow-2xl">
      <h1 className="text-2xl font-bold text-primary mb-6 text-center">
        Form Penyewaan Anda
      </h1>
      <form className="space-y-4">
        <FormData formData={formData} />

        {/* Status Proses */}
        <div className="flex flex-row items-center gap-4">
          <label
            htmlFor="statusProses"
            className="block text-sm font-medium text-gray-700"
          >
            Status Proses
          </label>
          <div
            id="statusProses"
            className={`bg-background w-fit  px-4 py-2 rounded-lg text-left font-medium ${getStatusClass(formData.statusProses)}`}
          >
            {formData.statusProses}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-center">
          {renderButtons(formData.statusProses)}
        </div>
      </form>
    </div>
  );
};

export default PengajuanSewa;
