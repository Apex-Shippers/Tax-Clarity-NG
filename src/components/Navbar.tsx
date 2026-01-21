import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-green">
              {/* Scale Icon SVG */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M7 21h10" />
                <path d="M12 3v18" />
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
              </svg>
            </div>
            <span className="font-bold text-xl text-darkGreen tracking-tight">
              TaxClarityNG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/index"
              className="text-gray-600 hover:text-green font-medium text-base transition-colors"
            >              Home
            </Link>
            <Link
              to="rule-library"
              className="text-gray-600 hover:text-green font-medium text-base transition-colors"
            >              Rule Library
            </Link>
            <Link
              to="/tax-calculator"
              className="text-gray-500 hover:text-green font-medium text-base transition-colors"
            >
              Tax Calculator
            </Link>
            <Link
              to="/status"
              className="bg-lightGreen hover:bg-green text-white font-medium px-6 py-2.5 rounded-sm transition-colors shadow-sm cursor-pointer"
            >
              Check my Status
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer p-2"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col items-center">
            <Link
              to="/index"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green hover:bg-gray-50 rounded-md w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >              Home
            </Link>
            <Link
              to="/rule-library"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green hover:bg-gray-50 rounded-md w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >              Rule Library
            </Link>
            <Link
              to="/tax-calculator"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-green hover:bg-gray-50 rounded-md w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tax Calculator
            </Link>
            <Link
              to="/status"
              className="w-full bg-lightGreen text-white font-medium px-4 py-3 rounded-sm shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Check my Status
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}