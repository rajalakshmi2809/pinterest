import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { login } from '../services/authService.js';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ email, password });
      signIn(response.data, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to log in.');
    }
  };

  return (
    <section className="mx-auto max-w-xl rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
      <h1 className="text-3xl font-semibold text-slate-100">Welcome back</h1>
      <p className="mt-3 text-slate-400">Sign in to continue building creative boards.</p>
      {error && <p className="mt-4 rounded-2xl bg-rose-500/15 p-3 text-sm text-rose-200">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block text-sm text-slate-300">
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
            required
          />
        </label>
        <label className="block text-sm text-slate-300">
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
            required
          />
        </label>
        <button type="submit" className="w-full rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105">
          Log in
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        New to VisionBoard?{' '}
        <Link to="/register" className="font-semibold text-slate-100 hover:text-cyan-300">
          Create an account
        </Link>
      </p>
    </section>
  );
};

export default Login;
