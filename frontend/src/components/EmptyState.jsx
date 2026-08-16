import React from 'react';
import { Link2Off } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-[#B2E2EB] bg-[#FFFFFF]/70 shadow-sm">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#DDF2F5] text-[#0083A0] mb-4 border border-[#B2E2EB] shadow-inner">
        <Link2Off className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-[#062E3B]">No links yet</h3>
      <p className="text-sm text-[#4A7A85] mt-1 max-w-xs font-medium">
        Create your first shortened link using the form above.
      </p>
    </div>
  );
};

export default EmptyState;
