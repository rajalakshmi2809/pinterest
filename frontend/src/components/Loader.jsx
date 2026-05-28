const Loader = ({ message = 'Loading visionary content…' }) => (
  <div className="flex min-h-[54vh] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-300 shadow-xl">
    <div>
      <p className="text-lg font-semibold text-slate-100">{message}</p>
      <p className="mt-3 text-sm text-slate-500">This may take a moment while the creative feed loads.</p>
    </div>
  </div>
);

export default Loader;
