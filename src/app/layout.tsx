import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from 'next/font/google';
import { ModalProvider } from "@/components/ModalContext"; // Import ModalProvider
import Modals from "@/components/Modals"; // Import Modals

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Warung UMKM Riau",
  description: "Penyewaan dan Penjualan Barang UMKM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${outfit.variable} antialiased`}>
        <ModalProvider>
          <Modals /> {/* Render Modals */}
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
