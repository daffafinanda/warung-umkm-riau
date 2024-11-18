import React from "react";

const HomeFrame: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col max-w-6xl mx-auto md:flex-row items-center justify-between gap-12">
        {/* Teks dan Button */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-black font-bold text-3xl pb-8 md:text-5xl leading-tight md:leading-[60px]">
            Dukung <span className="text-[#2F6835]">Usaha UMKM</span> dengan Akses Mudah ke{" "}
            <span className="text-[#2F6835]">Barang dan Peralatan Berkualitas</span>!
          </h1>
          <p className="text-black font-normal pb-16 text-base md:text-xl leading-relaxed mt-4 md:mt-6">
            Menyediakan berbagai barang dan peralatan UMKM berkualitas yang bisa dibeli atau
            disewa dengan mudah.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-2 justify-center md:justify-start px-6">
            <button className="flex items-center justify-center md:px-16 px-4 py-3 bg-[#2F6835] text-white font-medium text-sm md:text-xl rounded-full shadow-md leading-relaxed text-center">
              Produk Kami
            </button>
            <button className="flex items-center justify-center md:px-16 px-4 py-3 bg-[#F6F6F6] text-[#2F6835] font-medium text-sm md:text-xl rounded-full shadow-md leading-relaxed text-center">
              Layanan Kami
            </button>
          </div>
        </div>

        {/*Gambar*/}
        <div className="flex-1 justify-center hidden md:block">
          <div
            className="w-full min-w-[400px] h-[600px] rounded-t-full"
            style={{
              backgroundImage: `url('https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HomeFrame;
