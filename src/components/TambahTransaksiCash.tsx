import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    jenis_produk: '',
    ukuran: '',
    harga: '',
    nama: '',
    alamat: '',
    no_hp: '',
    jenis_kelamin: '',
    alamat_domisili: '',
    nik: '',
    tenor: '',
    foto_ktp: null as File | null,
    produk: [{ nama: '', ukuran: '', harga: '' }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProdukChange = (index: number, field: string, value: string) => {
    const updatedProduk = [...formData.produk];
    updatedProduk[index] = { ...updatedProduk[index], [field]: value };
    setFormData((prevData) => ({ ...prevData, produk: updatedProduk }));
  };
  const handleAddProduk = () => {
    setFormData((prevData) => ({
      ...prevData,
      produk: [...prevData.produk, { nama: '', ukuran: '', harga: '' }],
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        foto_ktp: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex text-black justify-center items-center z-50">
      <div className="bg-white rounded-lg w-screen max-w-lg p-6">
        <h2 className="text-xl text-primary font-bold mb-4">Tambah Transaksi Kredit</h2>
        <div className="overflow-auto max-h-[calc(100vh-250px)]">

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="jenis_produk" className="block text-sm font-medium">
              Jenis Produk
            </label>
            <input
              type="text"
              id="jenis_produk"
              name="jenis_produk"
              value={formData.jenis_produk}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
              />
          </div>
          <div>
            <label htmlFor="ukuran" className="block text-sm font-medium">
              Ukuran
            </label>
            <input
              type="text"
              id="ukuran"
              name="ukuran"
              value={formData.ukuran}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
              />
          </div>
          <div>
            <label htmlFor="harga" className="block text-sm font-medium">
              Harga
            </label>
            <input
              type="number"
              id="harga"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
              />
          </div>
          {formData.produk.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="w-full">
                <label htmlFor={`produk-nama-${index}`} className="block text-sm font-medium text-gray-700 capitalize">
                  Nama Produk
                </label>
                <input
                  type="text"
                  id={`produk-nama-${index}`}
                  value={item.nama}
                  onChange={(e) => handleProdukChange(index, 'nama', e.target.value)}
                  placeholder="Nama produk"
                  className="bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 border-gray-300"
                />
              </div>

              <div className="w-full">
                <label htmlFor={`produk-ukuran-${index}`} className="block text-sm font-medium text-gray-700 capitalize">
                  Ukuran Produk
                </label>
                <input
                  type="text"
                  id={`produk-ukuran-${index}`}
                  value={item.ukuran}
                  onChange={(e) => handleProdukChange(index, 'ukuran', e.target.value)}
                  placeholder="Ukuran produk"
                  className="bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 border-gray-300"
                />
              </div>

              <div className="w-full">
                <label htmlFor={`produk-harga-${index}`} className="block text-sm font-medium text-gray-700 capitalize">
                  Harga Produk
                </label>
                <input
                  type="number"
                  id={`produk-harga-${index}`}
                  value={item.harga}
                  onChange={(e) => handleProdukChange(index, 'harga', e.target.value)}
                  placeholder="Harga produk"
                  className="bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 border-gray-300"
                />
              </div>
            </div>
          ))}
              <button
                type="button"
                onClick={handleAddProduk}
                className="px-4 py-2 mt-4 bg-green-600 text-white rounded-md"
            >
                Tambah Produk
            </button>
          <div>
            <label htmlFor="nama" className="block text-sm font-medium">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
              />
          </div>
          <div>
            <label htmlFor="alamat" className="block text-sm font-medium">
              Alamat
            </label>
            <textarea
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
              ></textarea>
          </div>
          <div>
            <label htmlFor="no_hp" className="block text-sm font-medium">
              No. HP
            </label>
            <input
              type="tel"
              id="no_hp"
              name="no_hp"
              value={formData.no_hp}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
              />
          </div>
          <div>
            <label htmlFor="jenis_kelamin" className="block text-sm font-medium">
              Jenis Kelamin
            </label>
            <select
              id="jenis_kelamin"
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
              >
              <option value="">Pilih</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div>
            <label htmlFor="alamat_domisili" className="block text-sm font-medium">
              Alamat Domisili
            </label>
            <textarea
              id="alamat_domisili"
              name="alamat_domisili"
              value={formData.alamat_domisili}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
              ></textarea>
          </div>
          <div>
            <label htmlFor="nik" className="block text-sm font-medium">
              NIK
            </label>
            <input
              type="text"
              id="nik"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
              />
          </div>
          <div>
            <label htmlFor="tenor" className="block text-sm font-medium">
              Tenor
            </label>
            <input
              type="text"
              id="tenor"
              name="tenor"
              value={formData.tenor}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
              />
          </div>
          <div>
            <label htmlFor="foto_ktp" className="block text-sm font-medium">
              Foto KTP
            </label>
            <input
              type="file"
              id="foto_ktp"
              name="foto_ktp"
              onChange={handleFileChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
              />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
              Simpan
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
