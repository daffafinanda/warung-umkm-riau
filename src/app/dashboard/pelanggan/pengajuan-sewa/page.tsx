"use client";

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
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-2xl">
      <h1 className="text-2xl font-bold text-primary mb-6 text-center">
        Form Penyewaan Anda
      </h1>
      <form className="space-y-4">
        {/* Nama */}
        <div>
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            Nama
          </label>
          <input
            type="text"
            id="nama"
            value={formData.nama}
            readOnly
            className="bg-background mt-1 block w-full rounded-md border-gray-300 shadow-inner  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-3 py-2"
          />
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label
            htmlFor="jenisKelamin"
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            Jenis Kelamin
          </label>
          <input
            type="text"
            id="jenisKelamin"
            value={formData.jenisKelamin}
            readOnly
            className="bg-background mt-1 block w-full rounded-md border-gray-300 shadow-inner  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-3 py-2"
          />
        </div>

        {/* Alamat Domisili */}
        <div>
          <label
            htmlFor="alamatDomisili"
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            Alamat Domisili
          </label>
          <input
            type="text"
            id="alamatDomisili"
            value={formData.alamatDomisili}
            readOnly
            className="bg-background mt-1 block w-full rounded-md border-gray-300 shadow-inner  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-3 py-2"
          />
        </div>

        {/* Alamat KTP */}
        <div>
          <label
            htmlFor="alamatKTP"
            className="block text-sm font-medium text-gray-700"
          >
            Alamat Sesuai KTP
          </label>
          <input
            type="text"
            id="alamatKTP"
            value={formData.alamatKTP}
            readOnly
            className="bg-background mt-1 block w-full rounded-md border-gray-300 shadow-inner  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-3 py-2"
          />
        </div>

        {/* Foto KTP */}
        <div>
          <label
            htmlFor="fileKTP"
            className="block text-sm font-medium text-gray-700"
          >
            Foto KTP
          </label>
          <div
            className="bg-background mt-2 w-full h-64 border-2 z-0 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-50 shadow-inner "
          >
            <img
              src={formData.fotoKTP}
              alt="Foto KTP"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Awal Penyewaan dan Akhir Penyewaan */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="awalPenyewaan"
              className="block text-sm font-medium text-gray-700"
            >
              Awal Penyewaan
            </label>
            <input
              type="text"
              id="awalPenyewaan"
              value={formData.awalPenyewaan}
              readOnly
              className="bg-background mt-1 block w-full rounded-md border-gray-300 shadow-inner  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="akhirPenyewaan"
              className="block text-sm font-medium text-gray-700"
            >
              Akhir Penyewaan
            </label>
            <input
              type="text"
              id="akhirPenyewaan"
              value={formData.akhirPenyewaan}
              readOnly
              className="bg-background mt-1 block w-full rounded-md border-gray-300 shadow-inner  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-3 py-2"
            />
          </div>
        </div>

        {/* Lokasi Booth */}
        <div>
          <label
            htmlFor="lokasiBooth"
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            Lokasi Booth
          </label>
          <input
            type="text"
            id="lokasiBooth"
            value={formData.lokasiBooth}
            readOnly
            className="bg-background mt-1 block w-full rounded-md border-gray-300 shadow-inner  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black px-3 py-2"
          />
        </div>

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
              className="w-full py-2 px-4 border border-transparent rounded-full  text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Batalkan Pengajuan
            </button>
          )}

          {/* Ditolak: Edit dan Hapus Pengajuan */}
          {formData.statusProses === "Ditolak" && (
            <>
              <button
                type="button"
                className="w-full py-2 px-4 border border-transparent rounded-full  text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Edit Pengajuan
              </button>
              <button
                type="button"
                className="w-full py-2 px-4 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Hapus Pengajuan
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default PengajuanSewa;
