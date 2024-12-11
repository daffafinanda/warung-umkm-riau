'use client';
import React, { useState } from "react";
import Navbar from "@/app/landing-page/bar/navbar";
import ProductCard from "@/components/ProductCard"; // Adjust the path as necessary
import ProductDetailModal from "@/components/ProductDetailModal";

interface Product {
  id: number;
  name: string;
  price: number;
  dimensions: string;
  image: string;
  description: string;
  onClick: () => void;  // Function to handle clicks
}

const ProdukPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State to hold the selected product

  // Sample product data
  const products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      price: 50000,
      dimensions: "10x10 cm",
      image: "https://i.pinimg.com/236x/53/8c/4d/538c4d0009fcca642f886eaf281bfcea.jpg",
      description: "Product 1 description",
      onClick: () => alert("Product 1 clicked"),
    },
    {
      id: 2,
      name: "Product 2",
      price: 100000,
      dimensions: "20x20 cm",
      image: "https://via.placeholder.com/150",
      description: "Product 2 description",
      onClick: () => alert("Product 2 clicked"),
    },
    {
      id: 3,
      name: "Product 3",
      price: 75000,
      dimensions: "15x15 cm",
      image: "https://via.placeholder.com/150",
      description: "Product 3 description",
      onClick: () => alert("Product 3 clicked"),
    },
    {
      id: 4,
      name: "Product 4",
      price: 50000,
      dimensions: "10x10 cm",
      image: "https://i.pinimg.com/236x/53/8c/4d/538c4d0009fcca642f886eaf281bfcea.jpg",
      description: "Product 4 description",
      onClick: () => alert("Product 4 clicked"),
    },
    {
      id: 5,
      name: "Product 5",
      price: 100000,
      dimensions: "20x20 cm",
      image: "https://via.placeholder.com/150",
      description: "Product 5 description",
      onClick: () => alert("Product 5 clicked"),
    },
    {
      id: 6,
      name: "Product 6",
      price: 75000,
      dimensions: "15x15 cm",
      image: "https://via.placeholder.com/150",
      description: "Product 6 description",
      onClick: () => alert("Product 6 clicked"),
    },
    {
      id: 7,
      name: "Product 7",
      price: 50000,
      dimensions: "10x10 cm",
      image: "https://i.pinimg.com/236x/53/8c/4d/538c4d0009fcca642f886eaf281bfcea.jpg",
      description: "Product 7 description",
      onClick: () => alert("Product 7 clicked"),
    },
    {
      id: 8,
      name: "Product 8",
      price: 100000,
      dimensions: "20x20 cm",
      image: "https://via.placeholder.com/150",
      description: "Product 8 description",
      onClick: () => alert("Product 8 clicked"),
    },
    {
      id: 9,
      name: "Product 9",
      price: 75000,
      dimensions: "15x15 cm",
      image: "https://via.placeholder.com/150",
      description: "Product 9 description",
      onClick: () => alert("Product 9 clicked"),
    },
    {
      id: 10,
      name: "Product 10",
      price: 50000,
      dimensions: "10x10 cm",
      image: "https://i.pinimg.com/236x/53/8c/4d/538c4d0009fcca642f886eaf281bfcea.jpg",
      description: "Product 10 description",
      onClick: () => alert("Product 10 clicked"),
    },
    {
      id: 11,
      name: "Product 11",
      price: 100000,
      dimensions: "20x20 cm",
      image: "https://via.placeholder.com/150",
      description: "Product 11 description",
      onClick: () => alert("Product 11 clicked"),
    },
    {
      id: 12,
      name: "Product 12",
      price: 75000,
      dimensions: "15x15 cm",
      image: "https://via.placeholder.com/150",
      description: "Product 12 description",
      onClick: () => alert("Product 12 clicked"),
    },
    
  ];
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Clear the selected product
  };

  return (
    <>
      <Navbar />
      <main className="p-8 mt-20">
          <div className="max-w-full mx-auto justify-center lg:max-w-6xl">
          <h1 className="text-3xl font-bold mb-6 text-black">Produk - produk yang kami buat di Warung UMKM Riau</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="shadow-lg hover:shadow-xl">
              <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              dimensions={product.dimensions}
              image={product.image}
              onClick={() => openModal(product)}
              />
            </div>
          ))}
        </div>
        </div>
      </main>
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default ProdukPage;
