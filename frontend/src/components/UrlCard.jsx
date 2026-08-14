import { useState } from 'react';
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
    <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700/80 transition-all flex flex-col gap-3 group">
      {/* Original link */}
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
          Original URL
        </span>
        <a
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-300 hover:text-slate-100 transition-colors line-clamp-1 break-all"
          title={url.originalUrl}
        >
          {url.originalUrl}
        </a>
      </div>

      {/* Short link */}
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
          Short Link
        </span>
        <a
          href={fullShortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors truncate block"
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
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <a
            href={fullShortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white text-xs font-medium transition-all"
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
