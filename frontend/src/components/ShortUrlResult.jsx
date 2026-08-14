import React, { useState } from 'react';
import { Copy, CheckCheck, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const ShortUrlResult = ({ shortUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 p-4 rounded-xl border border-emerald-900/60 bg-[#081a12]/80 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 mb-1">
            Shortened Link
          </p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-emerald-100 hover:text-emerald-300 transition-colors truncate block"
          >
            {shortUrl}
          </a>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-[#0b2419] border-emerald-900/60 text-emerald-300 hover:bg-emerald-900/40 hover:text-emerald-100'
            }`}
            title="Copy to clipboard"
          >
            {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-emerald-900/60 bg-[#0b2419] text-emerald-300 hover:bg-emerald-900/40 hover:text-emerald-100 transition-all"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShortUrlResult;
