// components/ProductDetailModal.tsx
import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  dimensions: string;
  image: string;
  deskripsi: string;
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl items-center justify-center w-full transition-transform transform ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-4xl focus:outline-none hover:text-gray-800 transition-all"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Product Image */}
          <div className="w-full md:w-1/3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg transition-all transform hover:scale-105"
            />
          </div>
          {/* Product Details */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-xl text-gray-500 mb-4">Harga: Rp{product.price}</p>
            <p className="text-sm text-gray-400 mb-4">{product.dimensions}</p>
            <p className="text-md text-gray-600 mb-4">{product.deskripsi}</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="bg-primary text-white px-4 py-2 rounded-lg text-lg font-semibold transition-all hover:bg-opacity-70 focus:outline-none"
              >
                Close
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
