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
    <div className="p-4 sm:p-5 rounded-xl border border-[#B2E2EB] bg-[#FFFFFF] hover:border-[#00A8CC]/60 shadow-md shadow-[#00A8CC]/10 transition-all flex flex-col gap-3 group">
      {/* Original link */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0083A0] block mb-1">
          Original URL
        </span>
        <a
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#4A7A85] hover:text-[#062E3B] transition-colors line-clamp-1 break-all font-medium"
          title={url.originalUrl}
        >
          {url.originalUrl}
        </a>
      </div>

      {/* Short link */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0083A0] block mb-1">
          Short Link
        </span>
        <a
          href={fullShortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-[#0083A0] hover:text-[#005C70] transition-colors truncate block font-mono"
        >
          {fullShortUrl}
        </a>
      </div>

      {/* Bottom info & actions */}
      <div className="pt-3 border-t border-[#B2E2EB]/60 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-[#062E3B] font-semibold">
          <MousePointerClick className="w-3.5 h-3.5 text-[#00A8CC]" />
          <span>{url.click} {url.click === 1 ? 'click' : 'clicks'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              copied
                ? 'bg-[#DDF2F5] border-[#00A8CC] text-[#0083A0] shadow-sm'
                : 'bg-[#E3F4F7] border-[#B2E2EB] text-[#062E3B] hover:bg-[#DDF2F5] hover:text-[#0083A0]'
            }`}
          >
            {copied ? <CheckCheck className="w-3.5 h-3.5 text-[#0083A0]" /> : <Copy className="w-3.5 h-3.5 text-[#0083A0]" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <a
            href={fullShortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B2E2EB] bg-[#E3F4F7] text-[#0083A0] hover:bg-[#DDF2F5] hover:text-[#005C70] text-xs font-semibold transition-all shadow-sm"
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
