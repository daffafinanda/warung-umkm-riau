"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MdOutlineArrowBackIos } from "react-icons/md";

interface User {
  nik: string;
  nama: string;
  alamat: string;
  jenis_kelamin: string;
  alamat_domisili: string;
  foto_ktp: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRented, setIsRented] = useState<boolean>(false);
  const router = useRouter(); // Initialize useRouter for navigation

  useEffect(() => {
    // Retrieve user ID from local storage
    const id = localStorage.getItem('id_akun');
    console.log(id);

    if (!id) {
      setError('ID not found in local storage');
      setLoading(false);
      return;
    }

    const biodata = localStorage.getItem('biodata');

    if (!biodata) {
      router.push('/biodata-baru');
    }
    // Fetch user data from API
    axios
      .get(`https://backend-umkm-riau.vercel.app/api/biodata/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setUser(response.data.data);
        setLoading(false);
        axios
          .get(`https://backend-umkm-riau.vercel.app/api/penyewaan/${response.data.data.nik}`)
          .then((penyewaanResponse) => {
            if (penyewaanResponse.data) {
              setIsRented(true); // If user has penyewaan, set isRented to true
            }
          })
          .catch(() => {
            console.log("No penyewaan record found");
          });
      })
      .catch(() => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleBackClick = () => {
    router.push('/pelanggan'); // Navigate to /pelanggan when back button is clicked
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-background shadow-lg  px-4 sm:px-6 lg:px-8">
        <div className="p-4 max-w-3xl mx-auto ">
          {/* Breadcrumb */}
          <div className="mb-4 flex flex-col">
              <span className="text-gray-800 font-semibold">/Biodata</span>
            <button
              onClick={handleBackClick}
              className="flex items-center text-primary hover:underline mb-4"
                      >
               <MdOutlineArrowBackIos className="mr-2" />
                Kembali
            </button> 
        </div>
      <div className="max-w-3xl mx-auto bg-foreground rounded-2xl shadow-xl overflow-hidden">
          <div className='p-8'>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Biodata Penyewa</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Data Pribadi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="Nama" value={user.nama} />
                <InfoItem label="NIK" value={user.nik} />
                <InfoItem label="Jenis Kelamin" value={user.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'} />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Alamat</h2>
              <div className="grid grid-cols-1 gap-4">
                <InfoItem label="Alamat KTP" value={user.alamat} />
                <InfoItem label="Alamat Domisili" value={user.alamat_domisili} />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Foto KTP</h2>
              <div className="mt-2 border-2 flex items-center justify-center border-gray-300 border-dashed rounded-lg p-2">
                <img
                  src={user.foto_ktp}
                  alt="KTP"
                  width={600}
                  height={400}
                  className="rounded-lg justify-center"
                  />
                  </div>
              </div>
            </div>

            {!isRented && (
              <div className="mt-8 border-t pt-6">
                <p className="text-lg text-gray-700 mb-4">Anda sudah tidak ingin menyewa lagi? Anda dapat menghapus biodata.</p>
                <button
                  onClick={() => ""}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                >
                  Hapus Biodata
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 px-4 py-3 rounded-lg">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg text-gray-900">{value}</p>
    </div>
  );
}
