import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { getMe } from '../api/authApi';
import toast from 'react-hot-toast';
export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMe();
        setProfile(res.data);
      } catch (err) {
        toast.error('Could not load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);
  const displayName = profile?.name || user?.name || '';
  const displayEmail = profile?.email || user?.email || '';
  return (
    <div className="min-h-screen dark:bg-slate-900">
      <Navbar />
      <main className="max-w-lg mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl font-display font-semibold mb-6">Profile</h1>

        <div className="card p-4 sm:p-6">
          {loading ? (
            <p className="text-slate-400 text-sm">Loading...</p>
          ) : (
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
                {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <p className="font-medium text-lg">{displayName}</p>
                <p className="text-sm text-slate-500">{displayEmail}</p>
              </div>
            </div>
          )}
          <p className="text-xs text-slate-400 mt-6">
            Editing your profile isn't available yet — add a{' '}
            <code className="bg-slate-100 px-1 rounded">PUT /api/auth/me</code> route on
            the backend to enable it here.
          </p>
        </div>
      </main>
    </div>
  );
}
