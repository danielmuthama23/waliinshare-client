import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
      <Link to="/admin" className="p-4 text-indigo-700 font-bold text-xl border-b block">
  Waliin Admin
</Link>
        <nav className="p-4 space-y-2 text-gray-700">
          <Link to="/admin/users" className="block hover:text-indigo-600">User Management</Link>
          <Link to="/admin/subadmins" className="block hover:text-indigo-600">Sub Admins</Link>
          <Link to="/admin/company-value" className="block hover:text-indigo-600">Company Value</Link>
          <Link to="/admin/documents" className="block hover:text-indigo-600">Documents</Link>
          <Link to="/admin/buy-sell" className="block hover:text-indigo-600">Buy/Sell Approval</Link>
          <Link to="/admin/transfer" className="block hover:text-indigo-600">Transfer Share</Link>
          <Link to="/admin/underage" className="block hover:text-indigo-600">Underage Shareholders</Link>
          <Link to="/admin/blogs" className="block hover:text-indigo-600">Blogs</Link>
          <Link to="/admin/analytics" className="block hover:text-indigo-600">Analytics</Link>
          <Link to="/admin/payments" className="block hover:text-indigo-600">Payments</Link>
          <Link to="/admin/revenue" className="block hover:text-indigo-600">Revenue Cut</Link>
          <Link to="/admin/chat" className="block hover:text-indigo-600">Chat Manager</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Admin Dashboard</h1>
        
        <Outlet />
      </main>
    </div>
  );
}