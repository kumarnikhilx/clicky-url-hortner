import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Frown } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
      <div className="text-center max-w-sm flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2B1F24] border border-[#3B262F] text-[#EBB369] mb-6 shadow-inner">
          <Frown className="w-8 h-8" />
        </div>
        <span className="font-editorial text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F0C06A] via-[#E09363] to-[#C87D82] mb-2 drop-shadow-[0_0_20px_rgba(235,179,105,0.3)]">
          404
        </span>
        <h1 className="font-editorial text-2xl font-semibold text-[#F9EDE4] mb-2">
          Page not found
        </h1>
        <p className="text-sm text-[#EBB369]/80 mb-6">
          The link you followed doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#EBB369] via-[#E09363] to-[#C87D82] hover:opacity-95 text-[#140F12] text-xs font-bold shadow-md shadow-[#140F12]/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
