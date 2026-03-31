import { Mail } from "lucide-react";
import { motion } from "framer-motion";

// Cleanly constrained inline SVGs to fix the massive icon blowout
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);

import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Books", path: "/#books" }
  ];

  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-12 py-4 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] fixed top-0 z-50">
      
      {/* Brand / Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center space-x-3 cursor-pointer group"
      >
        <Link to="/" className="relative flex items-center justify-center w-12 h-12 bg-transparent rounded-lg group-hover:bg-primary/5 transition-colors overflow-hidden">
          <img 
            src="/src/assets/logo.png" 
            alt="MA Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to the text layout if the image isn't loaded yet
              (e.target as HTMLImageElement).outerHTML = `<span class="text-2xl font-bold tracking-tighter text-gray-900" style="font-family: sans-serif;">M<span class="absolute left-3.5 top-3">A</span></span>`;
            }}
          />
        </Link>
        <span className="font-bold text-sm tracking-tight text-gray-800">Muhammad Ali</span>
      </motion.div>

      {/* Navigation Links */}
      <motion.ul 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="hidden md:flex items-center space-x-10 text-gray-600 font-medium text-sm"
      >
        {links.map((link) => {
          const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '');
          
          return (
            <li key={link.name}>
              <Link 
                to={link.path}
                className={`transition-all duration-300 relative group py-2 ${isActive ? 'text-primary' : 'hover:text-primary'}`}
              >
                {link.name}
                <span className={`absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </li>
          );
        })}
      </motion.ul>

      {/* Social Links Container */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-3"
      >
        <a href="#" aria-label="LinkedIn" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm">
          <LinkedinIcon className="w-[18px] h-[18px]" />
        </a>
        <a href="#" aria-label="Facebook" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-blue-800 hover:bg-blue-800 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm">
          <FacebookIcon className="w-[18px] h-[18px]" />
        </a>
        <a href="#" aria-label="Email" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-red-500 hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm">
          <Mail className="w-5 h-5" />
        </a>
      </motion.div>
      
    </nav>
  );
}
