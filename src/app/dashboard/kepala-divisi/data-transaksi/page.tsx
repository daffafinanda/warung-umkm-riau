"use client";


import TabLayout from "@/components/TabLayout";
import TabLayout2 from "@/components/TabLayout2";
import dynamic from "next/dynamic";

// Lazy Load Konten
const RiwayatPenyewaan = dynamic(() => import("./transaksi-sewa"));
const TransaksiCash = dynamic(() => import("./transaksi-cash"));
const TransaksiKredit = dynamic(() => import("./transaksi-kredit"));

const DataTransaksi: React.FC = () => {
  // State untuk tab Penjualan (Cash dan Kredit)
 

  const tabs = [
    {
      label: "Penyewaan",
      content: (
        <div >
          
        <RiwayatPenyewaan />
        </div>
      ),
    },
    {
      label: "Penjualan",
      content: (
        <div>
          <h1 className="my-4 text-primary text-2xl font-bold bg-foreground rounded-lg shadow-md p-4">Riwayat Penjualan</h1>
          <TabLayout2
            tabs={[
              { label: "Cash", content: <TransaksiCash /> },
              { label: "Kredit", content: <TransaksiKredit /> },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className=" p-6 rounded-xl mx-auto max-w-sm sm:max-w-full">
      <TabLayout tabs={tabs} />
    </div>
  );
};

export default DataTransaksi;
