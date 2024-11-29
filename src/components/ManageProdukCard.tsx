import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  dimensions: string;
  image: string;
  onEdit?: (id: number) => void; // Callback untuk tombol Edit
  onDelete?: (id: number) => void; // Callback untuk tombol Hapus
}

const ManageProductCard: React.FC<Product> = ({ id, name, price, dimensions, image, onEdit, onDelete }) => {
  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
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
        {/* Tombol Edit dan Hapus */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onEdit?.(id)} // Memanggil fungsi onEdit jika disediakan
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(id)} // Memanggil fungsi onDelete jika disediakan
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProductCard;
