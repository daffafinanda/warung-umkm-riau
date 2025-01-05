import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const LayananSewa: React.FC = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isPelanggan, setIsPelanggan] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Mendapatkan role dari localStorage
    const role = localStorage.getItem('role');
    if (role === 'KEPALA DIVISI' || role === 'DIREKTUR') {
      setIsPelanggan(false);
    }
  }, []);

  return (
    <div className="min-h-screen rounded-xl bg-foreground shadow-lg">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-primary mb-6">Tatacara Penyewaan Booth Container</h1>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>
            <span className="font-semibold">Login atau Daftar Akun:</span> Jika belum memiliki akun, silakan daftar terlebih dahulu.
          </li>
          <li>
            <span className="font-semibold">Isi Formulir Data Diri:</span> Formulir ini harus dilengkapi dengan foto KTP.
          </li>
          <li>
            <span className="font-semibold">Ajukan Formulir Penyewaan:</span> Isi data untuk keperluan pengajuan sewa booth.
          </li>
          <li>
            <span className="font-semibold">Proses Survey:</span> Data yang diajukan akan diverifikasi melalui survey langsung.
          </li>
          <li>
            <span className="font-semibold">Penyerahan Booth & Pembayaran:</span> Setelah disetujui, booth akan diserahkan, dan user dapat langsung membayar biaya sewa.
          </li>
        </ol>

        <div className="mt-12 bg-primary bg-opacity-5 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-primary mb-4">Term & Condition</h2>
          <p className="text-gray-600 leading-relaxed">
            Dengan menggunakan layanan ini, Anda dianggap telah membaca dan menyetujui ketentuan berikut:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            <li>Pengguna wajib mengisi data diri dengan benar dan menyertakan foto KTP yang valid.</li>
            <li>Penyewaan booth hanya dapat dilakukan oleh pengguna yang telah lolos verifikasi.</li>
            <li>Pembayaran biaya sewa harus dilakukan tepat waktu sesuai dengan ketentuan.</li>
            <li>Penyewa bertanggung jawab atas kerusakan booth selama masa sewa.</li>
            <li>Perusahaan berhak untuk membatalkan penyewaan jika ditemukan pelanggaran.</li>
          </ul>
        </div>

        <div className="mt-8 bg-primary bg-opacity-5 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-primary mb-4">Privacy Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            Kami menghargai privasi pengguna. Data yang dikumpulkan, termasuk foto KTP dan informasi pribadi, hanya akan digunakan untuk proses verifikasi dan keperluan penyewaan. Kami tidak akan membagikan data pengguna kepada pihak ketiga tanpa izin. Dengan menggunakan layanan kami, Anda menyetujui kebijakan privasi ini.
          </p>
        </div>

        {isPelanggan && (
          <>
            <div className="mt-10 flex items-center space-x-4">
              <input
                type="checkbox"
                id="agreeCheckbox"
                className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded checked:bg-primary"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              <label htmlFor="agreeCheckbox" className="text-gray-700">
                Saya menyetujui seluruh persyaratan yang telah ditetapkan.
              </label>
            </div>

            <div className="mt-6 text-center">
              <button
                className={`px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75 ${
                  isAgreed ? 'bg-primary text-white hover:bg-opacity-90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={() => {
                  router.push('/biodata-baru');
                }}
                disabled={!isAgreed}
              >
                {isAgreed ? <FaCheck className="inline-block mr-2" /> : null} Isi formulir penyewaan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LayananSewa;
