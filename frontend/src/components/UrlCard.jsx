import React, { useState } from 'react';
import { Copy, CheckCheck, ExternalLink, MousePointerClick } from 'lucide-react';
import toast from 'react-hot-toast';

const UrlCard = ({ url, backendBaseUrl }) => {
  const [copied, setCopied] = useState(false);
  const fullShortUrl = `${backendBaseUrl}${url.shortUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShortUrl);
    setCopied(true);
    toast.success('Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl border border-emerald-900/40 bg-[#071610]/80 hover:border-emerald-700/50 transition-all flex flex-col gap-3 group">
      {/* Original link */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60 block mb-1">
          Original URL
        </span>
        <a
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-300/70 hover:text-emerald-100 transition-colors line-clamp-1 break-all"
          title={url.originalUrl}
        >
          {url.originalUrl}
        </a>
      </div>

      {/* Short link */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60 block mb-1">
          Short Link
        </span>
        <a
          href={fullShortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors truncate block"
        >
          {fullShortUrl}
        </a>
      </div>

      {/* Bottom info & actions */}
      <div className="pt-3 border-t border-emerald-950 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-emerald-400/80 font-medium">
          <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
          <span>{url.click} {url.click === 1 ? 'click' : 'clicks'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-[#0b2419] border-emerald-900/60 text-emerald-300 hover:bg-emerald-900/40 hover:text-emerald-100'
            }`}
          >
            {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <a
            href={fullShortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-900/60 bg-[#0b2419] text-emerald-300 hover:bg-emerald-900/40 hover:text-emerald-100 text-xs font-semibold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
