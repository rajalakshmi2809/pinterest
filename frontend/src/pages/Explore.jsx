import { useEffect, useState } from 'react';
import { searchPosts } from '../services/postService.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import PinCard from '../components/PinCard.jsx';
import categories from '../data/categories.js';
import Loader from '../components/Loader.jsx';

const Explore = () => {
  const [category, setCategory] = useState('UI/UX');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    searchPosts({ category })
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <Loader message="Gathering moodboard material…" />;

  return (
    <section className="space-y-8">
      <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
        <h1 className="text-4xl font-semibold text-slate-100">Explore creative lanes</h1>
        <p className="mt-3 max-w-2xl text-slate-400">Browse curated categories and discover designers, photographers, and product concepts from across the community.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm transition ${item === category ? 'bg-cyan-400 text-slate-950' : 'border border-slate-800 bg-slate-950/80 text-slate-300 hover:bg-slate-900'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-100">{category} showcase</h2>
          <p className="text-sm text-slate-400">Curated pins by category</p>
        </div>
        {posts.length ? (
          <MasonryGrid>
            {posts.map((post) => (
              <PinCard key={post._id} post={post} />
            ))}
          </MasonryGrid>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-10 text-center text-slate-400">No pins available yet in this category.</div>
        )}
      </div>
    </section>
  );
};

export default Explore;
