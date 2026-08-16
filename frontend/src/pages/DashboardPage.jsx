import React, { useState, useEffect, useCallback } from 'react';
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
    <main className="max-w-4xl mx-auto w-full px-4 py-8 sm:py-12">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-[#B2E2EB]">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#FFFFFF] border border-[#B2E2EB] text-[#0083A0] shadow-sm">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#062E3B] tracking-tight">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-[#4A7A85] font-medium">
              Create and manage all your shortened links.
            </p>
          </div>
        </div>
      </div>

      {/* URL Shortener Form Section */}
      <section className="p-6 sm:p-8 rounded-2xl border border-[#B2E2EB] bg-[#FFFFFF]/95 backdrop-blur-xl shadow-xl shadow-[#00A8CC]/10 mb-10">
        <UrlForm onUrlCreated={handleUrlCreated} />
      </section>

      {/* Link List Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-[#062E3B] uppercase tracking-widest">
            Your Links
          </h2>
          <button
            onClick={fetchUrls}
            disabled={loadingUrls}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B2E2EB] bg-[#FFFFFF] hover:bg-[#DDF2F5] text-xs font-semibold text-[#0083A0] hover:text-[#005C70] transition-all cursor-pointer disabled:opacity-50 shadow-sm"
            title="Refresh links"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#00A8CC] ${loadingUrls ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        <UrlList urls={urls} loading={loadingUrls} />
      </section>
    </main>
  );
};

export default DashboardPage;
