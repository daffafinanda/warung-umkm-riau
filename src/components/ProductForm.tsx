"use client";
import React, { ChangeEvent } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  dimensions: string;
  description: string;
  image: string; // The image property in the product data
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product;
  imageFile: string | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
  imageFile,
  onFileChange,
  onInputChange,
}) => {
  if (!isOpen) return null;

  // Gunakan gambar yang sudah ada jika tidak ada gambar baru
  const imageToDisplay = imageFile || product.image;

  // Validasi input
  const handleSave = () => {
    const { name, price, dimensions, description } = product;

    if (!name || price === 0 || !dimensions || !description || !imageToDisplay) {
      alert("Harap isi semua field yang ada");
      return;
    }

    // Panggil fungsi onSave jika validasi lolos
    onSave(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-full overflow-auto text-black">
        <h3 className="text-xl font-bold mb-4">{product.id ? "Edit Produk" : "Tambah Produk Baru"}</h3>
        
        {/* Input Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Nama Produk<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            name="name"
            value={product.name}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Harga<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="w-full border rounded-lg p-2"
            name="price"
            value={product.price === 0 ? "" : product.price}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Dimensi<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            name="dimensions"
            value={product.dimensions}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Deskripsi<span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full border rounded-lg p-2"
            name="description"
            value={product.description}
            onChange={onInputChange}
          />
        </div>
        
        {/* Image Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Gambar<span className="text-red-500">*</span>
          </label>
          <div className="w-full">
            <label
              htmlFor="fileUpload"
              className="block cursor-pointer border text-gray-700 text-center py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Pilih Gambar
            </label>
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
            
            {/* Display selected or existing image */}
            {imageToDisplay && (
              <div className="mt-2 border rounded-lg bg-white p-2">
                <p className="text-sm font-medium text-gray-700">Gambar yang dipilih:</p>
                <img
                  src={imageToDisplay}
                  alt="Pratinjau Gambar"
                  className="mt-2 max-h-40 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
