import React from 'react';
import { FaFacebookF, FaYoutube, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo.jpg';

export default function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f172a] text-sm text-gray-700 dark:text-gray-400 transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Branding & Social Links */}
        <div className="flex items-center gap-4">
          <img
            src={logo}
            className="h-8 w-8 rounded-full object-contain border border-[#17e3a4]/40 shadow-sm"
            alt="Waliin logo"
          />
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4488e8] transition duration-300"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#cb3c3c] transition duration-300"
            >
              <FaYoutube size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4578e7] transition duration-300"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center md:text-right">
          &copy; {new Date().getFullYear()} Waliin Invest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}