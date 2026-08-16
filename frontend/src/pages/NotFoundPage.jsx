import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Frown } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
      <div className="text-center max-w-sm flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0e121c] border border-slate-800 text-slate-500 mb-6 shadow-inner">
          <Frown className="w-8 h-8" />
        </div>
        <span className="font-editorial text-6xl font-bold text-indigo-300 mb-2">
          404
        </span>
        <h1 className="font-editorial text-2xl font-semibold text-slate-100 mb-2">
          Page not found
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          The link you followed doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#c7d2fe] hover:bg-[#b4c6fc] text-[#0b0e14] text-xs font-bold shadow-md transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
