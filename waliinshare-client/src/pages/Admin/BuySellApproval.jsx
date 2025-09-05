import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { FaCheckCircle, FaTimesCircle, FaFileInvoice, FaDownload, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

export default function BuySellApproval() {
  const [pending, setPending] = useState([]);
  const [verified, setVerified] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem('token');

      const [pendingRes, verifiedRes, rejectedRes] = await Promise.all([
        axios.get('/admin/purchases/pending', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/admin/purchases/verified', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/admin/purchases/rejected', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setPending(pendingRes.data || []);
      setVerified(verifiedRes.data || []);
      setRejected(rejectedRes.data || []);
    } catch (err) {
      console.error('Error fetching purchases:', err);
      toast.error('Failed to fetch purchases');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (id, action) => {
    const confirm = window.confirm(`Are you sure you want to ${action} this purchase?`);
    if (!confirm) return;

    try {
      setActionLoadingId(id);
      const token = sessionStorage.getItem('token');

      await axios.put(
        `/admin/purchases/${id}/status`,
        { status: action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Purchase ${action}d successfully`);

      if (action === 'verified') {
        // Generate certificate (server should read purchase & use certificatePhoto if present)
        await axios.get(`/admin/generate-certificate/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Certificate generated');
      }

      fetchData();
    } catch (err) {
      console.error(`Error ${action} purchase:`, err);
      toast.error(`Failed to ${action} purchase`);
    } finally {
      setActionLoadingId(null);
    }
  };

  const formatMethod = (method) => {
    const map = {
      stripe: 'Stripe (Credit/Debit)',
      paypal: 'PayPal',
      telebirr: 'Telebirr',
      manual: 'Manual Payment',
    };
    return map[method] || method;
  };

  const currencyText = (c) => (c || '').toUpperCase();

  const renderTable = (title, data, showActions) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-indigo-700">{title}</h2>
        {/* <button
          onClick={fetchData}
          className="text-sm px-3 py-1 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
          title="Refresh"
        >
          Refresh
        </button> */}
      </div>

      {(!data || data.length === 0) ? (
        <p className="text-gray-500">No {title.toLowerCase()} found.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm bg-white rounded-xl">
            <thead className="bg-indigo-100 text-left">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Shares</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Receipt</th>
                <th className="px-4 py-3">Cert Photo</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((p) => {
                const amount = Number(p.totalWithFee ?? p.totalPrice ?? 0);
                const isActing = actionLoadingId === p._id;

                return (
                  <tr key={p._id}>
                    <td className="px-4 py-2">
                      <div className="font-medium">{p.userId?.fullName || '—'}</div>
                      <div className="text-gray-500 text-xs break-all">{p.userId?.email || '—'}</div>
                    </td>
                    <td className="px-4 py-2">{p.phone || '—'}</td>
                    <td className="px-4 py-2">{p.shares ?? '—'}</td>
                    <td className="px-4 py-2">
                      ${amount.toFixed(2)} {currencyText(p.currency)}
                    </td>
                    <td className="px-4 py-2">{formatMethod(p.paymentMethod)}</td>

                    {/* Receipt link */}
                    <td className="px-4 py-2">
                      {p.receipt ? (
                        <a
                          href={`${API_URL}/uploads/${p.receipt}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline inline-flex items-center gap-1"
                          title="Open receipt"
                        >
                          <FaFileInvoice />
                          Receipt
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">N/A</span>
                      )}
                    </td>

                    {/* Certificate Photo thumbnail if present */}
                    <td className="px-4 py-2">
                      {p.certificatePhoto ? (
                        <a
                          href={`${API_URL}/uploads/${p.certificatePhoto}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-indigo-600 hover:underline"
                          title="View certificate photo"
                        >
                          <FaImage />
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">N/A</span>
                      )}
                    </td>

                    <td className="px-4 py-2 space-y-2 flex flex-col items-start">
                      {showActions ? (
                        <div className="space-x-2">
                          <button
                            title="Approve"
                            disabled={isActing}
                            onClick={() => handleAction(p._id, 'verified')}
                            className={`${
                              isActing ? 'opacity-50 cursor-not-allowed' : ''
                            } text-green-600 hover:text-green-800`}
                          >
                            <FaCheckCircle size={18} />
                          </button>
                          <button
                            title="Reject"
                            disabled={isActing}
                            onClick={() => handleAction(p._id, 'rejected')}
                            className={`${
                              isActing ? 'opacity-50 cursor-not-allowed' : ''
                            } text-red-500 hover:text-red-700`}
                          >
                            <FaTimesCircle size={18} />
                          </button>
                        </div>
                      ) : p.status === 'verified' ? (
                        <a
                          href={`${API_URL}/certificates/certificate-${p._id}.pdf`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:underline text-xs flex items-center gap-1"
                        >
                          <FaDownload size={12} />
                          Download Certificate
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs capitalize">{p.status}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">Purchase Management</h1>
      {renderTable('Pending Purchases', pending, true)}
      {renderTable('Verified Purchases', verified, false)}
      {renderTable('Rejected Purchases', rejected, false)}
    </div>
  );
}