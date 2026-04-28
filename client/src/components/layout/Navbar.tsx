import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import logo from "@/assets/logo.png";

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.gallery"), path: "/gallery" },
    { name: t("nav.books", "Books"), path: "/gallery?tab=Books" }
  ];

  return (
    <nav className="w-full bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] fixed top-0 z-50">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Brand / Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <Link to="/" className="relative flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-300 overflow-hidden border border-primary/5 shadow-inner">
            <img 
              src={logo} 
              alt="MA Logo" 
              className="w-full h-full object-contain p-1.5"
              onError={(e) => {
                // Fallback to a better styled initials layout if the image isn't loaded
                (e.target as HTMLImageElement).outerHTML = `<div class="flex items-center justify-center w-full h-full bg-primary/10 text-primary font-bold text-xl tracking-tighter">MA</div>`;
              }}
            />
          </Link>
          <span className="font-bold text-base tracking-tight text-slate-800 group-hover:text-primary transition-colors duration-300">Muhammad Ali</span>
        </motion.div>

        {/* Desktop Navigation Links */}
        <motion.ul 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hidden md:flex items-center gap-10 text-gray-600 font-medium text-sm"
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

        {/* Right Side: Desktop Socials & Mobile Menu Toggle */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 md:gap-4"
        >
          <LanguageSwitcher />

          <div className="hidden md:flex">
            <SocialLinks size="sm" />
          </div>

          <button 
            className="md:hidden p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 space-y-4">
              {links.map((link) => {
                const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '');
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block font-medium text-lg ${isActive ? 'text-primary' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-4 pb-2 border-t border-slate-100 mt-2">
                <span className="text-sm font-medium text-slate-500 mb-3 block">Connect</span>
                <SocialLinks size="sm" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
