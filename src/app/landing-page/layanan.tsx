import { CiCreditCard1 } from "react-icons/ci";
import { GoContainer } from "react-icons/go"; 
import { IoCashOutline } from "react-icons/io5";
import React from "react";

const LayananFrame: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center text-black">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Apa saja layanan kami?
          </h2>
          <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Kami menawarkan produk dengan menyediakan opsi transaksi penyewaan
            serta pembelian yang dapat dilakukan secara cash maupun kredit
          </p>
        </div>
        <div className="grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8 mx-auto">
          {/* Card untuk Cash */}
          <div className="relative flex flex-col items-center p-12 bg-foreground shadow-md rounded-3xl space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
              <IoCashOutline className="text-6xl text-green"/>
            </div>
            <h3 className="text-xl font-semibold text-black">Cash</h3>
            <p className="text-sm text-gray-600 text-center">
              Pembayaran langsung secara lunas
            </p>
          </div>
          {/* Card untuk Kredit */}
          <div className="relative flex flex-col items-center p-12 bg-[#FCFCFC] shadow-md rounded-3xl space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg ">
                <CiCreditCard1 className="text-6xl text-green" />
            </div>
            <h3 className="text-xl font-semibold text-black">Kredit</h3>
            <p className="text-sm text-gray-600 text-center">
              Pembayaran dengan uang muka serta cicilan hingga 5x
            </p>
          </div>
          {/* Card untuk Sewa */}
          <div className="relative flex flex-col items-center p-12 bg-[#FCFCFC] shadow-md rounded-3xl space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
              <GoContainer className="text-6xl text-green"/>
            </div>
            <h3 className="text-xl font-semibold text-black">Sewa</h3>
            <p className="text-sm text-gray-600 text-center">
              Penyewaan booth
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default LayananFrame