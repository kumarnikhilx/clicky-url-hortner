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
        {/* Badge with cyan lightning */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B2E2EB] bg-[#FFFFFF] text-[#062E3B] text-[11px] font-bold tracking-widest uppercase mb-6 shadow-sm shadow-[#00A8CC]/15">
          <Zap className="w-3.5 h-3.5 text-[#00A8CC] fill-[#00A8CC]" />
          <span>Fast, Free & Simple</span>
        </div>

        {/* Editorial Serif Heading in crisp dark ocean cyan */}
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-[#062E3B] mb-3 leading-tight drop-shadow-sm">
          Shorten your reach.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#4A7A85] max-w-lg mb-8 font-medium leading-relaxed">
          A quiet space for your digital connections.
        </p>

        {/* Main Card Container */}
        <div className="w-full p-6 sm:p-8 rounded-2xl border border-[#B2E2EB] bg-[#FFFFFF]/95 backdrop-blur-xl shadow-xl shadow-[#00A8CC]/10 mb-8 text-left">
          <UrlForm onUrlCreated={handleUrlCreated} />
        </div>

        {/* Logged-in recent links section OR public feature badges */}
        {isAuthenticated ? (
          <div className="w-full text-left mt-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#0083A0]" />
                <h2 className="text-xs font-bold text-[#062E3B] uppercase tracking-widest">
                  Recent Links
                </h2>
              </div>
              <Link
                to="/history"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0083A0] hover:text-[#005C70] transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <UrlList urls={urls.slice(0, 3)} loading={loadingUrls} />
          </div>
        ) : (
          /* Bottom 3 Feature Pills */
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-xs text-[#062E3B] font-semibold">
            <div className="flex items-center gap-1.5 hover:text-[#0083A0] transition-colors">
              <Lock className="w-3.5 h-3.5 text-[#00A8CC]" />
              <span>Private</span>
            </div>
            <span className="text-[#B2E2EB]">•</span>
            <div className="flex items-center gap-1.5 hover:text-[#0083A0] transition-colors">
              <InfinityIcon className="w-3.5 h-3.5 text-[#0083A0]" />
              <span>Persistent</span>
            </div>
            <span className="text-[#B2E2EB]">•</span>
            <div className="flex items-center gap-1.5 hover:text-[#0083A0] transition-colors">
              <Target className="w-3.5 h-3.5 text-[#00A8CC]" />
              <span>Precise</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
