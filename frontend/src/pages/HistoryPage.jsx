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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#B2E2EB]">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#FFFFFF] border border-[#B2E2EB] text-[#0083A0] shadow-sm">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#062E3B] tracking-tight">
              Link History
            </h1>
            <p className="text-xs sm:text-sm text-[#4A7A85] font-medium">
              View, search and manage all your shortened links.
            </p>
          </div>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-4 bg-[#FFFFFF] border border-[#B2E2EB] rounded-xl px-4 py-2 text-xs shadow-sm shadow-[#00A8CC]/10">
          <div className="flex items-center gap-1.5 text-[#0083A0]">
            <Link2 className="w-4 h-4 text-[#00A8CC]" />
            <span><strong className="text-[#062E3B] font-bold">{urls.length}</strong> links</span>
          </div>
          <div className="w-px h-4 bg-[#B2E2EB]" />
          <div className="flex items-center gap-1.5 text-[#0083A0]">
            <MousePointerClick className="w-4 h-4 text-[#00A8CC]" />
            <span><strong className="text-[#062E3B] font-bold">{totalClicks}</strong> total clicks</span>
          </div>
        </div>
      </div>

      {/* Search & Refresh Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5E9EA8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search links..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#B2E2EB] text-xs text-[#062E3B] placeholder:text-[#5E9EA8] outline-none focus:border-[#00A8CC] focus:ring-2 focus:ring-[#00A8CC]/20 transition-all font-medium shadow-sm"
          />
        </div>

        <button
          onClick={fetchUrls}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#B2E2EB] bg-[#FFFFFF] hover:bg-[#DDF2F5] text-xs font-semibold text-[#0083A0] hover:text-[#005C70] transition-all cursor-pointer disabled:opacity-50 shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#00A8CC] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* URL History List */}
      <UrlList urls={filteredUrls} loading={loading} />
    </main>
  );
};

export default HistoryPage;
