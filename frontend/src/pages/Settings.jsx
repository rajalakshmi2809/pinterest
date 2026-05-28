import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { updateProfile } from '../services/authService.js';

const Settings = () => {
  const { user, signIn } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [message, setMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile({ username, bio });
      signIn(response.data, localStorage.getItem('visionboard_token'));
      setMessage('Settings saved successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to update profile.');
    }
  };

  return (
    <section className="mx-auto max-w-3xl rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
      <h1 className="text-3xl font-semibold text-slate-100">Account settings</h1>
      <p className="mt-3 text-slate-400">Customize your profile and appearance within VisionBoard.</p>
      {message && <p className="mt-6 rounded-3xl bg-slate-950/80 px-5 py-4 text-sm text-slate-200">{message}</p>}
      <form onSubmit={handleSave} className="mt-8 space-y-6">
        <label className="block text-sm text-slate-300">
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none" required />
        </label>
        <label className="block text-sm text-slate-300">
          Bio
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows="4" className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none" />
        </label>
        <button className="rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105">Save settings</button>
      </form>
    </section>
  );
};

export default Settings;
