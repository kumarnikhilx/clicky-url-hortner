import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Lock, Infinity as InfinityIcon, Target, History, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserUrls } from '../services/urlService';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import Footer from '../components/Footer';

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
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-2xl text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-900/60 bg-[#06180f]/80 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase mb-8 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>Fast, Free & Simple</span>
          </div>

          {/* Editorial Serif Heading */}
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-emerald-50 mb-4 leading-tight">
            Shorten your reach.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-emerald-200/60 max-w-lg mb-10 font-normal leading-relaxed">
            A quiet space for your digital connections.
          </p>

          {/* Main Card Container */}
          <div className="w-full p-6 sm:p-8 rounded-2xl border border-emerald-900/50 bg-[#071610]/90 backdrop-blur-xl shadow-2xl mb-10 text-left">
            <UrlForm onUrlCreated={handleUrlCreated} />
          </div>

          {/* Logged-in recent links section OR public feature badges */}
          {isAuthenticated ? (
            <div className="w-full text-left mt-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
                    Recent Links
                  </h2>
                </div>
                <Link
                  to="/history"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>View all</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <UrlList urls={urls.slice(0, 3)} loading={loadingUrls} />
            </div>
          ) : (
            /* Bottom 3 Feature Pills matching screenshot */
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-xs text-emerald-500/70 font-medium">
              <div className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Private</span>
              </div>
              <span className="text-emerald-900">•</span>
              <div className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                <InfinityIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Persistent</span>
              </div>
              <span className="text-emerald-900">•</span>
              <div className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Precise</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer matching screenshot */}
      <Footer />
    </div>
  );
};

export default HomePage;
