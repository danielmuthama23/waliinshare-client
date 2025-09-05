import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Profile() {
  const storedUser = JSON.parse(sessionStorage.getItem('user')) || {};

  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({ ...storedUser });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5050/api/users/profile', // 👈 update this to your actual user update endpoint
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Profile updated successfully!');
        sessionStorage.setItem('user', JSON.stringify(response.data));
        setEditMode(false);
      } else {
        toast.error('Update failed. Try again.');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <motion.div
      className="bg-white shadow-md p-6 rounded-xl max-w-lg mx-auto text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-4">
        <FaUserCircle className="text-6xl text-gray-500" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">Your Profile</h2>

      <div className="space-y-4">
        {['fullName', 'email', 'phone', 'address', 'dateOfBirth'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold capitalize">{field.replace(/([A-Z])/g, ' $1')}:</label>
            {editMode ? (
              <input
                type="text"
                name={field}
                value={userData[field] || ''}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p>{userData[field] || 'N/A'}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-semibold">Photo ID:</label>
          {userData.photoID ? (
            <a
              href={`http://localhost:5050/uploads/${userData.photoID}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Uploaded ID
            </a>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        {editMode ? (
          <div className="space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setUserData({ ...storedUser });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </motion.div>
  );
}