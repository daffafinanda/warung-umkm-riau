import React from "react";
import ProductCard from "@/layout/components/productCard";

interface Product {
  id: number;
  name: string;
  price: number;
  dimensions: string;
  image: string;
}

interface ProdukFrameProps {
  products: Product[];
}

const ProdukFrame: React.FC<ProdukFrameProps> = ({ products }) => {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div className="max-w-xl text-black">
            <h2 className="text-3xl font-bold mb-2">Katalog Produk</h2>
            <p className="text-muted-foreground">
              Kami membuat produk yang berkualitas dengan harga yang terjangkau
            </p>
            <p className="text-muted-foreground">
              Klik selengkapnya jika ingin melihat produk lainnya.
            </p>
          </div>
          <button className="bg-[#447455] hover:bg-[#365e44] text-white px-4 py-2 rounded-md">
            Selengkapnya {'>'}
          </button>
        </div>

        {/* Menggunakan grid dengan 4 kolom per tampilan besar (lg) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-black">
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
