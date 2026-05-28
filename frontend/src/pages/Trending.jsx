import { useEffect, useState } from 'react';
import { fetchTrending } from '../services/postService.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import PinCard from '../components/PinCard.jsx';
import Loader from '../components/Loader.jsx';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrending().then((res) => {
      setTrending(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader message="Loading trending collections…" />;

  return (
    <section className="space-y-8">
      <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
        <h1 className="text-4xl font-semibold text-slate-100">Trending designs</h1>
        <p className="mt-3 max-w-2xl text-slate-400">See what creators are saving, liking, and commenting on right now.</p>
      </div>

      <div>
        {trending.length ? (
          <MasonryGrid>
            {trending.map((post) => (
              <PinCard key={post._id} post={post} />
            ))}
          </MasonryGrid>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-10 text-center text-slate-400">No trending posts available.</div>
        )}
      </div>
    </section>
  );
};

export default Trending;
