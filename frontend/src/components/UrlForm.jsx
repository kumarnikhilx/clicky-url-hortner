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
        {/* Main URL Input Box */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-[#091a13] border border-emerald-900/50 rounded-xl p-2 focus-within:border-emerald-500/60 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all shadow-lg">
          <div className="flex items-center gap-3 px-3 py-1.5 flex-1 bg-transparent">
            <Link2 className="w-5 h-5 text-emerald-400/80 shrink-0" />
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              className="w-full bg-transparent border-0 outline-none text-emerald-50 font-normal text-sm placeholder:text-emerald-700/60 focus:outline-none focus:ring-0 ring-0 selection:bg-emerald-500 selection:text-black"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#34d399] hover:bg-[#2ee59d] active:bg-[#22c55e] text-[#051d10] text-xs font-bold tracking-wide shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
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
              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-500/70 hover:text-emerald-300 transition-colors w-fit cursor-pointer"
              onClick={() => setShowSlugInput(!showSlugInput)}
            >
              {showSlugInput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>Custom alias (optional)</span>
            </button>

            {showSlugInput && (
              <div className="flex items-center bg-[#091a13] border border-emerald-900/50 rounded-xl overflow-hidden text-xs">
                <span className="px-3.5 py-2.5 bg-[#0e271d] text-emerald-500/80 border-r border-emerald-900/50 font-mono select-none">
                  {import.meta.env.VITE_API_URL.replace('/api', '')}/
                </span>
                <input
                  id="slug-input"
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="custom-slug"
                  className="flex-1 bg-transparent px-3 py-2 text-emerald-50 outline-none border-0 placeholder:text-emerald-700/60 font-mono text-xs focus:outline-none focus:ring-0 ring-0"
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