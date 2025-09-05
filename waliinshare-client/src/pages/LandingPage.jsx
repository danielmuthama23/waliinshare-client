import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpg';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, ease: [0.25, 0.1, 0.25, 1], duration: 0.7 } }
};
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

export default function LandingPage() {
  const [shares, setShares] = useState(0);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (shares <= 0) {
      alert('Please enter a valid number of shares.');
      return;
    }
    sessionStorage.setItem('selectedShares', shares);
    navigate('/signup');
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="min-h-screen bg-[#f6f8fa] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#0a0f1c] dark:to-[#000000] text-gray-800 dark:text-white relative overflow-hidden transition-colors duration-700 ease-in-out"
    >
      {/* Background Rings - Dark only */}
      <div className="absolute inset-0 hidden dark:flex items-center justify-center z-0">
        <div className="w-[500px] h-[500px] bg-gradient-to-tr from-[#16896D]/20 via-[#2F4DA2]/10 to-transparent rounded-full blur-2xl animate-pulse" />
        <div className="absolute w-[350px] h-[350px] border border-[#16896D]/30 rounded-full animate-spin-slow" />
        <div className="absolute w-[150px] h-[150px] border border-[#2F4DA2]/30 rounded-full animate-spin-reverse" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-10">
        <motion.img src={logo} alt="Waliin Logo" className="h-20 mb-8 drop-shadow-md" variants={item} />
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide text-[#2F4DA2] dark:text-white" variants={item}>
          Invest Confidently with <span className="text-[#17e3a4]">WaliinInvest</span>
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mb-8 leading-relaxed" variants={item}>
          A smooth, trusted platform to buy and transfer shares — faster, easier, and always secure.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4 items-center justify-center" variants={item}>
          <input
            type="number"
            placeholder="Enter shares"
            className="px-5 py-3 w-64 rounded-md text-center bg-white dark:bg-[#1e293b] border border-[#d1d5db] dark:border-[#17e3a4]/50 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#17e3a4]/60 transition"
            value={shares}
            onChange={(e) => setShares(parseInt(e.target.value || '0', 10))}
          />
          <button
            onClick={handleProceed}
            className="px-6 py-3 rounded-md bg-[#17e3a4] text-black font-medium hover:bg-[#13d1a1] transition duration-300 shadow-sm"
          >
            Get Started
          </button>
        </motion.div>

        <motion.p className="mt-4 text-sm text-gray-600 dark:text-gray-400" variants={item}>
          Already have an account?{' '}
          <Link to="/signin" className="text-[#17e3a4] hover:underline">Sign in here</Link>
        </motion.p>
      </main>
    </motion.div>
  );
}
