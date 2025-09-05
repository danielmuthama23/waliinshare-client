import React, { useEffect, useState } from 'react';
import axios from "../../utils/axios";

export default function UnderageShareholders() {
  const [underageUsers, setUnderageUsers] = useState([]);

  useEffect(() => {
    const fetchUnderageUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/admin/underage', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUnderageUsers(res.data);
      } catch (err) {
        console.error('Error loading underage users:', err);
      }
    };

    fetchUnderageUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-[#2F4DA2] mb-4">Underage Shareholders</h2>
      {underageUsers.length === 0 ? (
        <p>No underage shareholders found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-gray-300 px-4 py-2 font-bold text-left">Full Name</th>
              <th className="border border-gray-300 px-4 py-2 font-bold text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 font-bold text-left">DOB</th>
              <th className="border border-gray-300 px-4 py-2 font-bold text-left">Guardian Name</th>
              <th className="border border-gray-300 px-4 py-2 font-bold text-left">Guardian Contact</th>
            </tr>
          </thead>
          <tbody>
            {underageUsers.map(user => (
              <tr key={user._id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.fullName}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.dateOfBirth}</td>
                <td className="border border-gray-300 px-4 py-2">{user.guardianDetails?.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.guardianDetails?.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}