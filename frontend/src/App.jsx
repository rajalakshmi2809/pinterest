import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CreatePin from './pages/CreatePin';
import Profile from './pages/Profile';

const AppShell = () => {
  const location = useLocation();
  const isAuth = location.pathname === '/auth';
  const isFeed = location.pathname === '/' || location.pathname === '/explore';

  return (
    <div className={`min-h-screen font-sans ${isFeed ? 'bg-[#f7f4f5] text-[#1f1f1f]' : 'bg-[#111312] text-white'}`}>
      {!isAuth && <Navbar />}
      <main className={isAuth ? '' : 'pt-20'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={<CreatePin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppShell />
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
