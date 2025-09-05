import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaBuilding } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function CompanyValue() {
  const [data, setData] = useState({
    totalValueUSD: '',
    sharePriceUSD: '',
    sharePriceETB: '',
    sharesAvailable: '',
    deadline: ''
  });

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.get('http://localhost:5050/api/admin/company-value', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) setData(res.data);
    } catch (err) {
      console.error('Error fetching company value', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.put('http://localhost:5050/api/admin/company-value', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Company value updated!');
    } catch (err) {
      toast.error('Failed to update');
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <FaBuilding className="text-indigo-600" />
        Company Value Management
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="number"
          name="totalValueUSD"
          placeholder="Company Value in USD"
          value={data.totalValueUSD}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <input
          type="number"
          name="sharePriceUSD"
          placeholder="Share Price in USD"
          value={data.sharePriceUSD}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <input
          type="number"
          name="sharePriceETB"
          placeholder="Share Price in ETB"
          value={data.sharePriceETB}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <input
          type="number"
          name="sharesAvailable"
          placeholder="Available Shares"
          value={data.sharesAvailable}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <input
          type="date"
          name="deadline"
          value={data.deadline?.split('T')[0]}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
      >
        Update
      </button>
    </div>
  );
}