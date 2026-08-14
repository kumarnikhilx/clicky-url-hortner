import React from 'react';
import { Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-emerald-950/60 bg-[#040e09]/80 backdrop-blur-md py-8 px-4 sm:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-emerald-600/70">
        {/* Brand */}
        <div className="flex items-center gap-2 text-emerald-400">
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span className="font-editorial text-base font-semibold tracking-wide text-emerald-200">
            Clicky
          </span>
        </div>

        {/* Tagline */}
        <div className="text-center font-normal text-emerald-500/60">
          © {new Date().getFullYear()} Clicky. Precision in every link.
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 flex-wrap justify-center font-medium">
          <span className="hover:text-emerald-300 transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-emerald-300 transition-colors cursor-pointer">Terms of Service</span>
          <span className="hover:text-emerald-300 transition-colors cursor-pointer">API Documentation</span>
          <span className="hover:text-emerald-300 transition-colors cursor-pointer">Support</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
