import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Frown } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="text-center max-w-sm flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 mb-6 shadow-inner">
          <Frown className="w-8 h-8" />
        </div>
        <span className="text-6xl font-black bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-2">
          404
        </span>
        <h1 className="text-xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-sm text-slate-400 mb-6">
          The link you followed doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
