import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

export default function PendingTransfers() {
  const [transfers, setTransfers] = useState([]);
  const userId = localStorage.getItem('userId');

  const fetchTransfers = async () => {
    try {
      const res = await axios.get(`/transfers/recipient/${userId}`);
      setTransfers(res.data);
    } catch (err) {
      console.error('Error fetching pending transfers:', err);
    }
  };

  const handleDecision = async (id, status) => {
    try {
    await axios.patch(`/transfers/${id}/respond`, { status });
    alert(`Transfer ${status}`);
    fetchTransfers(); // Refresh list
  } catch (err) {
    console.error(`Error ${status} transfer:`, err);
    alert(`Failed to ${status} transfer`);
  }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#2F4DA2] mb-4">Incoming Share Transfers</h2>
      {transfers.length === 0 ? (
        <p>No pending transfers.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1">From</th>
              <th className="border px-2 py-1">Shares</th>
              <th className="border px-2 py-1">Price/Share</th>
              <th className="border px-2 py-1">Total</th>
              <th className="border px-2 py-1">Note</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer) => (
              <tr key={transfer._id}>
                <td className="border px-2 py-1">{transfer.fromUserId.fullName}</td>
                <td className="border px-2 py-1">{transfer.sharesToTransfer}</td>
                <td className="border px-2 py-1">${transfer.pricePerShare}</td>
                <td className="border px-2 py-1">${transfer.pricePerShare * transfer.sharesToTransfer}</td>
                <td className="border px-2 py-1">{transfer.note}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        onClick={() => handleDecision(transfer._id, 'AcceptedByRecipient')}
                        >
                        Accept
                        </button>
                        <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={() => handleDecision(transfer._id, 'Rejected')}
                        >
                        Reject
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}