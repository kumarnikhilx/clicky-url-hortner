import { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { getUserUrls } from '../services/urlService';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

const DashboardPage = () => {
  const [urls, setUrls] = useState([]);
  const [loadingUrls, setLoadingUrls] = useState(true);

  const { user } = useAuth();

  const fetchUrls = useCallback(async () => {
    try {
      setLoadingUrls(true);
      const data = await getUserUrls();
      setUrls(data.urls || []);
    } catch (err) {
      const message = err.response?.data?.message || 'Could not load your links.';
      toast.error(message);
      console.error('Fetch URLs error:', err);
    } finally {
      setLoadingUrls(false);
    }
  }, []);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const handleUrlCreated = () => {
    fetchUrls();
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Create and manage all your shortened links.
            </p>
          </div>
        </div>
      </div>

      {/* URL Shortener Form Section */}
      <section className="p-5 sm:p-7 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl mb-10">
        <UrlForm onUrlCreated={handleUrlCreated} />
      </section>

      {/* Link List Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-200">Your Links</h2>
          <button
            onClick={fetchUrls}
            disabled={loadingUrls}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
            title="Refresh links"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingUrls ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        <UrlList urls={urls} loading={loadingUrls} />
      </section>
    </main>
  );
};

export default DashboardPage;
