import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Key Metrics", "dUSD", "dLEND", "Liquidity"];
  const location = useLocation();

  const isActive = (item: string) => {
    const path = `/${item.toLowerCase().replace(" ", "-")}`;
    return location.pathname === path || (location.pathname === "/" && item === "Key Metrics");
  };

  return (
    <nav className="bg-surface border-b border-white/10 px-6 py-4">
      <div className="flex items-center">
        <div className="text-2xl font-bold text-primary">dTRINITY</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 ml-8">
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className={`transition-colors ${
                isActive(item)
                  ? "text-primary font-semibold"
                  : "text-text-primary hover:text-primary"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-text-primary ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className={`transition-colors ${
                  isActive(item)
                    ? "text-primary font-semibold"
                    : "text-text-primary hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;