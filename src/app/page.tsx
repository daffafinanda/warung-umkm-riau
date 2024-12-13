import React from "react";
import Navbar from "@/app/(main page)/navbar";
import HomeFrame from "@/app/(main page)/home/homeFrame";
import ProdukFrame from "@/app/(main page)/home/produkFrame";
import LayananFrame from "./(main page)/home/layanan";
import TentangFrame from "./(main page)/home/tentang";
import Footer from "./(main page)/footer";

const HomePage: React.FC = () => {
  

  return (
    <>
      <Navbar />
      <main className="relative px-12 py-24 md:px-40 md:py-32">
        <HomeFrame />
        <ProdukFrame />
        <LayananFrame />
        <TentangFrame />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
