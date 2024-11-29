"use client";

import { ReactNode, useState } from "react";
import Navbar from "@/app/dashboard/navbar";
import Sidebar from "@/app/dashboard/sidebar";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  // Ekstraksi peran pengguna dari URL
  const userRole = pathname.split("/")[2] as "direktur" | "kepala-divisi" | "pelanggan";

  // State untuk toggle sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar role={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 ">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />
        {/* Main Content */}
        <main className="py-6 mt-10 md:mt-12 ">{children}</main>
      </div>

      {/* Overlay untuk menutup sidebar di layar kecil */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;
