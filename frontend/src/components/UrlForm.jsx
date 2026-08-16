import React, { useState } from 'react';
import { Link2, Sparkles, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { createShortUrl } from '../services/urlService';
import { useAuth } from '../context/AuthContext';
import ShortUrlResult from './ShortUrlResult';

const UrlForm = ({ onUrlCreated }) => {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [showSlugInput, setShowSlugInput] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      setShortUrl('');

      const data = await createShortUrl(url.trim(), customSlug);
      setShortUrl(data.shortUrl);
      toast.success('Short link created!');

      if (onUrlCreated) {
        onUrlCreated();
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to shorten URL. Please try again.';
      toast.error(message);
      console.error('URL shortening error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Main URL Input Box matching screenshot */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-[#141925] border border-slate-800 rounded-xl p-2 focus-within:border-indigo-400/50 focus-within:ring-2 focus-within:ring-indigo-400/10 transition-all shadow-xl">
          <div className="flex items-center gap-3 px-3 py-1.5 flex-1 bg-transparent">
            <Link2 className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              className="w-full bg-transparent border-0 outline-none text-slate-100 font-normal text-sm placeholder:text-slate-500 focus:outline-none focus:ring-0 ring-0 selection:bg-indigo-400 selection:text-black"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#c7d2fe] hover:bg-[#b4c6fc] active:bg-[#a5b4fc] text-[#0b0e14] text-xs font-bold tracking-wide shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Shortening...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Shorten</span>
              </>
            )}
          </button>
        </div>

        {/* Custom Slug (Only for Authenticated Users) */}
        {isAuthenticated && (
          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors w-fit cursor-pointer"
              onClick={() => setShowSlugInput(!showSlugInput)}
            >
              {showSlugInput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>Custom alias (optional)</span>
            </button>

            {showSlugInput && (
              <div className="flex items-center bg-[#141925] border border-slate-800 rounded-xl overflow-hidden text-xs">
                <span className="px-3.5 py-2.5 bg-[#1b2232] text-slate-400 border-r border-slate-800 font-mono select-none">
                  {import.meta.env.VITE_API_URL.replace('/api', '')}/
                </span>
                <input
                  id="slug-input"
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="custom-slug"
                  className="flex-1 bg-transparent px-3 py-2 text-slate-100 outline-none border-0 placeholder:text-slate-600 font-mono text-xs focus:outline-none focus:ring-0 ring-0"
                  disabled={loading}
                />
              </div>
            )}
          </div>
        )}
      </form>

      {/* Result Display */}
      {shortUrl && <ShortUrlResult shortUrl={shortUrl} />}
    </div>
  );
};

export default UrlForm;