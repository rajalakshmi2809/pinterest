import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiPlus, FiHome, FiSearch, FiTrendingUp, FiUser } from 'react-icons/fi';

const TopNavbar = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-2xl font-semibold text-slate-100">
          <span className="inline-block h-10 w-10 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 shadow-lg shadow-fuchsia-500/20" />
          VisionBoard
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/explore" className={({ isActive }) => isActive ? 'nav-active' : 'nav-link'}>Explore</NavLink>
          <NavLink to="/trending" className={({ isActive }) => isActive ? 'nav-active' : 'nav-link'}>Trending</NavLink>
          <NavLink to="/boards" className={({ isActive }) => isActive ? 'nav-active' : 'nav-link'}>Boards</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/upload" className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] md:inline-flex">
            <FiPlus /> Upload
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <Link to={`/profile/${user.id}`} className="group flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm transition hover:border-slate-700">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-slate-100">{user.username?.charAt(0).toUpperCase()}</span>
                <span className="hidden sm:inline">{user.username}</span>
              </Link>
              <button onClick={signOut} className="rounded-full border border-slate-800 bg-slate-900/90 px-3 py-2 text-sm text-slate-100 transition hover:border-slate-700">
                Log out
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-sm text-slate-100 transition hover:border-slate-700">
                Login
              </Link>
              <Link to="/register" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-95">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
