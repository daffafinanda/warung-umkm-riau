import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  dimensions: string;
  image: string;
}

const ProductCard: React.FC<Product> = ({ id, name, price, dimensions, image }) => {
  return (
    <div
      key={id}
      className="bg- rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-square relative">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{name}</h3>
        <p className="text-muted-foreground mt-1">
          Rp. {price.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {dimensions}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
