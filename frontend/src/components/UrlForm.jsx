import { useState } from 'react';
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
        {/* Main URL Input */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-slate-900 border border-slate-700/80 rounded-2xl p-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-lg">
          <div className="flex items-center gap-3 px-3 py-1 flex-1">
            <Link2 className="w-5 h-5 text-slate-500 shrink-0" />
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              className="w-full bg-transparent border-none outline-none text-slate-100 text-sm placeholder:text-slate-500"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold shadow-md hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Shortening...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Shorten URL</span>
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
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl overflow-hidden text-xs">
                <span className="px-3.5 py-2.5 bg-slate-800/80 text-slate-400 border-r border-slate-800 font-mono select-none">
                  {import.meta.env.VITE_API_URL.replace('/api', '')}/
                </span>
                <input
                  id="slug-input"
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="custom-slug"
                  className="flex-1 bg-transparent px-3 py-2 text-slate-100 outline-none placeholder:text-slate-600 font-mono"
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