import { useState } from 'react';

interface Product {
  name: string;
  size: string;
  price: number;
  quantity: number;
}

interface FormData {
  date: string;
  name: string;
  phone: string;
  address: string;
  products: Product[];
  total: number;
  paymentProof: File | null;
}

const TransactionFormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split('T')[0],
    name: '',
    phone: '',
    address: '',
    products: [{ name: '', size: '', price: 0, quantity: 1 }],
    total: 0,
    paymentProof: null,
  });

  const [errorFields, setErrorFields] = useState<string[]>([]);

  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
    const updatedProducts = [...formData.products];
    (updatedProducts[index][field] as string | number) = value;
    const newTotal = updatedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setFormData({ ...formData, products: updatedProducts, total: newTotal });
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: '', size: '', price: 0, quantity: 1 }],
    });
  };

  const removeProduct = (index: number) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    const newTotal = updatedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setFormData({ ...formData, products: updatedProducts, total: newTotal });
  };

  const handleSubmit = () => {
    const requiredFields = ['name', 'phone', 'address'];
    const errors = requiredFields.filter((field) => !formData[field as keyof FormData]);

    if (errors.length > 0) {
      setErrorFields(errors);
      return;
    }

    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-lg font-bold mb-4">Form Riwayat Transaksi Sewa</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 capitalize">Tanggal</label>
          <input
            type="date"
            value={formData.date}
            readOnly
            className="bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 capitalize">Nama <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black ${errorFields.includes('name') ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errorFields.includes('name') && <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 capitalize">Nomor HP <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black ${errorFields.includes('phone') ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errorFields.includes('phone') && <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 capitalize">Alamat <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className={`bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black ${errorFields.includes('address') ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errorFields.includes('address') && <p className="text-red-500 text-xs mt-1">Field ini harus diisi!</p>}
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Produk</h3>
          {formData.products.map((product, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center mt-2">
              <input
                type="text"
                placeholder="Nama Produk"
                value={product.name}
                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                className="col-span-4 bg-gray-50 rounded-md border shadow-inner px-3 py-2 text-black border-gray-300"
              />
              <input
                type="text"
                placeholder="Ukuran"
                value={product.size}
                onChange={(e) => handleProductChange(index, 'size', e.target.value)}
                className="col-span-2 bg-gray-50 rounded-md border shadow-inner px-3 py-2 text-black border-gray-300"
              />
              <input
                type="number"
                placeholder="Harga"
                value={product.price}
                onChange={(e) => handleProductChange(index, 'price', Number(e.target.value))}
                className="col-span-2 bg-gray-50 rounded-md border shadow-inner px-3 py-2 text-black border-gray-300"
              />
              <input
                type="number"
                placeholder="Jumlah"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, 'quantity', Number(e.target.value))}
                className="col-span-2 bg-gray-50 rounded-md border shadow-inner px-3 py-2 text-black border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeProduct(index)}
                className="col-span-2 text-red-500 hover:underline"
              >
                Hapus
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addProduct}
            className="mt-2 text-blue-500 hover:underline"
          >
            Tambah Produk
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 capitalize">Total</label>
          <input
            type="text"
            value={formData.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            readOnly
            className="bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black border-gray-300"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 capitalize">Bukti Pembayaran</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFormData({ ...formData, paymentProof: e.target.files?.[0] || null })}
            className="bg-gray-50 mt-1 block w-full rounded-md border shadow-inner px-3 py-2 text-black border-gray-300"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="mr-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFormModal;
