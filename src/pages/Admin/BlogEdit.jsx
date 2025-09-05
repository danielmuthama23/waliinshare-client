// src/pages/AdminDashboard/BlogEdit.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import axios from '../../utils/axios';
import 'react-quill/dist/quill.snow.css';
import { getFullImageUrl } from '../../utils/imagePath';

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        const data = res.data;
        setBlog(data);
        setTitle(data.title);
        setAuthor(data.author);
        setContent(data.content);
        setPreview(getFullImageUrl(data.image));
      } catch (err) {
        console.error('Error loading blog:', err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('content', content);
    if (imageFile) formData.append('image', imageFile);

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/blogs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Blog updated!');
      navigate('/admin/blogs');
    } catch (err) {
      console.error('Error updating blog:', err);
      alert('❌ Failed to update blog');
    }
  };

  if (!blog) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">✏️ Edit Blog</h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Author</label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Replace Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-56 object-cover rounded border mt-2"
            />
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Content</label>
          <ReactQuill value={content} onChange={setContent} />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}