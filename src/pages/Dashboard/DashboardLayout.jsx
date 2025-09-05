import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears token and redirects to /signin
  };

  const navItems = [
    { name: 'Home', path: '/dashboard' },
    { name: 'My Shares', path: '/dashboard/myshares' },
    { name: 'Buy', path: '/dashboard/buy' },
    { name: 'Sell', path: '/dashboard/sell' },
    { name: 'Transfer', path: '/dashboard/transfer' },
    { name: 'Analytics', path: '/dashboard/analytics' },
    { name: 'Profile', path: '/dashboard/profile' },
    { name: 'Approve/Reject shares', path: '/dashboard/pending-transfers' },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#E7F0FF] via-[#F9F9F9] to-[#D8E8F9] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-[#2F4DA2] text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">WaliinInvest</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? 'bg-white text-[#2F4DA2]'
                    : 'hover:bg-white hover:text-[#2F4DA2]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;