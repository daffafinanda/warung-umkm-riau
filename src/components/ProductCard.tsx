import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  dimensions: string;
  image: string;
  onClick: () => void;  // Menambahkan onClick untuk event klik
}

const ProductCard: React.FC<Product> = ({ id, name, price, dimensions, image, onClick }) => {
  // Format harga dengan locale ID
  const formattedPrice = `Rp. ${price.toLocaleString('id-ID')}`;

  return (
    <div
      key={id}
      className="bg-foreground rounded-lg overflow-hidden transition-shadow cursor-pointer"  // Menambahkan cursor-pointer untuk menunjukkan bisa diklik
      onClick={onClick} // Menambahkan onClick untuk menangani klik
    >
      <div className="flex aspect-square items-center justify-center">
        <img
          src={image}
          alt={name}
          className="object-cover max-w-full max-h-full"
        />
      </div>
      <div className="justify-center items-center p-6">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-800 mt-1">{dimensions}</p>
        <p className="text-muted-foreground font-medium mt-1">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
