"use client"; 
import React from "react";
import Accordion from "@/components/Accordion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';


const TentangPage: React.FC = () => {
  return (
    <>
    <main className="px-8">
      <div className="min-h-screen bg-background flex flex-col items-center py-4 px-4">
      {/* Header Section */}
      <header className="text-center text-primary mb-8">
        <h1 className="text-4xl font-bold ">Tentang Warung UMKM Riau</h1>
        <p className="text-lg text-white rounded-md py-1 px-2 bg-opacity-85 bg-primary mt-2">&quot;Meningkatkan Ekonomi Masyarakat Secara Mandiri&quot;</p>
      </header>

      {/* Content Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Siapa Kami</h2>
          <p className="text-gray-700 leading-relaxed">
            Selamat datang di Warung UMKM Riau, mitra terpercaya bagi pelaku usaha mikro, kecil, dan menengah (UMKM) di Indonesia. Kami hadir sejak tahun 2020 dengan visi untuk mendukung dan memperkuat sektor UMKM melalui layanan penjualan dan penyewaan berbagai kebutuhan usaha.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Layanan Kami</h2>
          <p className="text-gray-700 leading-relaxed">
            Kami menyediakan beragam produk berkualitas seperti booth container, meja, etalase, gerobak, kursi, dan booth lainnya yang dirancang untuk mendukung kebutuhan bisnis Anda. Dengan solusi yang fleksibel dan inovatif, kami berkomitmen menjadi bagian dari perjalanan sukses Anda.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Misi Kami</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>Memberikan akses mudah bagi pelaku UMKM untuk mendapatkan perlengkapan usaha dengan harga terjangkau.</li>
            <li>Mendukung pertumbuhan UMKM melalui produk yang praktis, efisien, dan sesuai dengan kebutuhan pasar.</li>
            <li>Membantu pelaku usaha menciptakan peluang mandiri dengan memanfaatkan layanan penyewaan yang fleksibel.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Kontak Kami</h2>
          <div className="text-gray-700 leading-relaxed">
            <p className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              Perum Padi Mas Citra 1 Block B/4, Kelurahan Sialang Mungu, Kecamatan Tuah Madani, Kota Pekanbaru - Riau
            </p>
            <p className="flex items-center mb-2">
              <FaPhone className="text-green-500 mr-2" />
              [Masukkan Nomor Telepon Anda]
            </p>
            <p className="flex items-center">
              <FaEnvelope className="text-blue-500 mr-2" />
              [Masukkan Email Anda]
            </p>
          </div>
        </section>
      <div className="mt-8 text-black">
            <h2 className="text-2xl text-black font-semibold mb-4">Pertanyaan Umum (FAQ)</h2>
            <Accordion
              items={[
                {
                  title: "Bagaimana cara melakukan pemesanan?",
                  content:
                    "Untuk melakukan pemesanan, anda dapat menghubungi kami melalui WhatsApp atau sosial media kami. Refrensi model yang dapat anda gunakan, bisa anda lihat pada halaman Produk",
                },
                {
                  title: "Bagaimana cara melakukan penyewaan booth?",
                  content:
                    "Untuk melakukan penyewaan, anda dapat beralih ke halaman Layanan dan memilih tab Sewa, setelah membaca aturan sewa, anda dapat melakukan penyewaan. Silakan hubungi kami untuk informasi lebih lanjut.",
                },
                {
                  title: "Apa metode pembayaran yang tersedia?",
                  content:
                    "Kami menerima pembayaran melalui transfer bank, pembayaran tunai, dan pembayaran online melalui platform pembayaran terkait. Silakan hubungi kami untuk informasi lebih lanjut.",
                },
                {
                  title: "Berapa lama waktu pembuatan dari pemesanan?",
                  content:
                    "Waktu pembuatan tergantung model dari desain produk yang diinginkan. Silakan hubungi kami untuk informasi lebih lanjut.",
                },
                {
                  title: "Berapa harga dari penyewaan ?",
                  content:
                    "Saat ini kami hanya menyedian jasa penyewaan Booth Container dengan harga perbulannya Rp, 300.000,00. Silakan hubungi kami untuk informasi lebih lanjut.",
                },
              ]}
            />
          </div>
      </div>
      </div>
    </main>
  </>
  )
}
export default TentangPage;