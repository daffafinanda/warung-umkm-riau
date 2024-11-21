import React from "react";
import Navbar from "@/app/landing-page/bar/navbar";
import HomeFrame from "@/app/landing-page/homeFrame";
import ProdukFrame from "@/app/landing-page/produkFrame";
import LayananFrame from "./landing-page/layanan";
import TentangFrame from "./landing-page/tentang";
import Footer from "./landing-page/bar/footer";

const HomePage: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Meja",
      price: 50000,
      dimensions: "3x3x3",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
    },
    {
      id: 2,
      name: "Meja",
      price: 50000,
      dimensions: "3x3x3",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
    },
    {
      id: 3,
      name: "Meja",
      price: 50000,
      dimensions: "3x3x3",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
    },
    {
      id: 4,
      name: "Meja",
      price: 50000,
      dimensions: "3x3x3",
      image: "https://i.pinimg.com/736x/84/a5/22/84a5227a7adbf9e64388c54af4ff248d.jpg",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="relative px-12 py-24 md:px-40 md:py-32">
        <HomeFrame />
        <ProdukFrame products={products} />
        <LayananFrame />
        <TentangFrame />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
