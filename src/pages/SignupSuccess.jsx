import React from 'react';
import Confetti from 'react-confetti';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function SignupSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const fullName = location.state?.fullName || 'User';

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C1F0DC] via-[#B2E6F4] to-[#A3D8E7] dark:from-slate-900 dark:via-slate-950 dark:to-black text-center px-6 sm:px-4 text-gray-900 dark:text-slate-100">
      <Confetti width={windowWidth} height={windowHeight} recycle={false} />
      <motion.div
        className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}
      >
        <FaCheckCircle className="text-[#16896D] text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#2F4DA2] dark:text-indigo-200 mb-2">Welcome, {fullName}!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Your WaliinShare account has been successfully created. You’re all set to start investing!
        </p>
        <button onClick={() => navigate('/signin')} className="bg-[#2F4DA2] hover:bg-[#1A3C85] text-white px-6 py-2 rounded-md font-semibold transition">
          Go to Sign In
        </button>
      </motion.div>
    </div>
  );
}
