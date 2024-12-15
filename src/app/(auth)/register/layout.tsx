// app/registrasi/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RegistrasiLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    // Mengecek status login dari localStorage atau Cookie
    const token = localStorage.getItem('token'); // Atau cek cookie/token

    if (token) {
      // Jika sudah login, arahkan ke '/'
      router.push('/');
    }
  }, [router]);

  return (
    <div>

        {children} {/* Ini akan merender konten dari page.tsx di dalam folder registrasi */}

    </div>
  );
};

export default RegistrasiLayout;
