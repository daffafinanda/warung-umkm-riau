"use client";
import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";  // Import modal

interface Product {
  id: number;
  name: string;
  price: number;
  dimensions: string;
  image: string;
  description: string;
}
const ProdukFrame: React.FC = () => {
  // Data produk dengan deskripsi
  const products = [
    {
      id: 1,
      name: "Meja",
      price: 50000,
      dimensions: "3x3x3",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
      description: "Meja kayu dengan desain minimalis, cocok untuk berbagai ruang.",
    },
    {
      id: 2,
      name: "Lemari",
      price: 75000,
      dimensions: "4x4x6",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
      description: "Lemari penyimpanan besar dengan banyak ruang dan rak.",
    },
    {
      id: 3,
      name: "Kursi",
      price: 30000,
      dimensions: "2x2x3",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
      description: "Kursi nyaman dengan bahan berkualitas tinggi.",
    },
    {
      id: 4,
      name: "Rak",
      price: 40000,
      dimensions: "3x2x2",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
      description: "Rak penyimpanan yang simpel namun elegan.",
    },
  ];

  // State untuk mengelola modal yang terbuka
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Menangani klik pada ProductCard untuk membuka modal
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Menutup modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-8 gap-4">
          <div className="max-w-xl text-black">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">Katalog Produk</h2>
            <p className="text-muted-foreground md:text-xl">
              Kami membuat produk yang berkualitas dengan harga yang terjangkau
            </p>
            <p className="text-muted-foreground md:text-xl">
              Klik selengkapnya jika ingin melihat produk lainnya.
            </p>
          </div>
          {/* Tombol responsif */}
          <div className="items-center">
            <button className="hover:bg-foreground bg-primary text-white hover:text-primary md:px-12 md:py-5 px-6 py-3 rounded-full shadow-lg self-start">
              Selengkapnya {'>>'}
            </button>
          </div>
        </div>

        {/* Grid untuk menampilkan produk */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-black">
          {products.map((product) => (
            <div key={product.id} className="w-full shadow-lg hover:shadow-xl rounded-lg">
              <ProductCard 
                {...product}
                onClick={() => handleProductClick(product)}  // Menambahkan event onClick untuk membuka modal
              />
            </div>
          ))}
        </div>
      </div>

      {/* Menampilkan modal ketika ada produk yang dipilih */}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </section>
  );
};

export default ProdukFrame;
