import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange, placeholder = 'Search tags, categories, creators' }) => {
  return (
    <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-lg shadow-slate-950/20">
      <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent pl-11 text-sm text-slate-100 outline-none placeholder:text-slate-600"
      />
    </div>
  );
};

export default SearchBar;
