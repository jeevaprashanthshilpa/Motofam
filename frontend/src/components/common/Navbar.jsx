import { Sun, Moon, PlusCircle, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-surface-header text-surface-headerText px-6 py-4 sticky top-0 z-40 border-b border-surface-border shadow-md transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
            THEMOTO<span className="text-surface-primary">FAM</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          <Link to="/bikes" className="hover:text-surface-primary transition-colors">
            Browse Bikes
          </Link>
          <Link to="/compare" className="hover:text-surface-primary transition-colors">
            Compare Specs
          </Link>
          <Link to="/seller/add-bike" className="flex items-center gap-1.5 hover:text-surface-primary transition-colors">
            <PlusCircle size={16} /> Sell Bike
          </Link>
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 border border-surface-border rounded-lg text-xs font-bold hover:bg-neutral-800 transition"
          >
            <User size={14} /> Login
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full border border-neutral-700 bg-neutral-900 text-white hover:text-surface-primary transition cursor-pointer"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}