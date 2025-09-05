import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { getFullImageUrl } from '../utils/imagePath';

export default function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div className="min-h-screen p-6 bg-[#f6f8fa] dark:bg-slate-950 text-gray-500 dark:text-gray-300 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-slate-950 text-gray-800 dark:text-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 shadow rounded border border-transparent dark:border-slate-800">
        <Link to="/blog" className="text-sm text-indigo-600 dark:text-indigo-300 hover:underline mb-4 inline-block">
          ← Back to Blog List
        </Link>

        <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">{blog.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {blog.image && (
          <img
            src={getFullImageUrl(blog.image)}
            alt={blog.title}
            className="w-full h-64 object-cover rounded mb-6 border dark:border-slate-800"
          />
        )}

        <div
          className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 prose-img:rounded-md prose-headings:text-indigo-800 dark:prose-headings:text-indigo-200"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
