import React, { useState, useEffect } from "react";
import ImageModal from "@/components/ImageModal";

type FormData = {
  id: string;
  tanggal: string;
  produk: string;
  ukuran: string;
  harga: string;
  jumlah: number;
  bukti: string;
  nama: string;
  jenisKelamin: string;
  noHp: string;
  alamat: string;
};

type DetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: FormData;
  onEdit: (id: string, updatedData: FormData) => void;
  onDelete: (id: string) => void;
};

const ModalCash: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  data,
  onEdit,
  onDelete,
}) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<FormData>(data);
  const [imagePreview, setImagePreview] = useState<string>(data.bukti);

  useEffect(() => {
    setFormData(data);
    setImagePreview(data.bukti);
  }, [data]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prevData) => ({
          ...prevData,
          bukti: event.target?.result as string, // Simpan gambar sebagai base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onEdit(data.id, formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(data); // Reset form data to initial data
    setImagePreview(data.bukti); // Reset image preview to initial value
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 sm:mx-8">
          <div className="flex justify-between items-center border-b px-4 py-3">
            <h2 className="text-lg font-bold text-black">
              {editMode ? "Edit Pembelian" : "Detail Pembelian"}
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          {/* Konten Modal */}
          <div className="px-4 py-4 grid grid-cols-2 gap-4 text-black overflow-y-auto max-h-[calc(100vh-200px)]">
            {/* Kolom Kiri */}
            <div>
              <div className="mb-2">
                <label className="block font-medium">ID:</label>
                <p>{formData.id}</p>
              </div>
              <div className="mb-2">
                <label className="block font-medium">Tanggal:</label>
                {editMode ? (
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{formData.tanggal}</p>
                )}
              </div>
              <div className="mb-2">
                <label className="block font-medium">Produk:</label>
                {editMode ? (
                  <input
                    type="text"
                    name="produk"
                    value={formData.produk}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{formData.produk}</p>
                )}
              </div>
              <div className="mb-2">
                <label className="block font-medium">Ukuran:</label>
                {editMode ? (
                  <input
                    type="text"
                    name="ukuran"
                    value={formData.ukuran}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{formData.ukuran}</p>
                )}
              </div>
              <div className="mb-2">
                <label className="block font-medium">Harga:</label>
                {editMode ? (
                  <input
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{formData.harga}</p>
                )}
              </div>
              <div className="mb-2">
                <label className="block font-medium">Jumlah:</label>
                {editMode ? (
                  <input
                    type="number"
                    name="jumlah"
                    value={formData.jumlah}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{formData.jumlah}</p>
                )}
              </div>
              <div>
                <label className="block font-medium">Bukti:</label>
                {editMode ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full border rounded"
                    />
                    {formData.bukti && (
                      <img
                        src={formData.bukti}
                        alt="Bukti Pembelian"
                        className="w-full max-h-48 object-cover rounded mt-2"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <img
                      src={imagePreview}
                      alt="Bukti Pembelian"
                      className="w-full max-h-48 object-cover rounded cursor-pointer hidden sm:block"
                      onClick={() => setIsImageOpen(true)}
                    />
                    <button
                      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 sm:hidden"
                      onClick={() => setIsImageOpen(true)}
                    >
                      Lihat Gambar
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* Kolom Kanan */}
            <div>
              <div className="mb-2">
                <label className="block font-medium">Nama:</label>
                {editMode ? (
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{formData.nama}</p>
                )}
              </div>
              <div className="mb-2">
                <label className="block font-medium">Jenis Kelamin:</label>
                {editMode ? (
                  <input
                    type="text"
                    name="jenisKelamin"
                    value={formData.jenisKelamin}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{formData.jenisKelamin}</p>
                )}
              </div>
              <div className="mb-2">
                <label className="block font-medium">No. HP:</label>
                {editMode ? (
                  <input
                    type="text"
                    name="noHp"
                    value={formData.noHp}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{formData.noHp}</p>
                )}
              </div>
              <div>
                <label className="block font-medium">Alamat:</label>
                {editMode ? (
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{formData.alamat}</p>
                )}
              </div>
            </div>
          </div>
          {/* Tombol Aksi */}
          <div className="flex justify-end border-t p-4">
          {editMode ? (
            <>
            <button
              className="px-4 py-2 bg-gray-300 rounded mr-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
                  onClick={handleSave}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 bg-yellow-600 text-white rounded mr-2"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={() => onDelete(formData.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal Gambar */}
      {isImageOpen && (
        <ImageModal
          isOpen={isImageOpen}
          onClose={() => setIsImageOpen(false)}
          imageSrc={imagePreview}
        />
      )}
    </>
  );
};

export default ModalCash;
