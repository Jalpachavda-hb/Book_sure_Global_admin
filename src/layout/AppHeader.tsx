import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import UserDropdown from "../components/header/UserDropdown";
import { useWebSettings } from "../context/WebSettingsContext";

const AppHeader: React.FC = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { logo } = useWebSettings(); // ✅ dynamic logo from context
  const inputRef = useRef<HTMLInputElement>(null);

  // Sidebar Toggle (Desktop vs Mobile)
  const handleToggle = () => {
    if (window.innerWidth >= 1024) toggleSidebar();
    else toggleMobileSidebar();
  };

  // CTRL/CMD + K Focus Shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-9999 flex w-full bg-[#0b1c3a] border-white dark:bg-white-900 dark:border-white-800 lg:border-b">
      <div className="flex w-full flex-col md:flex-row md:px-6">
        {/* Left Section */}
        <div className="flex w-full items-center justify-between px-3 py-3 border-b border-white-200 dark:border-white-800 lg:border-b-0 lg:py-4 lg:px-0">
          
          {/* Sidebar Toggle */}
          <button
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
            className="w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center text-white rounded-lg"
          >
            {isMobileOpen ? (
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.2 7.3a.75.75 0 011.1-1l4.7 4.7 4.7-4.7a.75.75 0 111 1L13 12l4.7 4.7a.75.75 0 11-1 1L12 13 7.3 17.7a.75.75 0 11-1-1L11 12 6.2 7.3z" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 12">
                <path d="M1.3.25h13.3a.75.75 0 010 1.5H1.3a.75.75 0 010-1.5zM1.3 10.25h13.3a.75.75 0 010 1.5H1.3a.75.75 0 010-1.5zM1.3 5.25h6.7a.75.75 0 010 1.5H1.3a.75.75 0 010-1.5z" />
              </svg>
            )}
          </button>

          {/* 🔥 Dynamic Logo (Mobile Only) */}
          <Link to="/" className="md:hidden">
            <img
              className="w-40"
              src={logo || "/images/logo/logo-icon.svg"}
              alt="Logo"
            />
          </Link>

          {/* User Menu (Mobile) */}
          <div className="md:hidden">
            <UserDropdown />
          </div>
        </div>

        {/* Right Section (Desktop Only) */}
        <div className="hidden md:flex items-center justify-end w-full px-0 gap-4">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
