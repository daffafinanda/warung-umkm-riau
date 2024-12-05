import React from "react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { usePathname } from "next/navigation";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const pathname = usePathname(); // Ensure usePathname is called at the top level
  const actorRoles = ["direktur", "kepala-divisi", "pelanggan"];

  const getPageTitle = (path: string) => {
    const pathSegments = path.split("/").filter(Boolean); // Split the path by "/" and remove empty segments

    // Case 1: If path only has one segment after "/dashboard", it must be an actor, so show "Dashboard"
    if (pathSegments.length === 2 && actorRoles.includes(pathSegments[1])) {
      return "Dashboard";
    }

    // Case 2: If path has two or more segments (actor and menu), the second segment is the menu
    if (pathSegments.length >= 3 && actorRoles.includes(pathSegments[1])) {
      const menuSegment = pathSegments[2];

      // Format the menu segment from kebab-case to title case (e.g., "permintaan-sewa" => "Permintaan Sewa")
      return menuSegment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    // Default case: If the structure doesn't match, return "Loading..."
    return "Loading...";
  };

  const pageTitle = pathname ? getPageTitle(pathname) : "Loading...";

  return (
    <nav className="top-0">
      <div className="fixed right-0 left-0 lg:left-64 bg-foreground text-primary shadow-md px-4 py-6 flex justify-between items-center">
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
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="text-black font-medium">John Doe</span>
            <FiChevronDown className="w-6 h-6 text-black ml-2" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-md overflow-hidden z-10">
              <a href="/account" className="block px-4 py-2 hover:bg-gray-100">
                Account
              </a>
              <button
                onClick={() => alert("Logout")}
                className="w-full text-left block px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
