// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';

export default function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'relative text-[#17e3a4] dark:text-[#17e3a4] font-semibold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#17e3a4]'
      : 'text-gray-700 dark:text-gray-300 hover:text-[#17e3a4] transition-all duration-300';

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white dark:bg-gradient-to-br dark:from-[#0f172a]/90 dark:to-[#0a0f1c]/90 backdrop-blur-md border-b border-gray-200 dark:border-[#2F4DA2]/30 px-6 py-4 flex justify-between items-center shadow-lg transition-colors duration-700"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <motion.img
          src={logo}
          alt="Waliin Logo"
          className="w-10 h-10 rounded-xl border border-[#17e3a4]/60 shadow-md hover:shadow-[#17e3a4]/50 hover:scale-105 transition"
          whileHover={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 0.6 }}
        />
        <h1 className="text-2xl font-extrabold tracking-wide text-[#2F4DA2] dark:text-white drop-shadow-md">
          <span className="text-[#17e3a4]">Waliin</span><span>Invest</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6 text-sm lg:text-base font-medium">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/about" className={linkClass}>About Us</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
        <NavLink to="/faq" className={linkClass}>FAQ</NavLink>
        <NavLink to="/blog" className={linkClass}>Blog</NavLink>
        <NavLink to="/terms" className={linkClass}>Terms</NavLink>
        <NavLink to="/signup" className={linkClass}>Sign Up</NavLink>
        <NavLink to="/signin" className={linkClass}>Sign In</NavLink>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle with AnimatePresence */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.button
            key={darkMode ? 'sun' : 'moon'}
            onClick={() => setDarkMode(!darkMode)}
            className="text-[#17e3a4] hover:text-[#2F4DA2] transition"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </motion.button>
        </AnimatePresence>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-[#17e3a4]">
          <FaBars size={22} />
        </div>
      </div>
    </motion.header>
  );
}