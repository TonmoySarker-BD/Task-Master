import React from 'react';
import { FaRocket, FaHistory } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-primary to-secondary shadow-xl sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto">
        {/* Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                ></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gradient-to-br from-primary to-secondary rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl text-white"
            >
              <li>
                <Link 
                  to="/" 
                  className={`text-lg font-semibold hover:bg-white/20 transition-all ${
                    location.pathname === '/' ? 'bg-white/30 text-white' : 'text-white/90'
                  }`}
                >
                  <FaListCheck className="text-lg" />
                  Task Prioritizer
                </Link>
              </li>
              <li>
                <Link 
                  to="/history" 
                  className={`text-lg font-semibold hover:bg-white/20 transition-all ${
                    location.pathname === '/history' ? 'bg-white/30 text-white' : 'text-white/90'
                  }`}
                >
                  <FaHistory className="text-lg" />
                  Priority History
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 ml-2">
            <div className="p-2 bg-white/20 rounded-xl">
              <FaRocket className="text-2xl text-white" />
            </div>
            <Link to="/" className="text-2xl font-bold text-white hover:text-white/90 transition-colors">
              TaskMaster Pro
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link 
                to="/" 
                className={`flex items-center gap-3 text-lg font-semibold px-6 py-3 rounded-2xl transition-all ${
                  location.pathname === '/' 
                    ? 'bg-white text-primary shadow-lg' 
                    : 'text-white/90 hover:bg-white/20 hover:text-white'
                }`}
              >
                <FaListCheck className="text-xl" />
                Task Prioritizer
              </Link>
            </li>
            <li>
              <Link 
                to="/history" 
                className={`flex items-center gap-3 text-lg font-semibold px-6 py-3 rounded-2xl transition-all ${
                  location.pathname === '/history' 
                    ? 'bg-white text-primary shadow-lg' 
                    : 'text-white/90 hover:bg-white/20 hover:text-white'
                }`}
              >
                <FaHistory className="text-xl" />
                Priority History
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side - Status Badge */}
        <div className="navbar-end">
          <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold text-sm">AI Powered</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;