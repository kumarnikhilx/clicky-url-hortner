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
        {/* Main URL Input Box matching sunset theme */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-[#1E161A] border border-[#3B262F] rounded-xl p-2 focus-within:border-[#EBB369] focus-within:ring-2 focus-within:ring-[#EBB369]/20 transition-all shadow-xl shadow-[#140F12]/50">
          <div className="flex items-center gap-3 px-3 py-1.5 flex-1 bg-transparent">
            <Link2 className="w-5 h-5 text-[#EBB369] shrink-0" />
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              className="w-full bg-transparent border-0 outline-none text-[#F9EDE4] font-normal text-sm placeholder:text-[#EBB369]/50 focus:outline-none focus:ring-0 ring-0 selection:bg-[#EBB369] selection:text-[#140F12]"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#EBB369] via-[#E09363] to-[#C87D82] hover:opacity-95 text-[#140F12] text-xs font-bold tracking-wide shadow-md shadow-[#140F12]/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#140F12]" />
                <span>Shortening...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#140F12]" />
                <span>Shorten Url</span>
              </>
            )}
          </button>
        </div>

        {/* Custom Slug (Only for Authenticated Users) */}
        {isAuthenticated && (
          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#EBB369] hover:text-[#F9EDE4] transition-colors w-fit cursor-pointer"
              onClick={() => setShowSlugInput(!showSlugInput)}
            >
              {showSlugInput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>Custom alias (optional)</span>
            </button>

            {showSlugInput && (
              <div className="flex items-center bg-[#2B1F24] border border-[#3B262F] rounded-xl overflow-hidden text-xs">
                <span className="px-3.5 py-2.5 bg-[#1E161A] text-[#EBB369] border-r border-[#3B262F] font-mono select-none">
                  {import.meta.env.VITE_API_URL.replace('/api', '')}/
                </span>
                <input
                  id="slug-input"
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="custom-slug"
                  className="flex-1 bg-transparent px-3 py-2 text-[#F9EDE4] outline-none border-0 placeholder:text-[#EBB369]/40 font-mono text-xs focus:outline-none focus:ring-0 ring-0"
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