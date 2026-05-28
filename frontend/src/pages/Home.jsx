import { useEffect, useState } from 'react';
import { fetchFeed } from '../services/postService.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import PinCard from '../components/PinCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Loader from '../components/Loader.jsx';
import categories from '../data/categories.js';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeed().then((res) => {
      setPosts(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(
      posts.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [search, posts]);

  if (loading) return <Loader />;

  return (
    <section className="space-y-8">
      <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">VisionBoard</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-100 sm:text-5xl">
              Discover modern visual inspiration for every creative project.
            </h1>
            <p className="mt-4 max-w-2xl text-slate-400">
              Browse trending collections, build moodboards, and launch your creative portfolio with a single platform.
            </p>
          </div>
          <div className="max-w-xl">
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.slice(0, 6).map((category) => (
            <span key={category} className="rounded-full border border-slate-800 bg-slate-950/90 px-4 py-2 text-sm text-slate-200">{category}</span>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-100">Fresh inspirations</h2>
          <p className="text-sm text-slate-400">{filtered.length} items</p>
        </div>
        {filtered.length ? (
          <MasonryGrid>
            {filtered.map((post) => (
              <PinCard key={post._id} post={post} />
            ))}
          </MasonryGrid>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-10 text-center text-slate-500">
            No results found for your search.
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
