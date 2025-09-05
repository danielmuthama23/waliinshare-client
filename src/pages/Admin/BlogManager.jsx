import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { getFullImageUrl } from '../../utils/imagePath';


export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/blogs');
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBlogs(); // Refresh list
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-4 md:mb-0">
          📚 Blog Manager
        </h2>
        <Link
          to="/admin/create-blog"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg shadow-md transition"
        >
          ➕ New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white min-h-[320px] rounded-xl shadow-md hover:shadow-lg transition flex flex-col justify-between"
            >
              {blog.image && (
                <img
                  src={getFullImageUrl(blog.image)}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
              )}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-bold text-indigo-800 mb-1">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    By {blog.author || 'Unknown'} •{' '}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Link
                    to={`/admin/edit-blog/${blog._id}`}
                    className="w-1/2 text-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold rounded-md"
                  >
                    📝 Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="w-1/2 text-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-md"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}