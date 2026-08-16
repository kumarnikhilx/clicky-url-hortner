import React, { useState, useEffect, useCallback } from 'react';
import { History, RefreshCw, Link2, MousePointerClick, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { getUserUrls } from '../services/urlService';
import UrlList from '../components/UrlList';

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
    <main className="max-w-4xl mx-auto w-full px-4 py-8 sm:py-12">
      {/* Header & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#3B262F]/50">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#1E161A] border border-[#3B262F] text-[#EBB369] shadow-inner">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#F9EDE4] tracking-tight">
              Link History
            </h1>
            <p className="text-xs sm:text-sm text-[#EBB369]/80">
              View, search and manage all your shortened links.
            </p>
          </div>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-4 bg-[#1E161A] border border-[#3B262F] rounded-xl px-4 py-2 text-xs shadow-md shadow-[#140F12]/30">
          <div className="flex items-center gap-1.5 text-[#EBB369]">
            <Link2 className="w-4 h-4 text-[#EBB369]" />
            <span><strong className="text-[#F9EDE4] font-semibold">{urls.length}</strong> links</span>
          </div>
          <div className="w-px h-4 bg-[#3B262F]" />
          <div className="flex items-center gap-1.5 text-[#EBB369]">
            <MousePointerClick className="w-4 h-4 text-[#E09363]" />
            <span><strong className="text-[#F9EDE4] font-semibold">{totalClicks}</strong> total clicks</span>
          </div>
        </div>
      </div>

      {/* Search & Refresh Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EBB369]/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search links..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1E161A] border border-[#3B262F] text-xs text-[#F9EDE4] placeholder:text-[#EBB369]/40 outline-none focus:border-[#EBB369] focus:ring-2 focus:ring-[#EBB369]/20 transition-all font-normal"
          />
        </div>

        <button
          onClick={fetchUrls}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#3B262F] bg-[#1E161A] hover:bg-[#2B1F24] text-xs font-semibold text-[#EBB369] hover:text-[#F9EDE4] transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#EBB369] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* URL History List */}
      <UrlList urls={filteredUrls} loading={loading} />
    </main>
  );
};

export default HistoryPage;
