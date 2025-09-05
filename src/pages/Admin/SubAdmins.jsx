import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaUserShield } from 'react-icons/fa';

export default function SubAdmins() {
  const [subAdmins, setSubAdmins] = useState([]);

  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const decoded = jwtDecode(token);
        const res = await axios.get('http://localhost:5050/api/admin/sub-admins', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSubAdmins(res.data);
      } catch (error) {
        console.error('Error fetching sub-admins:', error);
      }
    };

    fetchSubAdmins();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <FaUserShield className="text-indigo-600" />
        Sub Admins
      </h2>
      {subAdmins.length === 0 ? (
        <p>No sub-admins found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {subAdmins.map((admin) => (
                <tr key={admin._id} className="text-center">
                  <td className="border px-4 py-2">{admin.fullName}</td>
                  <td className="border px-4 py-2">{admin.email}</td>
                  <td className="border px-4 py-2">{admin.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}