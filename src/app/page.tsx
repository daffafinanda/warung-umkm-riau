export default function Home() {
  return (
    <div className="min-h-screen bg-bgLight font-outfit">
      {/* Navbar */}
      <nav className="flex items-center justify-between h-[140px] px-8 bg-white shadow-md">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary text-green">Warung UMKM Riau</div>

        {/* Menu */}
        <ul className="flex space-x-8 text-lg font-medium text-black">
          <li className="hover:text-primary">
            <a href="#home" className="text-primary">Home</a>
          </li>
          <li className="hover:text-primary">
            <a href="#produk">Produk</a>
          </li>
          <li className="hover:text-primary">
            <a href="#layanan">Layanan</a>
          </li>
          <li className="hover:text-primary">
            <a href="#tentang">Tentang</a>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="px-6 py-2 text-primary border border-primary rounded-md hover:bg-primary hover:text-white">
            Daftar
          </button>
          <button className="px-6 py-2 text-white bg-primary rounded-md hover:bg-opacity-90">
            Masuk
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex items-center justify-center h-[calc(100vh-140px)]">
        <h1 className="text-4xl font-semibold text-primary">
          Selamat Datang di Warung UMKM Riau!
        </h1>
      </main>
    </div>
  );
}
