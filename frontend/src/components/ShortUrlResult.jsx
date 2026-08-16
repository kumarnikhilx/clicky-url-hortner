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
    <div className="mt-4 p-4 rounded-xl border border-[#3B262F] bg-[#1E161A]/95 backdrop-blur-sm shadow-lg shadow-[#140F12]/50 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#EBB369] mb-1">
            Shortened Link
          </p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#F9EDE4] hover:text-[#EBB369] transition-colors truncate block font-mono"
          >
            {shortUrl}
          </a>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
              copied
                ? 'bg-[#3B262F] border-[#EBB369] text-[#F9EDE4] shadow-sm shadow-[#EBB369]/20'
                : 'bg-[#2B1F24] border-[#3B262F] text-[#F9EDE4] hover:bg-[#3B262F] hover:text-white'
            }`}
            title="Copy to clipboard"
          >
            {copied ? <CheckCheck className="w-4 h-4 text-[#EBB369]" /> : <Copy className="w-4 h-4 text-[#EBB369]" />}
          </button>

          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-[#3B262F] bg-[#2B1F24] text-[#EBB369] hover:bg-[#3B262F] hover:text-white transition-all"
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
