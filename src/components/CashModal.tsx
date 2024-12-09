import React, { useState } from "react";

interface Product {
  nama: string;
  ukuran: string;
  harga: number;
  jumlah: number;
}

interface FormData {
  id: string;
  tanggal: string;
  nama: string;
  noHp: string;
  alamat: string;
  produk: Product[];
  totalTransaksi: number;
  bukti: string;
}

interface ModalCashProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (data: FormData) => void;
  onDelete: (id: string) => void;
  data: FormData;
}


const ModalCash: React.FC<ModalCashProps> = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  data,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<FormData>(data);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    setFormData((prev) => {
      const updatedProducts = [...prev.produk];
      const updatedProduct = { ...updatedProducts[index], [field]: value };
      updatedProducts[index] = updatedProduct as Product;
      return { ...prev, produk: updatedProducts };
    });
  };

  const handleSave = () => {
    onEdit(formData);
    setIsEditMode(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full sm:w-3/4 max-w-4xl h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4">Detail Transaksi</h2>
        
        {/* Kontainer untuk form yang scrollable */}
        <div className="flex-grow overflow-y-auto ">
          <form className="space-y-4">
            <div>
              <label className="block font-semibold">Tanggal</label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
                disabled={!isEditMode}
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                disabled={!isEditMode}
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">No HP</label>
              <input
                type="text"
                name="noHp"
                value={formData.noHp}
                onChange={handleInputChange}
                disabled={!isEditMode}
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Alamat</label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                disabled={!isEditMode}
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Produk</label>
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border-y font-medium px-4 py-2 text-left">Nama <span className="hidden md:inline">Produk</span></th>
                    <th className="border-y font-medium px-4 py-2 text-left">Ukuran</th>
                    <th className="border-y font-medium px-4 py-2 text-left">Harga</th>
                    <th className="border-y font-medium px-4 py-2 text-left">Jumlah</th>
                    {isEditMode && (
                      <th className="border-y px-4 py-2 text-left">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {formData.produk.map((product, index) => (
                    <tr key={index}>
                      <td className="border-b px-4 py-2">
                        <input
                          type="text"
                          value={product.nama}
                          onChange={(e) =>
                            handleProductChange(index, "nama", e.target.value)
                          }
                          disabled={!isEditMode}
                          className="border rounded-md px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border-b px-4 py-2">
                        <input
                          type="text"
                          value={product.ukuran}
                          onChange={(e) =>
                            handleProductChange(index, "ukuran", e.target.value)
                          }
                          disabled={!isEditMode}
                          className="border rounded-md px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border-b px-4 py-2">
                        <input
                          type="number"
                          value={product.harga}
                          onChange={(e) =>
                            handleProductChange(index, "harga", parseFloat(e.target.value))
                          }
                          disabled={!isEditMode}
                          className="border rounded-md px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border-b px-4 py-2">
                        <input
                          type="number"
                          value={product.jumlah}
                          onChange={(e) =>
                            handleProductChange(index, "jumlah", parseInt(e.target.value))
                          }
                          disabled={!isEditMode}
                          className="border rounded-md px-2 py-1 w-full"
                        />
                      </td>
                      {isEditMode && (
                        <td className="border-b px-4 py-2 text-center">
                          <button
                            onClick={() => {
                              const updatedProducts = formData.produk.filter((_, i) => i !== index);
                              setFormData((prev) => ({ ...prev, produk: updatedProducts }));
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Hapus
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {isEditMode && (
                <button
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      produk: [
                        ...prev.produk,
                        { nama: "", ukuran: "", harga: 0, jumlah: 0 },
                      ],
                    }));
                  }}
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  Tambah Produk
                </button>
              )}
            </div>

            <div>
              <label className="block font-medium">Total Transaksi</label>
              <input
                type="text"
                name="totalTransaksi"
                value={formData.totalTransaksi}
                disabled
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Bukti Pembayaran</label>
              <img
                src={formData.bukti}
                alt="Bukti Pembayaran"
                className="w-full h-auto max-h-[200px] object-contain"
              />
            </div>
          </form>
        </div>

        {/* Footer (Buttons) */}
        <div className="pt-4 mt-4x flex justify-between space-x-2 border-t">
          <div className="flex gap-2">
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
            )}
            {isEditMode && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Simpan
              </button>
            )}
            <button
              onClick={() => onDelete(formData.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md  hover:bg-gray-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCash;

