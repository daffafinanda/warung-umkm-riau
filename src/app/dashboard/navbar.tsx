import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi"; // Menu Icon

// Fungsi untuk mengubah string menjadi title case
const toTitleCase = (str: string) => {
  return str
    .replace(/([^\w\d]+)/g, " ") // Mengganti semua karakter non-alphanumeric dengan spasi
    .split(" ") // Memisahkan kata-kata
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Mengubah huruf pertama jadi kapital
    )
    .join(" "); // Menyatukan kembali kata-kata
};

interface NavbarProps {
  toggleSidebar: () => void; // Callback untuk membuka/tutup Sidebar
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [title, setTitle] = useState("Dashboard");
  const [isClient, setIsClient] = useState(false); // State untuk memastikan render di klien
  const currentPath = usePathname(); // Mendapatkan rute saat ini

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    // Memastikan bahwa komponen hanya di-render di klien
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Jangan lakukan perubahan sebelum komponen dirender di klien

    const segments = currentPath.split("/").filter(Boolean);
    const pathLength = segments.length;

    if (pathLength > 2) {
      const lastSegment = segments[segments.length - 1];

      if (
        lastSegment !== "kepala-divisi" &&
        lastSegment !== "pelanggan" &&
        lastSegment !== "direktur"
      ) {
        setTitle(toTitleCase(lastSegment));
      } else {
        setTitle("Dashboard");
      }
    } else {
      setTitle("Dashboard");
    }
  }, [currentPath, isClient]);

  return (
    <nav className="fixed bg-foreground text-green px-6 py-8 w-full shadow-md z-10">
      <div className="flex items-center justify-between">
        {/* Menu Icon untuk Sidebar */}
        <button
          onClick={toggleSidebar}
          className="flex items-center pr-8 text-green-700 lg:hidden"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* Judul Dinamis Berdasarkan Path */}
        <div className="text-2xl font-bold text-left flex-grow">
          {title}
        </div>

        {/* User Account - Selalu Terlihat */}
        <div className="relative flex items-center ml-auto">
          <div className="flex items-center">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="text-lg font-medium">Pelanggan</div>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-foreground text-black rounded-md shadow-lg w-48 border-2 z-20">
                <button
                  onClick={() => alert("Logged out")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;