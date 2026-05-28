import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="flex min-h-[60vh] items-center justify-center rounded-4xl border border-slate-800 bg-slate-900/80 p-10 text-center shadow-xl shadow-slate-950/40">
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Page not found</p>
      <h1 className="mt-6 text-5xl font-semibold text-slate-100">404</h1>
      <p className="mt-4 max-w-xl text-slate-400">The moodboard you requested doesn't exist yet. Return home and resume creating.</p>
      <Link to="/" className="mt-8 inline-flex rounded-3xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105">
        Back to home
      </Link>
    </div>
  </section>
);

export default NotFound;
