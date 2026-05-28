import { useEffect, useState } from 'react';
import { fetchBoards, createBoard } from '../services/boardService.js';
import Loader from '../components/Loader.jsx';

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBoards().then((res) => {
      setBoards(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await createBoard({ name });
      setBoards((prev) => [response.data, ...prev]);
      setName('');
      setMessage('Board created successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to create board.');
    }
  };

  if (loading) return <Loader message="Fetching your boards…" />;

  return (
    <section className="space-y-8">
      <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-100">My boards</h1>
            <p className="mt-2 text-slate-400">Organize saved inspiration collections and private moodboards.</p>
          </div>
          <form onSubmit={handleCreate} className="flex flex-col gap-3 sm:flex-row">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New board name" className="rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none" required />
            <button className="rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105">Create</button>
          </form>
        </div>
        {message && <p className="mt-4 rounded-3xl bg-slate-950/80 px-5 py-3 text-sm text-slate-200">{message}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {boards.map((board) => (
          <div key={board._id} className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
            <h2 className="text-xl font-semibold text-slate-100">{board.name}</h2>
            <p className="mt-3 text-slate-400">{board.savedPins?.length || 0} saved pins</p>
            <p className="mt-4 rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300">{board.isPrivate ? 'Private moodboard' : 'Public collection'}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Boards;
