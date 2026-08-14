import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Frown } from 'lucide-react';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-sm flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#071610] border border-emerald-900/50 text-emerald-500 mb-6 shadow-inner">
            <Frown className="w-8 h-8" />
          </div>
          <span className="font-editorial text-6xl font-bold text-emerald-400 mb-2">
            404
          </span>
          <h1 className="font-editorial text-2xl font-semibold text-emerald-100 mb-2">
            Page not found
          </h1>
          <p className="text-sm text-emerald-500/70 mb-6">
            The link you followed doesn&apos;t exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#34d399] hover:bg-[#2ee59d] text-[#051d10] text-xs font-bold shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
