import React, { useState } from "react";
import ModalCash from "@/app/dashboard/kepala-divisi/data-transaksi/CashModal";

// Define the type for each order item
interface OrderData {
  id: string;
  tanggal: string;
  buyer: string;
  product: string;
  size: string;
  quantity: number;
  price: string;
  bukti: string;
  paymentType: string;
  address: string;
  phone: string;
  gender: string;
}

const TransaksiCash: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<OrderData | null>(null);

  const data: OrderData[] = [
    {
      id: "001",
      tanggal: "2024-11-28",
      buyer: "John Doe",
      product: "Apple MacBook Pro 17\"",
      size: "17 inch",
      quantity: 1,
      price: "2999",
      bukti: "https://i.pinimg.com/736x/fd/dd/9f/fddd9fb4dd5e11c8ad0c27e2d416ee6f.jpg",
      paymentType: "Credit Card",
      address: "123 Apple Street",
      phone: "123-456-7890",
      gender: "Male",
    },
    // Add other items as needed
  ];

  const openModal = (item: OrderData) => {
    setSelectedData(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedData(null);
    setIsOpen(false);
  };

  // Define onEdit and onDelete functions
  const onEdit = (id: string) => {
    console.log(`Editing item with ID: ${id}`);
    // Implement edit functionality here
  };

  const onDelete = (id: string) => {
    console.log(`Deleting item with ID: ${id}`);
    // Implement delete functionality here
  };

  return (
    <div className="relative px-6 py-4 bg-foreground dark:bg-gray-900 min-h-full">
      {/* Wrapper to enable horizontal scroll only for the table */}
      <div className="overflow-x-auto left-64 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Pembeli</th>
              <th scope="col" className="px-6 py-3">Produk</th>
              <th scope="col" className="px-6 py-3">Jumlah</th>
              <th scope="col" className="px-6 py-3">Harga</th>
              <th scope="col" className="px-6 py-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.buyer}
                </td>
                <td className="px-6 py-4">{item.product}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openModal(item)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Integrasi Modal */}
      {isOpen && selectedData && (
        <ModalCash
          isOpen={isOpen}
          onClose={closeModal}
          onEdit={onEdit}    
          onDelete={onDelete} 
          data={{
            id: selectedData.id,
            tanggal: selectedData.tanggal,
            produk: selectedData.product,
            ukuran: selectedData.size,
            harga: selectedData.price,
            jumlah: selectedData.quantity,
            bukti: selectedData.bukti,
            nama: selectedData.buyer,
            jenisKelamin: selectedData.gender,
            noHp: selectedData.phone,
            alamat: selectedData.address,
          }}
        />
      )}
    </div>
  );
};

export default TransaksiCash;
