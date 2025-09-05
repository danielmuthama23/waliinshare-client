import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaSearch, FaFilePdf } from 'react-icons/fa';

export default function Payments() {
  const [allPayments, setAllPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetchPayments();
    fetchUsers();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [allPayments, statusFilter, methodFilter, search, selectedUser]);

  const fetchPayments = async () => {
    try {
      const pending = await axios.get('/admin/purchases/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const verified = await axios.get('/admin/purchases/verified', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const rejected = await axios.get('/admin/purchases/rejected', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const combined = [...pending.data, ...verified.data, ...rejected.data];
      setAllPayments(combined);
    } catch (err) {
      console.error('Error fetching purchases:', err);
      toast.error('Failed to fetch payments');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/all-users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const filterPayments = () => {
    let result = [...allPayments];

    if (statusFilter) result = result.filter(p => p.status === statusFilter);
    if (methodFilter) result = result.filter(p => p.paymentMethod === methodFilter);
    if (search)
      result = result.filter(p =>
        p.userId?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        p.userId?.email?.toLowerCase().includes(search.toLowerCase())
      );
    if (selectedUser)
      result = result.filter(p => p.userId?._id === selectedUser);

    setFilteredPayments(result);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/admin/purchases/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Purchase ${status}`);
      fetchPayments();
    } catch (err) {
      console.error('Status update error:', err);
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">📑 Payment Records</h1>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* 🔍 Search */}
        <div className="flex items-center border rounded px-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by name/email"
            className="ml-2 outline-none p-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 🎯 Filters */}
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          className="border p-2 rounded"
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
        >
          <option value="">All Methods</option>
          <option value="manual">Manual</option>
          <option value="paypal">PayPal</option>
          <option value="stripe">Stripe</option>
        </select>

        {/* 👤 User Dropdown */}
        <select
          className="border p-2 rounded"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">All Users</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.fullName} ({user.email})
            </option>
          ))}
        </select>
      </div>

      {/* 📊 Table */}
      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-indigo-100 text-left">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Shares</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Method</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Receipt</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPayments.length === 0 ? (
              <tr>
                <td className="px-4 py-2 text-gray-500" colSpan={8}>
                  No matching payments found.
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment) => (
                <tr key={payment._id}>
                  <td className="px-4 py-2 font-medium">
                    {payment.userId?.fullName}
                    <div className="text-xs text-gray-500">{payment.userId?.email}</div>
                  </td>
                  <td className="px-4 py-2">{payment.phone}</td>
                  <td className="px-4 py-2">{payment.shares}</td>
                  <td className="px-4 py-2">
                    ${payment.totalWithFee?.toFixed(2)} {payment.currency}
                  </td>
                  <td className="px-4 py-2 capitalize">{payment.paymentMethod}</td>
                  <td className="px-4 py-2 capitalize">{payment.status}</td>
                  <td className="px-4 py-2">
                    {payment.receipt ? (
                      <a
                        href={`http://localhost:5050/uploads/${payment.receipt}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-indigo-600 hover:underline"
                      >
                        <FaFilePdf size={14} /> View
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {payment.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(payment._id, 'verified')}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => updateStatus(payment._id, 'rejected')}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}