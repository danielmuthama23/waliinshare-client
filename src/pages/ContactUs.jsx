import React from 'react';
import { Mail, Phone, MapPin, Headphones } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-slate-950 text-gray-800 dark:text-slate-100 py-10 px-4">
      <div className="bg-indigo-500/90 dark:bg-indigo-600/50 text-center text-white p-6 rounded-xl mb-8 shadow-md max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white/90 text-indigo-600 p-3 rounded-full mb-4">
            <Headphones className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to WaliinShare customer support center</h2>
          <p className="text-base text-white/95 max-w-md">
            You can contact us for any inquiries, requests, suggestions & comments regarding WaliinShare using our multiple channels.
          </p>
        </div>
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 shadow-xl rounded-2xl max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-200 mb-6 border-b border-indigo-200 dark:border-indigo-800/50 pb-2">
          Contact Us
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
          We'd love to hear from you! If you have any questions, feedback, or would like to connect with us,
          feel free to reach out through the options below.
        </p>
        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <Mail className="text-indigo-600 dark:text-indigo-300 w-6 h-6 mt-1" />
            <span>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@waliinshare.com" className="text-indigo-600 dark:text-indigo-300 underline">
                support@waliinshare.com
              </a>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="text-indigo-600 dark:text-indigo-300 w-6 h-6 mt-1" />
            <span>
              <strong>Phone:</strong> +1 (234) 567-8901 / +251 912 345 678
            </span>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="text-indigo-600 dark:text-indigo-300 w-6 h-6 mt-1" />
            <span>
              <strong>Address:</strong> 123 Innovation Blvd, Addis Ababa, Ethiopia / 456 Tech Ave, NY, USA
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
