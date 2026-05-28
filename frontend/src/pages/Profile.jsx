import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfile } from '../services/authService.js';
import Loader from '../components/Loader.jsx';

const Profile = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile().then((res) => {
      setProfile(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [params.userId]);

  if (loading) return <Loader message="Loading profile…" />;

  return (
    <section className="space-y-8">
      <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-cyan-500/15 text-4xl font-semibold text-cyan-300">
              {profile?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-slate-100">{profile?.username}</h1>
              <p className="mt-2 text-slate-400">{profile?.bio}</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-6 py-5 text-sm text-slate-300">
            <p className="text-slate-100">Followers</p>
            <p className="mt-2 text-3xl font-semibold text-slate-100">{profile?.followers?.length || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/30">
          <h2 className="text-2xl font-semibold text-slate-100">About</h2>
          <p className="mt-3 text-slate-400">A creative portfolio builder for designers, photographers and modern creators to save inspirations and moodboards.</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/30">
          <h2 className="text-2xl font-semibold text-slate-100">Activity</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>Uploaded posts: 0</p>
            <p>Saved boards: 0</p>
            <p>Recent likes: 0</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
