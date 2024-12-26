"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedPageProps {
  children: React.ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname(); // Mendapatkan URL saat ini

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Simpan halaman tujuan sebelum diarahkan ke login
      const loginUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      router.replace(loginUrl);
    }
  }, [router, pathname]);

  return <>{children}</>;
};

export default ProtectedPage;
