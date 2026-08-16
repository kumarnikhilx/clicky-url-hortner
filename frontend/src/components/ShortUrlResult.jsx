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
    <div className="mt-4 p-4 rounded-xl border border-slate-800/80 bg-[#121723]/90 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 mb-1">
            Shortened Link
          </p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-100 hover:text-indigo-300 transition-colors truncate block font-mono"
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
                : 'bg-[#182030] border-slate-700/60 text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
            title="Copy to clipboard"
          >
            {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-slate-700/60 bg-[#182030] text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all"
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
