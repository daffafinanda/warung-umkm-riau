"use client";
import {
    MdOutlineEmail,
    MdOutlineLocalPhone,
    MdLocationPin,
    MdOutlineMessage,
  } from "react-icons/md";
  import Accordion from "@/app/components/accordion"; // Pastikan lokasi impor sesuai dengan struktur proyek Anda
  
  export default function TentangFrame() {
    return (
      <section className="max-w-6xl mx-auto min-h-screen flex flex-col text-black">
        <div className="flex-grow container mx-auto px-4 py-8">
          {/* About Us Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Tentang Kami</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Selamat Datang di Toko Online Kami
              </h2>
              <p className="mb-4">
                Didirikan pada tahun 2010, Toko Online kami telah menjadi
                destinasi utama untuk berbagai produk berkualitas tinggi. Kami
                berkomitmen untuk menyediakan pengalaman berbelanja yang mudah,
                aman, dan memuaskan bagi semua pelanggan kami.
              </p>
              <p className="mb-4">
                Visi kami adalah menjadi platform e-commerce terkemuka yang
                menghubungkan produsen lokal dengan konsumen di seluruh Indonesia.
                Kami percaya bahwa dengan memanfaatkan teknologi dan layanan
                pelanggan yang unggul, kami dapat memberikan nilai tambah bagi
                komunitas kami.
              </p>
              <h3 className="text-xl font-semibold mb-2">Mengapa Memilih Kami?</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Produk berkualitas tinggi dari merek terpercaya</li>
                <li>Pengiriman cepat ke seluruh Indonesia</li>
                <li>Layanan pelanggan 24/7</li>
                <li>Jaminan kepuasan dan pengembalian mudah</li>
                <li>Program loyalitas pelanggan yang menguntungkan</li>
              </ul>
              <p>
                Kami berterima kasih atas kepercayaan Anda dan berkomitmen untuk
                terus meningkatkan layanan kami. Selamat berbelanja di Toko Online
                kami!
              </p>
            </div>
          </div>
  
          <h1 className="text-3xl font-bold mb-8 text-center">Hubungi Kami</h1>
  
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Informasi Kontak</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MdLocationPin className="w-5 h-5 mr-3 text-primary" />
                  <p>Jl. Contoh No. 123, Kota Anda, 12345</p>
                </div>
                <div className="flex items-center">
                  <MdOutlineLocalPhone className="w-5 h-5 mr-3 text-primary" />
                  <p>+62 123 4567 890</p>
                </div>
                <div className="flex items-center">
                  <MdOutlineEmail className="w-5 h-5 mr-3 text-primary" />
                  <p>info@tokoonline.com</p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Jam Operasional</h3>
                <p>Senin - Jumat: 09:00 - 17:00</p>
                <p>Sabtu: 09:00 - 15:00</p>
                <p>Minggu: Tutup</p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Hubungi kami via Chat</h3>
                <button className="w-full flex items-center justify-center bg-primary  text-white py-2 px-4 rounded hover:bg-background hover:text-primary shadow-lg">
                  <MdOutlineMessage className="w-5 h-5 mr-2" />
                  WhatsApp
                </button>
              </div>
            </div>
  
            {/* FAQ Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Pertanyaan Umum (FAQ)</h2>
              <Accordion 
                items={[
                  {
                    title: "Bagaimana cara melakukan pemesanan?",
                    content:
                      "Untuk melakukan pemesanan, pilih produk yang Anda inginkan, tambahkan ke keranjang, dan ikuti proses checkout. Pastikan Anda telah login atau daftar sebagai pelanggan baru sebelum menyelesaikan pemesanan.",
                  },
                  {
                    title: "Apa metode pembayaran yang tersedia?",
                    content:
                      "Kami menerima pembayaran melalui transfer bank, kartu kredit, e-wallet, dan pembayaran di tempat (COD) untuk area tertentu. Pilihan pembayaran lengkap akan ditampilkan saat proses checkout.",
                  },
                  {
                    title: "Berapa lama waktu pengiriman?",
                    content:
                      "Waktu pengiriman tergantung pada lokasi Anda dan jasa pengiriman yang dipilih. Biasanya, pengiriman membutuhkan waktu 2-5 hari kerja.",
                  },
                  {
                    title: "Apakah saya bisa mengembalikan produk?",
                    content:
                      "Ya, Anda dapat mengembalikan produk dalam waktu 7 hari setelah menerima barang, selama produk masih dalam kondisi asli dan belum digunakan.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
  