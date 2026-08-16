import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Lock, Infinity as InfinityIcon, Target, History, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserUrls } from '../services/urlService';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loadingUrls, setLoadingUrls] = useState(false);

  const fetchUrls = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoadingUrls(true);
      const data = await getUserUrls();
      setUrls(data.urls || []);
    } catch (err) {
      console.error('Home URL fetch error:', err);
    } finally {
      setLoadingUrls(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const handleUrlCreated = () => {
    if (isAuthenticated) {
      fetchUrls();
    }
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl text-center flex flex-col items-center my-auto">
        {/* Badge with sunset gold lightning */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3B262F] bg-[#1E161A]/80 text-[#F9EDE4] text-[11px] font-semibold tracking-widest uppercase mb-6 shadow-md shadow-[#140F12]/50">
          <Zap className="w-3.5 h-3.5 text-[#EBB369] fill-[#EBB369]" />
          <span>Fast, Free & Simple</span>
        </div>

        {/* Editorial Serif Heading in warm sunset gold/terracotta/dusty rose glow */}
        <h1 className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F0C06A] via-[#E09363] to-[#C87D82] mb-3 leading-tight drop-shadow-[0_0_30px_rgba(235,179,105,0.25)]">
          Shorten your reach.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#EBB369]/80 max-w-lg mb-8 font-normal leading-relaxed">
          A quiet space for your digital connections.
        </p>

        {/* Main Card Container */}
        <div className="w-full p-6 sm:p-8 rounded-2xl border border-[#3B262F] bg-[#1E161A]/90 backdrop-blur-xl shadow-2xl shadow-[#140F12]/60 mb-8 text-left">
          <UrlForm onUrlCreated={handleUrlCreated} />
        </div>

        {/* Logged-in recent links section OR public feature badges */}
        {isAuthenticated ? (
          <div className="w-full text-left mt-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#EBB369]" />
                <h2 className="text-xs font-bold text-[#F9EDE4] uppercase tracking-widest">
                  Recent Links
                </h2>
              </div>
              <Link
                to="/history"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#EBB369] hover:text-[#F9EDE4] transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <UrlList urls={urls.slice(0, 3)} loading={loadingUrls} />
          </div>
        ) : (
          /* Bottom 3 Feature Pills */
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-xs text-[#EBB369]/70 font-medium">
            <div className="flex items-center gap-1.5 hover:text-[#F9EDE4] transition-colors">
              <Lock className="w-3.5 h-3.5 text-[#E09363]" />
              <span>Private</span>
            </div>
            <span className="text-[#3B262F]">•</span>
            <div className="flex items-center gap-1.5 hover:text-[#F9EDE4] transition-colors">
              <InfinityIcon className="w-3.5 h-3.5 text-[#EBB369]" />
              <span>Persistent</span>
            </div>
            <span className="text-[#3B262F]">•</span>
            <div className="flex items-center gap-1.5 hover:text-[#F9EDE4] transition-colors">
              <Target className="w-3.5 h-3.5 text-[#C87D82]" />
              <span>Precise</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
