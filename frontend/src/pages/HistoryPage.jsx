import React, { useState, useEffect, useCallback } from 'react';
import { History, RefreshCw, Link2, MousePointerClick, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { getUserUrls } from '../services/urlService';
import UrlList from '../components/UrlList';
import Footer from '../components/Footer';

const HistoryPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUrls = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUserUrls();
      setUrls(data.urls || []);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load URL history.';
      toast.error(message);
      console.error('History fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const totalClicks = urls.reduce((acc, curr) => acc + (curr.click || 0), 0);

  const filteredUrls = urls.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      (item.originalUrl && item.originalUrl.toLowerCase().includes(q)) ||
      (item.shortUrl && item.shortUrl.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-12">
        {/* Header & Stats Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-emerald-950">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-950/80 border border-emerald-900/50 text-emerald-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-emerald-100 tracking-tight">
                Link History
              </h1>
              <p className="text-xs sm:text-sm text-emerald-500/70">
                View, search and manage all your shortened links.
              </p>
            </div>
          </div>

          {/* Stats Pill */}
          <div className="flex items-center gap-4 bg-[#071610] border border-emerald-900/50 rounded-xl px-4 py-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Link2 className="w-4 h-4 text-emerald-400" />
              <span><strong className="text-emerald-100 font-semibold">{urls.length}</strong> links</span>
            </div>
            <div className="w-px h-4 bg-emerald-900/60" />
            <div className="flex items-center gap-1.5 text-emerald-300">
              <MousePointerClick className="w-4 h-4 text-emerald-400" />
              <span><strong className="text-emerald-100 font-semibold">{totalClicks}</strong> total clicks</span>
            </div>
          </div>
        </div>

        {/* Search & Refresh Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search links..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#091a13] border border-emerald-900/50 text-xs text-emerald-50 placeholder:text-emerald-700/60 outline-none focus:border-emerald-500/60 transition-all font-normal"
            />
          </div>

          <button
            onClick={fetchUrls}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-900/50 bg-[#071610] hover:bg-emerald-950 text-xs font-semibold text-emerald-300 hover:text-emerald-100 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* URL History List */}
        <UrlList urls={filteredUrls} loading={loading} />
      </main>

      <Footer />
    </div>
  );
};

export default HistoryPage;
