import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiPackage, FiBook } from "react-icons/fi";
import { MdOutlineSpaceDashboard, MdOutlineBusinessCenter } from "react-icons/md";
import { BsPersonFillDown, BsShop } from "react-icons/bs";
import { PiShippingContainerDuotone } from "react-icons/pi";

interface SidebarProps {
  role: "direktur" | "kepala-divisi" | "pelanggan";
  isOpen: boolean; // Status apakah sidebar terbuka atau tidak
  toggleSidebar: () => void; // Fungsi untuk menutup sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, toggleSidebar }) => {
  const currentPath = usePathname();

  const rolePrefix = `/dashboard/${role}`;

  const menus = [
    { label: "Home", link: "/", icon: FiHome, roles: ["direktur", "kepala-divisi", "pelanggan"] },
    { label: "Dashboard", link: `${rolePrefix}`, icon: MdOutlineSpaceDashboard, roles: ["direktur", "kepala-divisi", "pelanggan"] },
    { label: "Pengelolaan Produk", link: `${rolePrefix}/pengelolaan-produk`, icon: FiPackage, roles: ["kepala-divisi"] },
    { label: "Data Transaksi", link: `${rolePrefix}/data-transaksi`, icon: FiBook, roles: ["kepala-divisi"] },
    { label: "Permintaan Sewa", link: `${rolePrefix}/permintaan-sewa`, icon: BsPersonFillDown, roles: ["kepala-divisi"] },
    { label: "Kelola Booth", link: `${rolePrefix}/kelola-booth`, icon: PiShippingContainerDuotone, roles: ["kepala-divisi"] },
    { label: "Pemantauan Bisnis", link: `${rolePrefix}/pemantauan-bisnis`, icon: MdOutlineBusinessCenter, roles: ["direktur", "kepala-divisi"] },
    { label: "Pengajuan Sewa", link: `${rolePrefix}/pengajuan-sewa`, icon: BsPersonFillDown, roles: ["pelanggan"] },
    { label: "Booth Saya", link: `${rolePrefix}/booth-saya`, icon: BsShop, roles: ["pelanggan"] },
  ];

  const filteredMenus = menus.filter((menu) => menu.roles.includes(role));

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-full bg-foreground border-r border-gray-200 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:w-64`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <div className="px-2 pt-8 pb-10 font-black text-center text-primary">
          <Link href="/" className="text-primary text-2xl">
            Warung UMKM Riau
          </Link>
        </div>
        <ul className="space-y-2 font-medium">
          {filteredMenus.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.link}
                onClick={toggleSidebar}
                className={`flex items-center p-2 rounded-lg ${
                  currentPath === menu.link
                    ? "bg-[#2f68351b] text-primary font-bold"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <menu.icon
                  className={`w-5 h-5 ${
                    currentPath === menu.link ? "text-primary" : "text-gray-500"
                  }`}
                />
                <span className="ms-3">{menu.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;