import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Link2, Zap, Shield, BarChart3, History, ArrowRight } from 'lucide-react';
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
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-2xl text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span>Fast, free & simple</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Shorten any link, <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            share it everywhere
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-400 max-w-lg mb-8 leading-relaxed">
          {isAuthenticated
            ? 'Create custom short links and track your clicks with ease.'
            : 'Paste your long URL below and generate a short, easy-to-share link in seconds. No account required.'}
        </p>

        {/* Form Container Card */}
        <div className="w-full p-5 sm:p-7 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl mb-8 text-left">
          <UrlForm onUrlCreated={handleUrlCreated} />
        </div>

        {/* Logged in: History preview section */}
        {isAuthenticated ? (
          <div className="w-full text-left mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                  Recent Links
                </h2>
              </div>
              <Link
                to="/history"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <UrlList urls={urls.slice(0, 3)} loading={loadingUrls} />
          </div>
        ) : (
          /* Public feature pills */
          <div className="flex items-center justify-center gap-6 sm:gap-8 flex-wrap text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-indigo-400" />
              <span>Instant shorten</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>No account required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Click tracking</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
