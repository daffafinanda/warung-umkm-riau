import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import ConfirmationPopup from "@/components/ConfirmationPopUp";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [accountName, setAccountName] = useState<string | null>("");
  const pathname = usePathname();
  const actorRoles = ["direktur", "kepala-divisi", "pelanggan"];
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLogoutVisible, setLogoutVisible] = useState(false);

  useEffect(() => {
    const biodata = localStorage.getItem("biodata");
    if (biodata) {
      try {
        const parsedBiodata = JSON.parse(biodata);
        setAccountName(parsedBiodata.nama || "User");
      } catch (error) {
        console.error("Failed to parse biodata:", error);
        setAccountName("User");
      }
    } else {
      const role = localStorage.getItem("role");
      setAccountName(role || "User");
    }
  }, []);

  const getPageTitle = (path: string) => {
    const pathSegments = path.split("/").filter(Boolean);

    if (actorRoles.includes(pathSegments[0])) {
      if (pathSegments.length > 1) {
        return pathSegments[1]
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }
      return "Dashboard";
    }

    return "Loading...";
  };

  const pageTitle = pathname ? getPageTitle(pathname) : "Loading...";

  const handleLogout = () => {
    localStorage.clear();
    setDropdownOpen(false);
    setLogoutVisible(false);
    router.push("/");
  };
  const handleCanceLogout = () => {
    setLogoutVisible(false);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="top-0">
      <div className="fixed right-0 left-0 z-30 lg:left-64 bg-foreground text-primary border-b px-4 py-6 flex justify-between items-center">
        {/* Menu Icon */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-primary hover:text-gray-400 lg:hidden focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FiMenu className="w-6 h-6" />
          </button>

          {/* Page Title */}
          <div className="text-xl font-bold text-left ml-4">{pageTitle}</div>
        </div>

        {/* User Account */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="font-semibold text-primary">{accountName}</span>
            <FiChevronDown className="w-6 h-6 font-semibold text-black ml-2" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-100 text-black shadow-lg rounded-md overflow-hidden z-10">
              <button
                onClick={() => setLogoutVisible(true)}
                className="w-full text-left block px-4 py-2 hover:bg-primary hover:bg-opacity-25 hover:text-primary focus:outline-none focus:bg-gray-500 focus:text-white"
              >
                Logout
              </button>
              {isLogoutVisible && (
                        <ConfirmationPopup
                          title="Konfirmasi Logout"
                          message="Apakah Anda yakin ingin logout?"
                          onConfirm={handleLogout}
                          onCancel={handleCanceLogout}
                          confirmText="Ya, Logout"
                          cancelText="Batal"
                        />
                      )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
