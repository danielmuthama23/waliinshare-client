import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';
import { getFullImageUrl } from '../utils/imagePath';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  const stripHtml = (html) => html.replace(/<[^>]+>/g, '');

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-slate-950 text-gray-800 dark:text-slate-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-200 mb-6 text-center">Our Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white dark:bg-slate-900 shadow p-4 rounded hover:shadow-lg transition border border-transparent dark:border-slate-800"
          >
            <Link to={`/blogs/${blog._id}`}>
              {blog.image && (
                <img
                  src={getFullImageUrl(blog.image)}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 hover:underline mb-2">
                {blog.title}
              </h2>
            </Link>

            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {stripHtml(blog.content).slice(0, 150)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
