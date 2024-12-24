import { useState } from 'react';
import { FiUpload } from "react-icons/fi";

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
  });

  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const validateForm = () => {
    const emptyFields: string[] = [];
    for (const key in formData) {
      if (formData[key as keyof typeof formData] === "" && key !== "fotoKTP") {
        emptyFields.push(key);
      }
    }

    if (!formData.foto_ktp) {
      emptyFields.push("fotoKTP");
    }

    setErrorFields(emptyFields); // Make sure to update the errorFields state
    return emptyFields.length === 0;
  };

  if (uploadError) {
    console.error(uploadError);
    // or display an error message to the user
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const allowedTypes = ["image/png", "image/jpeg"];
        const maxSize = 2 * 1024 * 1024; // 2MB
    
        // Validasi tipe file
        if (!allowedTypes.includes(file.type)) {
          setUploadError("Hanya file JPG atau PNG yang diperbolehkan.");
          return;
        }
    
        // Validasi ukuran file
        if (file.size > maxSize) {
          setUploadError("Ukuran file tidak boleh lebih dari 2MB.");
          return;
        }
    
        // Reset pesan error dan simpan file
        setUploadError(null);
        setFormData({
          ...formData,
          foto_ktp: file, // Simpan file yang dipilih ke state
        });
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
        console.error("Form is invalid!");
        return;
    }
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex text-black justify-center items-center z-50">
      <div className="bg-white rounded-lg w-screen max-w-lg ">
        <h2 className="text-xl text-primary font-bold mb-4 px-6 pt-6">Formulir</h2>
        <div className="overflow-auto max-h-[calc(100vh-250px)] px-6">

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 capitalize">
              Nama Pembeli
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary focus:ring-opacity-50 ${
                errorFields.includes("nama") ? "border-red-500" : "border-gray-300"
              }`}
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
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary focus:ring-opacity-50 ${
                errorFields.includes("Alamat") ? "border-red-500" : "border-gray-300"
              }`}
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
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary focus:ring-opacity-50 ${
                errorFields.includes("no_hp") ? "border-red-500" : "border-gray-300"
              }`}
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
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
                errorFields.includes("jenis_kelamin") ? "border-red-500" : "border-gray-300"
              }`}required
              >
              <option value="">Pilih Kelamin</option>
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
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
                errorFields.includes("alamat_domisili") ? "border-red-500" : "border-gray-300"
              }`}required
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
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
                errorFields.includes("nik") ? "border-red-500" : "border-gray-300"
              }`}required
              />
          </div>

          <div>
            <label htmlFor="fileKTP" className="block text-sm font-medium text-gray-700">
                Foto KTP <span className="text-red-500">*</span>
            </label>
            <div
                className={`bg-gray-50 mt-2 w-full h-52 border-2 ${                    errorFields.includes('foto_ktp') ? 'border-red-500' : 'border-dashed border-primary-300'
                } rounded-md flex items-center justify-center overflow-hidden shadow-inner cursor-pointer`}
                onClick={() => document.getElementById('fileKTP')?.click()}
                >
                {formData.foto_ktp ? (
                <img
                    src={URL.createObjectURL(formData.foto_ktp)}
                    alt="Foto KTP"
                    className="object-contain w-full h-full"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center">
                    <FiUpload className="text-4xl text-gray-400" />
                    <p className="text-gray-500 mt-2 text-sm">Klik untuk upload foto KTP</p>
                </div>
            )}
            </div>
            <input
                type="file"
                id="fileKTP"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            {errorFields.includes('foto_ktp') && (
            <p className="text-red-500 text-xs mt-2">Field ini harus diisi!</p>
            )}
          </div>
          <div>
            <label htmlFor="jenis_produk" className="block text-sm font-medium">
              Nama Produk
            </label>
            <input
              type="text"
              id="jenis_produk"
              name="jenis_produk"
              value={formData.jenis_produk}
              onChange={handleChange}
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
                errorFields.includes("jenis_produk") ? "border-red-500" : "border-gray-300"
              }`}required
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
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
                errorFields.includes("ukuran") ? "border-red-500" : "border-gray-300"
              }`}required
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
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
                errorFields.includes("harga") ? "border-red-500" : "border-gray-300"
              }`}required
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
              className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
                errorFields.includes("tenor") ? "border-red-500" : "border-gray-300"
              }`}
              required
              />
          </div>
        </form>
        </div>
          <div className="flex justify-end space-x-2 p-4 border-t-2">
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
      </div>
    </div>
  );
};

export default Modal;
