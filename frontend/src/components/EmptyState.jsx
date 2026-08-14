import React from 'react';
import { Link2Off } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-emerald-900/40 bg-[#071610]/40">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-950/60 text-emerald-500 mb-4 border border-emerald-900/40 shadow-inner">
        <Link2Off className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-emerald-200">No links yet</h3>
      <p className="text-sm text-emerald-500/70 mt-1 max-w-xs">
        Create your first shortened link using the form above.
      </p>
    </div>
  );
};

export default EmptyState;
