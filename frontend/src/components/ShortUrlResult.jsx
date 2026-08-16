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
    <div className="mt-4 p-4 rounded-xl border border-[#B2E2EB] bg-[#FFFFFF] shadow-lg shadow-[#00A8CC]/10 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#0083A0] mb-1">
            Shortened Link
          </p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#062E3B] hover:text-[#00A8CC] transition-colors truncate block font-mono"
          >
            {shortUrl}
          </a>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
              copied
                ? 'bg-[#DDF2F5] border-[#00A8CC] text-[#0083A0] shadow-sm'
                : 'bg-[#E3F4F7] border-[#B2E2EB] text-[#062E3B] hover:bg-[#DDF2F5] hover:text-[#0083A0]'
            }`}
            title="Copy to clipboard"
          >
            {copied ? <CheckCheck className="w-4 h-4 text-[#0083A0]" /> : <Copy className="w-4 h-4 text-[#0083A0]" />}
          </button>

          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-[#B2E2EB] bg-[#E3F4F7] text-[#0083A0] hover:bg-[#DDF2F5] hover:text-[#005C70] transition-all shadow-sm"
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
