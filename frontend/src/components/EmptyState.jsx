import React from 'react';
import { Link2Off } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-[#3B262F] bg-[#1E161A]/50">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2B1F24] text-[#EBB369] mb-4 border border-[#3B262F] shadow-inner">
        <Link2Off className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-[#F9EDE4]">No links yet</h3>
      <p className="text-sm text-[#EBB369]/70 mt-1 max-w-xs">
        Create your first shortened link using the form above.
      </p>
    </div>
  );
};

export default EmptyState;
