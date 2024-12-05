"use client";
import React, { useState } from "react";
import ProductCard from "@/components/ProductCard"; // Sesuaikan dengan path komponen Anda
import { FaPlus } from "react-icons/fa";
import ProductFormModal from "@/components/ProductForm"; // Import the new modal component
import ConfirmationPopup from "@/components/ConfirmationPopUp";
import ProductDetailModal from "@/components/ProductDetailModal"; // Add a new component for product details

interface Product {
  id: number;
  name: string;
  price: number;
  dimensions: string;
  image: string;
  description: string;
}

const PengelolaanProduk: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Produk A", price: 50000, dimensions: "10x10", image: "https://i.pinimg.com/736x/3d/e6/62/3de6629d3894212dff66f2586580df95.jpg", description: "Deskripsi produk Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa" },
    { id: 2, name: "Produk B", price: 75000, dimensions: "15x15", image: "https://i.pinimg.com/736x/3d/e6/62/3de6629d3894212dff66f2586580df95.jpg", description: "Deskripsi produk B" },
  ]);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: Date.now(),
    name: "",
    price: 0,
    dimensions: "",
    image: "",
    description: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);

  // New state to control product details modal visibility
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setIsPopUpOpen(true);
    setIsEditing(false); // Set to add mode
    setCurrentProduct({
      id: Date.now(),
      name: "",
      price: 0,
      dimensions: "",
      image: "",
      description: "",
    });
  };

  const handleSaveProduct = (product: Product) => {
    if (isEditing) {
      // Update the existing product
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    } else {
      // Add a new product
      setProducts((prev) => [...prev, { ...product, id: Date.now(), image: imageFile || product.image }]);
    }
    setIsPopUpOpen(false);
    setImageFile(null);
  };

  const handleEditProduct = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setIsPopUpOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      // Proceed with the deletion logic, for example:
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete.id)
      );
      setProductToDelete(null);
    }
    setShowConfirmation(false); // Fix variable name here
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setShowConfirmation(false); // Fix variable name here
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImageFile(fileURL);
      setCurrentProduct({ ...currentProduct, image: fileURL });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle displaying product details in a modal
  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product); // Set the selected product to show in the modal
  };

  return (
    <div className="p-6">
      <button
        onClick={handleAddProduct}
        className="bg-primary shadow-xl border-primary w-full flex items-center justify-center font-semibold text-lg text-white px-4 py-3 rounded-lg mb-6 hover:bg-primary hover:bg-opacity-80  hover:scale-95 transition-all duration-200 ease-in-out"
      >
        <FaPlus />
        <span className="ml-2">Tambah Produk</span>
      </button>
      <div className="grid grid-cols-2 text-black md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-foreground shadow-xl rounded-lg">
            <ProductCard
              {...product}
              onClick={() => handleViewProductDetails(product)} // Handle click to view details
            />
            <div className="flex space-x-2 pb-4 px-4 justify-center">
              <button
                onClick={() => handleEditProduct(product)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 w-full"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(product)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 w-full"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductFormModal
        isOpen={isPopUpOpen}
        onClose={() => setIsPopUpOpen(false)}
        onSave={handleSaveProduct}
        product={currentProduct}
        imageFile={imageFile}
        onFileChange={handleFileChange}
        onInputChange={handleInputChange}
      />

      {/* Confirmation Popup */}
      {showConfirmation && productToDelete && (
        <ConfirmationPopup
          title="Konfirmasi Penghapusan"
          message={`Apakah Anda yakin ingin menghapus ${productToDelete.name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={!!selectedProduct} // Show if selectedProduct is not null
          onClose={() => setSelectedProduct(null)} // Close when user dismisses
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default PengelolaanProduk;
