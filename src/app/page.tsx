import React from "react";
import Navbar from "@/layout/common/navbar";
import HomeFrame from "@/layout/landing-page/homeFrame";
import ProdukFrame from "@/layout/landing-page/produkFrame";

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
      </main>
    </>
  );
};

export default HomePage;
