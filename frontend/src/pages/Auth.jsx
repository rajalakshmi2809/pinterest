import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaPinterest, FaGoogle, FaFacebook } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Auth = () => {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password || (mode === 'signup' && !confirmPassword)) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const payload = {
      email: email.trim(),
      password,
      ...(mode === 'signup' ? { name: name.trim() } : {}),
    };

    setLoading(true);

    try {
      const endpoint = mode === 'login' ? 'login' : 'register';
      const response = await axios.post(`${API_URL}/api/auth/${endpoint}`, payload);
      const { token, user } = response.data;

      localStorage.setItem('pinspire_token', token);
      localStorage.setItem('pinspire_user', JSON.stringify(user));

      toast.success(mode === 'login' ? 'Logged in successfully!' : 'Account created successfully!');
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to authenticate. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f1111] px-5 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,194,194,0.18),transparent_28%),radial-gradient(circle_at_85%_85%,rgba(126,166,178,0.2),transparent_30%)]" />
      <div className="relative flex w-full max-w-[520px] flex-col items-center rounded-[32px] bg-[#101111] px-10 py-14 shadow-2xl">
        <div className="bg-[#e60023] p-4 rounded-full mb-6">
          <FaPinterest className="text-white text-3xl" />
        </div>

        <h1 className="text-3xl font-bold mb-2 text-white">Welcome to PinInspire</h1>
        <p className="text-gray-400 mb-8">Find new ideas to try</p>

        <div className="mb-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#1f1f1f] p-2 text-sm text-gray-300">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`rounded-full px-6 py-3 transition-colors ${mode === 'login' ? 'bg-[#e60023] text-white' : 'bg-transparent hover:bg-white/10'}`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`rounded-full px-6 py-3 transition-colors ${mode === 'signup' ? 'bg-[#e60023] text-white' : 'bg-transparent hover:bg-white/10'}`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Your name"
                className="w-full bg-[#2b2b2b] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-transparent focus:border-gray-500 transition-all placeholder-gray-500 font-medium"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Email"
              className="w-full bg-[#2b2b2b] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-transparent focus:border-gray-500 transition-all placeholder-gray-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Password"
              className="w-full bg-[#2b2b2b] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-transparent focus:border-gray-500 transition-all placeholder-gray-500 font-medium"
            />
          </div>
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
                placeholder="Confirm password"
                className="w-full bg-[#2b2b2b] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-transparent focus:border-gray-500 transition-all placeholder-gray-500 font-medium"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e60023] hover:bg-[#ad081b] text-white font-bold rounded-full py-4 mt-2 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Continue' : 'Create account'}
          </button>
        </form>

        <div className="flex items-center w-full my-6 text-gray-500 text-sm font-bold">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-4">OR</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        <button className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold rounded-full py-4 mb-3 flex items-center justify-center gap-3 transition-colors">
          <FaGoogle className="text-xl" /> Continue with Google
        </button>
        <button className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold rounded-full py-4 mb-8 flex items-center justify-center gap-3 transition-colors">
          <FaFacebook className="text-xl" /> Continue with Facebook
        </button>

        <p className="text-center text-sm leading-relaxed text-gray-300 px-4 mb-8">
          By continuing, you agree to PinInspire's <a href="#" className="font-bold text-gray-200 hover:underline">Terms of Service</a> and acknowledge you've read our <a href="#" className="font-bold text-gray-200 hover:underline">Privacy Policy</a>.
        </p>

        <div className="border-t border-gray-800 w-full pt-6 text-center">
          <p className="text-base text-gray-200">
            {mode === 'login' ? 'Not on PinInspire yet?' : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="font-bold text-[#ffc2c2] hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 flex gap-6 text-sm text-gray-300 font-semibold">
        <a href="#" className="hover:text-gray-300 transition-colors">Help Center</a>
        <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
        <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
      </div>
    </div>
  );
};

export default Auth;
