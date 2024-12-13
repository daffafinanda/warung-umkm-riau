'use client';

import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Layanan", href: "/layanan" },
    { name: "Produk", href: "/produk" },
    { name: "Tentang", href: "/tentang" },
  ];

  return (
    <nav className="bg-background fixed w-full h-auto z-20 top-0 start-0 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-lg font-black font-outfit whitespace-nowrap text-primary md:text-2xl">
            Warung UMKM Riau
          </span>
        </a>
        <div className="flex md:order-2 space-x-1 md:space-x-4 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white text-sm bg-primary hover:bg-[#2f68358a] focus:ring-4 focus:outline-none focus:ring-[#2f683527] font-medium rounded-lg px-2 py-0 text-center shadow-md hover:shadow-lg md:px-5 md:py-3"
          >
            Masuk
          </button>
          <button
            type="button"
            className="text-primary text-sm bg-foreground hover:bg-[#2f68351b] focus:ring-4 focus:outline-none focus:ring-[#2f683527] font-medium rounded-lg px-2 py-0 text-center shadow-md hover:shadow-lg md:px-5 md:py-3"
          >
            Daftar
          </button>

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary rounded-lg md:hidden hover:bg-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${isMenuOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:bg-background">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`block py-2 px-3 rounded md:p-0 ${
                    pathname === item.href
                      ? "text-primary font-bold"
                      : "text-gray-900 hover:bg-gray-200 md:hover:bg-transparent md:hover:text-primary"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
