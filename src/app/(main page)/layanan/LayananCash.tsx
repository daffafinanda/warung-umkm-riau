import { FaWhatsapp } from "react-icons/fa";
const LayananCash: React.FC = () => {
  return (
    <div className="min-h-screen rounded-xl bg-foreground shadow-lg">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Tatacara Pembelian Barang
        </h1>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>Hubungi Melalui Whatsapp</li>
          <li>
            Berikan spesifikasi barang yang diinginkan dan model barang yang
            diinginkan
          </li>
          <li>Datang Ke kantor untuk melakukan verifikasi dan pembayaran </li>
        </ol>
        <div className="mt-6 w-full flex justify-center">
          <button className="px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75 flex flex-row gap-3">
            <FaWhatsapp className="text-primary text-3xl"/>
            <h1>Hubungi Kami</h1>
          </button>
        </div>
      </div>
    </div>
  );
};
export default LayananCash;
