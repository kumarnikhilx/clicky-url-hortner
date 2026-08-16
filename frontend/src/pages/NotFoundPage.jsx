import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Frown } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
      <div className="text-center max-w-sm flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#DDF2F5] border border-[#B2E2EB] text-[#0083A0] mb-6 shadow-inner">
          <Frown className="w-8 h-8" />
        </div>
        <span className="font-editorial text-6xl font-bold text-[#0083A0] mb-2 drop-shadow-sm">
          404
        </span>
        <h1 className="font-editorial text-2xl font-bold text-[#062E3B] mb-2">
          Page not found
        </h1>
        <p className="text-sm text-[#4A7A85] font-medium mb-6">
          The link you followed doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00A8CC] to-[#20B2AA] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-[#00A8CC]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
