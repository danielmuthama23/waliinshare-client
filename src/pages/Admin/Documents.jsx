import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { FaFileAlt, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const res = await axios.get('/admin/documents', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocs(res.data);
      } catch (err) {
        console.error('Fetch documents error:', err);
        toast.error('Failed to load documents');
      }
    };

    fetchDocuments();
  }, []);

  const isImage = (filename) =>
    /\.(jpg|jpeg|png|gif|bmp)$/i.test(filename);

  const filteredDocs =
    filter === 'all'
      ? docs
      : docs.filter((doc) => doc.documentType === filter);

  const groupedByUser = filteredDocs.reduce((acc, doc) => {
    const userId = doc.userId?._id || 'unknown';
    if (!acc[userId]) acc[userId] = { user: doc.userId, docs: [] };
    acc[userId].docs.push(doc);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">Uploaded Documents</h1>

      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="filter" className="text-sm font-medium text-gray-700">
          Filter by Type:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="all">All</option>
          <option value="receipt">Receipt</option>
          <option value="photoID">Photo ID</option>
          <option value="birthCertificate">Birth Certificate</option>
          <option value="guardianID">Guardian ID</option>
        </select>
      </div>

      {Object.keys(groupedByUser).length === 0 ? (
        <p className="text-gray-500">No documents found.</p>
      ) : (
        Object.values(groupedByUser).map(({ user, docs }) => (
          <div key={user?._id} className="mb-8">
            <h2 className="text-lg font-semibold text-indigo-600 mb-2">
              {user?.fullName || 'Unknown User'} ({user?.email || 'No email'})
            </h2>

            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                <thead className="bg-indigo-100 text-left">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Uploaded At</th>
                    <th className="px-4 py-3">Preview</th>
                    <th className="px-4 py-3">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {docs.map((doc) => (
                    <tr key={doc._id}>
                      <td className="px-4 py-2 capitalize">{doc.documentType}</td>
                      <td className="px-4 py-2">
                        {new Date(doc.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        {isImage(doc.filePath) ? (
                          <img
                            src={`http://localhost:5050/uploads/${doc.filePath}`}
                            alt="preview"
                            className="w-20 h-20 object-cover rounded shadow"
                          />
                        ) : (
                          <a
                            href={`http://localhost:5050/uploads/${doc.filePath}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 hover:underline flex items-center gap-1"
                          >
                            <FaFileAlt size={14} />
                            View File
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href={`http://localhost:5050/uploads/${doc.filePath}`}
                          download
                          className="text-green-600 hover:underline flex items-center gap-1"
                        >
                          <FaDownload size={14} />
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}