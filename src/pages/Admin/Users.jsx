import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { FaUsers } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [tokenValid, setTokenValid] = useState(false);

  const token = sessionStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/all-users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    if (!token) {
      console.warn('⚠️ No valid token found for admin.');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded?.id && decoded?.isAdmin) {
        setTokenValid(true);
        fetchUsers();
      } else {
        console.warn('⚠️ Not an admin token.');
      }
    } catch (err) {
      console.warn('⚠️ Error decoding token.', err);
    }
  }, [token]);

  const handlePromote = async (userId) => {
    try {
      await axios.put(`/admin/toggle-role/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User role updated');
      fetchUsers();
    } catch (err) {
      console.error('Error promoting user:', err);
      toast.error('Failed to update role');
    }
  };

  const handleDeactivate = async (userId) => {
    try {
      await axios.put(`/admin/toggle-status/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User status updated');
      fetchUsers();
    } catch (err) {
      console.error('Error deactivating user:', err);
      toast.error('Failed to update status');
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase()) ||
    user.phone?.includes(search)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
        <FaUsers /> User Management
      </h1>

      <input
        type="text"
        placeholder="Search users..."
        className="mb-4 p-2 border rounded-md w-full sm:w-80"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm bg-white rounded-xl">
          <thead className="bg-indigo-100 text-left">
            <tr>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2">{user.fullName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2 capitalize">
                  {user.isAdmin ? 'Admin' : 'User'}
                </td>
                <td className="px-4 py-2 font-semibold">
                  {user.isActive !== false ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-500">Inactive</span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handlePromote(user._id)}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    {user.isAdmin ? 'Demote' : 'Promote'}
                  </button>
                  <button
                    onClick={() => handleDeactivate(user._id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    {user.isActive !== false ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}