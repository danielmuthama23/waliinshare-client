// src/pages/AdminDashboard/BlogCreate.jsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import axios from '../../utils/axios';
import 'react-quill/dist/quill.snow.css';
import { getFullImageUrl } from '../../utils/imagePath';

export default function BlogCreate() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Admin');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !content || !imageFile) {
      return alert('All fields including image are required!');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('content', content);
    formData.append('image', imageFile);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/blogs', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Blog created!');
      setTitle('');
      setAuthor('Admin');
      setContent('');
      setImageFile(null);
      setPreview('');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to create blog');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">📝 Create New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className="block font-medium text-gray-700">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
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
          Publish Blog
        </button>
      </form>
    </div>
  );
}