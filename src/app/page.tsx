import React from "react";
import Navbar from "@/app/landing-page/bar/navbar";
import HomeFrame from "@/app/landing-page/homeFrame";
import ProdukFrame from "@/app/landing-page/produkFrame";
import LayananFrame from "./landing-page/layanan";
import TentangFrame from "./landing-page/tentang";
import Footer from "./landing-page/bar/footer";

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
