"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa"; // Import React Icon untuk akun
import Link from "next/link"; // Import Link dari next/link

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login
  const [username, setUsername] = useState<string>(""); // State untuk username
  const [role, setRole] = useState<string>(""); // State untuk role
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk dropdown
  
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown

  useEffect(() => {
    // Periksa apakah token login ada di localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Ambil username dan role dari localStorage atau API
      const biodata = JSON.parse(localStorage.getItem("biodata") || "{}");

        if (biodata && biodata.data && biodata.data.nama) {
          console.log("Biodata retrieved: ", biodata.data.nama);
          setUsername(biodata.data.nama); // Set username jika biodata tersedia dan valid
        } else {
          console.log("Biodata not available or incomplete.");
          setUsername(""); // Pastikan username tidak di-set jika biodata tidak valid
        }
      setRole(localStorage.getItem("role") || "User"); // Set role, misalnya "Pelanggan" atau "Admin"
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Close dropdown if click is outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up on unmount
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    // Hapus token dari localStorage dan set isLoggedIn ke false
    localStorage.clear();
    setIsLoggedIn(false);
    setIsDropdownOpen(false); // Close dropdown after logout
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
          {/* Tampilkan tombol hanya jika belum login */}
          {!isLoggedIn && (
            <>
              <Link href="/login">
                <button
                  type="button"
                  className="text-white text-sm bg-primary hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-primary focus:ring-opacity-70 font-medium rounded-lg px-2 py-0 text-center shadow-md hover:shadow-lg md:px-5 md:py-3"
                >
                  Masuk
                </button>
              </Link>
              <Link href="/register">
                <button
                  type="button"
                  className="text-primary text-sm bg-foreground hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-primary focus:ring-opacity-50 font-medium rounded-lg px-2 py-0 text-center shadow-md hover:shadow-lg md:px-5 md:py-3"
                >
                  Daftar
                </button>
              </Link>
            </>
          )}
          {/* Ikon akun, username, dan dropdown */}
          {isLoggedIn && role === "PELANGGAN" && (
            <div className="relative flex items-center space-x-2">
              <FaUserCircle className="w-6 h-6 text-primary" />
              <span className="text-primary font-medium">{username}</span> {/* Tampilkan username hanya jika role "Pelanggan" */}
              <span className="text-sm text-gray-500">({role})</span> {/* Tampilkan role */}
              <button
                onClick={toggleDropdown}
                className="flex items-center text-primary hover:text-primary ml-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef} // Attach the ref to the dropdown container
                  className="absolute right-0 top-8 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                >
                  <ul>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-200"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
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