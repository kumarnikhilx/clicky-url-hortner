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
    <div className="p-4 sm:p-5 rounded-xl border border-[#3B262F] bg-[#1E161A]/85 hover:border-[#EBB369]/50 shadow-lg shadow-[#140F12]/40 transition-all flex flex-col gap-3 group">
      {/* Original link */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#EBB369]/70 block mb-1">
          Original URL
        </span>
        <a
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#F9EDE4]/70 hover:text-[#F9EDE4] transition-colors line-clamp-1 break-all"
          title={url.originalUrl}
        >
          {url.originalUrl}
        </a>
      </div>

      {/* Short link */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#EBB369]/70 block mb-1">
          Short Link
        </span>
        <a
          href={fullShortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-[#EBB369] hover:text-[#F9EDE4] transition-colors truncate block font-mono"
        >
          {fullShortUrl}
        </a>
      </div>

      {/* Bottom info & actions */}
      <div className="pt-3 border-t border-[#3B262F]/50 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-[#EBB369] font-medium">
          <MousePointerClick className="w-3.5 h-3.5 text-[#E09363]" />
          <span>{url.click} {url.click === 1 ? 'click' : 'clicks'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              copied
                ? 'bg-[#3B262F] border-[#EBB369] text-[#F9EDE4] shadow-sm shadow-[#EBB369]/20'
                : 'bg-[#2B1F24] border-[#3B262F] text-[#F9EDE4] hover:bg-[#3B262F] hover:text-white'
            }`}
          >
            {copied ? <CheckCheck className="w-3.5 h-3.5 text-[#EBB369]" /> : <Copy className="w-3.5 h-3.5 text-[#EBB369]" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <a
            href={fullShortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#3B262F] bg-[#2B1F24] text-[#EBB369] hover:bg-[#3B262F] hover:text-white text-xs font-semibold transition-all"
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
