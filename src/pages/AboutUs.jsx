import React from 'react';
import { Info } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-slate-950 text-gray-800 dark:text-slate-100 py-10 px-4">
      <div className="p-8 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl max-w-3xl mx-auto mt-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 p-3 rounded-full">
            <Info className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 dark:text-indigo-200 tracking-tight">
            About WaliinInvest
          </h1>
        </div>

        <hr className="mb-6 border-indigo-200 dark:border-indigo-800/50" />

        <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl leading-relaxed font-medium">
          WaliinInvest is a revolutionary platform created to simplify and democratize the
          process of buying, selling, and transferring company shares. Whether you're an
          investor from Ethiopia or abroad, our platform provides a secure, transparent,
          and user-friendly way to become a part of our growing community.
        </p>

        <p className="mt-6 text-gray-600 dark:text-gray-300 text-base md:text-lg italic">
          We believe in financial inclusion and empowerment through technology. Our mission
          is to bridge the gap between opportunity and access by offering all stakeholders
          a digital space to manage their equity involvement with ease.
        </p>
      </div>
    </div>
  );
}
