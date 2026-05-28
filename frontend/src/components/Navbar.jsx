import { Link, useLocation } from 'react-router-dom';
import { FaBell, FaCommentDots, FaUserCircle, FaSearch, FaPinterest } from 'react-icons/fa';

const Navbar = () => {
  const { pathname } = useLocation();
  const isFeed = pathname === '/' || pathname === '/explore';
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Explore', path: '/explore' },
    { label: 'Create', path: '/create' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 h-20 z-50 flex items-center gap-4 px-5 border-b ${isFeed ? 'bg-[#3f4140] border-[#303231] text-white' : 'bg-[#111312] border-[#2b2b2b] text-white'}`}>
      <Link to="/" className="flex shrink-0 items-center gap-2">
        <FaPinterest className="text-[#e60023] text-3xl" />
        <span className="text-2xl font-bold text-[#ffc2c2] tracking-tight">PinInspire</span>
      </Link>

      <div className="hidden md:flex gap-3 font-semibold text-gray-200">
        {navItems.map((item) => {
          const active = item.path === '/' ? pathname === '/' : pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-full px-5 py-3 transition-colors ${active ? 'bg-[#4b4b4b] text-[#ffc2c2] shadow-[inset_0_-2px_0_#ffc2c2]' : 'hover:bg-white/10'}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="relative min-w-0 flex-1">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <FaSearch className={isFeed ? 'text-gray-400' : 'text-gray-300'} />
        </div>
        <input 
          type="text" 
          placeholder={isFeed ? 'Search for ideas...' : 'Search'} 
          className={`w-full rounded-full py-3.5 pl-12 pr-4 text-lg transition-all focus:outline-none focus:ring-2 ${isFeed ? 'bg-[#f3f3f3] text-[#222] placeholder:text-gray-400 focus:ring-[#ffc2c2]' : 'bg-[#1f1f1f] text-gray-200 placeholder:text-gray-500 focus:ring-gray-600'}`}
        />
      </div>

      <div className="hidden sm:flex shrink-0 items-center gap-3">
        <Link to="/auth" className="rounded-full bg-[#e60023] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c5001d] transition-colors">
          Login
        </Link>
      </div>

      <div className="flex shrink-0 items-center gap-4 text-2xl text-gray-200">
        <button aria-label="Notifications" className="hover:text-[#ffc2c2] transition-colors"><FaBell /></button>
        <button aria-label="Messages" className="hidden sm:block hover:text-[#ffc2c2] transition-colors"><FaCommentDots /></button>
        <Link to="/profile" aria-label="Profile" className="hover:text-[#ffc2c2] transition-colors">
          <FaUserCircle className={pathname === '/profile' ? 'text-[#ffc2c2]' : ''} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
