"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedPageProps {
    children: React.ReactNode;
  }
  
  const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Jika token tidak ada, arahkan ke halaman login
      router.replace('/login');
    } else {
      // Opsional: Validasi token dengan server
    //   validateToken(token).catch(() => {
    //     // Jika validasi gagal, hapus token dan arahkan ke halaman login
    //     localStorage.removeItem('token');
    //     router.replace('/login');
    //   });
    }
  }, [router]);

//   const validateToken = async (token: string) => {
//     const response = await fetch('https://your-api-url.com/validate-token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Invalid token');
//     }
//   };

  return <>{children}</>;
};

export default ProtectedPage;
