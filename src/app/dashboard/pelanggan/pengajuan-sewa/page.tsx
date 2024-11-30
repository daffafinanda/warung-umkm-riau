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
    awalPenyewaan: "2024-11-01",
    akhirPenyewaan: "2024-12-01",
    lokasiBooth: "Mall Senayan",
    statusProses: "Menunggu" as Status, // Cast statusProses ke tipe Status
    nik: "1234567890123456", // NIK
    noHp: "081234567890", // No HP
  };

  // Fungsi untuk menentukan kelas status berdasarkan status proses
  const getStatusClass = (status: Status): string => {
    switch (status) {
      case "Disetujui":
        return "bg-green text-white";
      case "Menunggu":
        return "bg-gray-300 text-white";
      case "Diproses":
        return "bg-yellow-400 text-white";
      case "Ditolak":
        return "bg-red-400 text-white";
      default:
        return "bg-gray-300 text-black"; // default jika status tidak dikenali
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
        <div>
          <label
            htmlFor="statusProses"
            className="block text-sm font-medium text-gray-700"
          >
            Status Proses
          </label>
          <div
            id="statusProses"
            className={`bg-background mb-12 mt-2 px-4 py-2 rounded-lg text-center font-medium ${getStatusClass(formData.statusProses)}`}
          >
            {formData.statusProses}
          </div>
        </div>

        {/* Tombol Edit, Hapus, dan Batalkan Pengajuan */}
        <div className="flex space-x-4 w-full">
          {/* Menunggu: hanya Batalkan Pengajuan */}
          {formData.statusProses === "Menunggu" && (
            <button
              type="button"
              className="w-full py-2 px-4 border border-transparent rounded-full text-sm font-semibold text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Batalkan Pengajuan
            </button>
          )}

          {/* Diproses: Edit, Hapus, Batalkan */}
          {formData.statusProses === "Diproses" && (
            <>
              <button
                type="button"
                className="w-full py-2 px-4 border border-transparent rounded-full text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Pengajuan
              </button>
              <button
                type="button"
                className="w-full py-2 px-4 border border-transparent rounded-full text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Hapus Pengajuan
              </button>
              <button
                type="button"
                className="w-full py-2 px-4 border border-transparent rounded-full text-sm font-semibold text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Batalkan Pengajuan
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default PengajuanSewa;
