import React from "react";
import ProductCard from "@/app/components/ProductCard";

const ProdukFrame: React.FC = () => {
  // Data produk didefinisikan langsung di dalam komponen
  const products = [
    {
      id: 1,
      name: "Meja",
      price: 50000,
      dimensions: "3x3x3",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
    },
    {
      id: 2,
      name: "Meja",
      price: 50000,
      dimensions: "3x3x3",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
    },
    {
      id: 3,
      name: "Meja",
      price: 50000,
      dimensions: "3x3x3",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
    },
    {
      id: 4,
      name: "Meja",
      price: 50000,
      dimensions: "3x3x3",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
    },
  ];

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

        {/* Menggunakan grid dengan 4 kolom per tampilan besar (lg) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-black">
          {products.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProdukFrame;
