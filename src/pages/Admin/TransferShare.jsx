import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminTransfers = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/transfers');
      setTransfers(res.data);
    } catch (err) {
      console.error('Error fetching transfers', err);
    }
  };

const handleAction = async (id, status) => {
  try {
    await axios.put(`http://localhost:5050/api/transfers/${id}/status`, { status });
    fetchTransfers();
  } catch (err) {
    console.error(`Error updating transfer status to ${status}`, err);
    alert(err.response?.data?.message || 'Something went wrong');
  }
};

  return (
    <div className="p-8 bg-gradient-to-br from-white to-blue-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Admin Transfer Approvals</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 border-b font-semibold text-gray-700">From</th>
              <th className="text-left px-6 py-3 border-b font-semibold text-gray-700">To</th>
              <th className="text-left px-6 py-3 border-b font-semibold text-gray-700">Shares</th>
              <th className="text-left px-6 py-3 border-b font-semibold text-gray-700">Status</th>
              <th className="text-left px-6 py-3 border-b font-semibold text-gray-700">Buyer Approved?</th>
              <th className="text-left px-6 py-3 border-b font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t) => (
              <tr key={t._id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 border-b">{t.fromUserId?.email || '—'}</td>
                <td className="px-6 py-4 border-b">{t.toUserId?.email || t.toUserEmail}</td>
                <td className="px-6 py-4 border-b">{t.sharesToTransfer}</td>
                <td className="px-6 py-4 border-b capitalize">{t.status}</td>
                <td className="px-6 py-4 border-b">{t.buyerApproval ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 border-b">
                  {t.status === 'BuyerApproved' && t.buyerApproval ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAction(t._id, 'ApprovedByAdmin')}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1.5 px-4 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(t._id, 'RejectedByAdmin')}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-4 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransfers;