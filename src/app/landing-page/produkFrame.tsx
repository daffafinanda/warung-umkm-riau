import React from "react";
import ProductCard from "@/app/components/productCard";

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
            <button className=" hover:bg-foreground bg-green text-white hover:text-green md:px-12 md:py-5 px-6 py-3 rounded-full shadow-lg self-start md:">
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
