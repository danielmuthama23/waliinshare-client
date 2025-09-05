import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from '../utils/axios';
import logo from '../assets/logo.jpg';

export default function SignIn() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/auth/signin`, formData);
      const userDetails = res.data.user;
      sessionStorage.setItem('userId', userDetails.id || userDetails._id);
      if (res.data.token) {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
        sessionStorage.setItem('userId', userDetails.id || userDetails._id);
        navigate('/dashboard');
      }
    } catch (err) {
      setErrors({ general: err.response?.data?.message || 'Login failed. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D2F4EA] via-[#B8E4F2] to-[#A3D8E7] dark:from-slate-900 dark:via-slate-950 dark:to-black flex items-center justify-center px-4 py-10 text-gray-100">
      <motion.div
        className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg text-gray-800 dark:text-slate-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Waliin Logo" className="h-12 mb-2" />
          <h2 className="text-3xl font-bold text-[#2F4DA2] dark:text-indigo-200">Welcome Back</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md pr-10 focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.password ? 'border-red-500' : ''}`}
            />
            <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-300" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}

          <button type="submit" disabled={loading} className="w-full bg-[#2F4DA2] hover:bg-[#1A3C85] text-white py-2 rounded-md font-semibold transition">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#16896D] hover:underline font-medium">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
