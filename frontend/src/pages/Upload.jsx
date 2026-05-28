import { useState } from 'react';
import { createPost } from '../services/postService.js';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('UI/UX');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      setMessage('Please select an image to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('category', category);

    try {
      await createPost(formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMessage('Post uploaded successfully!');
      setTitle('');
      setDescription('');
      setTags('');
      setImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Upload failed.');
    }
  };

  return (
    <section className="mx-auto max-w-3xl rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
      <h1 className="text-3xl font-semibold text-slate-100">Upload a new design</h1>
      <p className="mt-3 text-slate-400">Create inspiring posts with tags, categories, and AI-ready metadata.</p>
      {message && <p className="mt-6 rounded-3xl bg-slate-950/80 px-5 py-4 text-sm text-slate-200">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block text-sm text-slate-300">
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none" required />
        </label>
        <label className="block text-sm text-slate-300">
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none" />
        </label>
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="block text-sm text-slate-300">
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none">
              <option>UI/UX</option>
              <option>Architecture</option>
              <option>Fashion</option>
              <option>Photography</option>
              <option>3D Modeling</option>
              <option>Interior</option>
              <option>Gaming</option>
              <option>Posters</option>
              <option>Branding</option>
            </select>
          </label>
          <label className="block text-sm text-slate-300">
            Tags
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="interior, luxury, modern" className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none" />
          </label>
        </div>
        <label className="block text-sm text-slate-300">
          Image
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none" required />
        </label>
        <button className="w-full rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105">
          Upload Design
        </button>
      </form>
    </section>
  );
};

export default Upload;
