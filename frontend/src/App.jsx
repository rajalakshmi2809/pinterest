import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import TopNavbar from './components/TopNavbar.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Trending from './pages/Trending.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Upload from './pages/Upload.jsx';
import Boards from './pages/Boards.jsx';
import Settings from './pages/Settings.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <TopNavbar />
        <main className="px-4 py-6 md:px-8 lg:px-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile/:userId"
              element={<ProtectedRoute component={Profile} />}
            />
            <Route path="/upload" element={<ProtectedRoute component={Upload} />} />
            <Route path="/boards" element={<ProtectedRoute component={Boards} />} />
            <Route path="/settings" element={<ProtectedRoute component={Settings} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
