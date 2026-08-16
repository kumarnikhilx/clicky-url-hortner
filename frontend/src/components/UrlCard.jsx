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
    <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#0e121c]/80 hover:border-slate-700 transition-all flex flex-col gap-3 group">
      {/* Original link */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
          Original URL
        </span>
        <a
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-300 hover:text-white transition-colors line-clamp-1 break-all"
          title={url.originalUrl}
        >
          {url.originalUrl}
        </a>
      </div>

      {/* Short link */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
          Short Link
        </span>
        <a
          href={fullShortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-indigo-300 hover:text-indigo-200 transition-colors truncate block font-mono"
        >
          {fullShortUrl}
        </a>
      </div>

      {/* Bottom info & actions */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <MousePointerClick className="w-3.5 h-3.5 text-indigo-400" />
          <span>{url.click} {url.click === 1 ? 'click' : 'clicks'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-[#151b27] border-slate-700/60 text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <a
            href={fullShortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/60 bg-[#151b27] text-slate-300 hover:bg-slate-700/50 hover:text-white text-xs font-semibold transition-all"
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
