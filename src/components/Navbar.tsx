import { Link } from "react-router-dom";

const Navbar = () => {
  const menuItems = ["Key Metrics", "dUSD", "dLEND", "Liquidity"];

  return (
    <nav className="bg-surface border-b border-white/10 px-6 py-4">
      <div className="flex items-center space-x-8">
        <div className="text-2xl font-bold text-primary">dTRINITY</div>
        <div className="flex space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className="text-text-primary hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;