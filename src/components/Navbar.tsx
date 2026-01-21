import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-red-500 grid place-items-center">
      {/* Tablet X Desktop menu */}
      <div className="hidden md:flex">
        {/* LOGO */}
        <div className="bg-slate-800 flex justify-between"></div>

        {/* Navigation links and CTA button */}
        <div className="flex gap-2 items-center">
          <Link to="/" className="text-gray-300 hover:text-gray-600">
            Rule Library
          </Link>
          <Link
            to="/tax-calculator"
            className="text-gray-300 hover:text-gray-600"
          >
            Tax Calculator
          </Link>
          <button className="bg-green-300 rounded-2xl px-2 py-1 text-white hover:bg-green-600">
            Check my Status
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="flex md:hidden justify-between items-center">
        {/* LOGO */}
        <div className=""></div>

        {/* Hamburger menu */}
        <div className=""></div>
      </div>
    </nav>
  );
}
