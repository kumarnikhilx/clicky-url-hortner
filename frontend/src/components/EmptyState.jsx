import React from 'react';
import { Link2Off } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800/80 text-slate-400 mb-4 shadow-inner">
        <Link2Off className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-200">No links yet</h3>
      <p className="text-sm text-slate-400 mt-1 max-w-xs">
        Create your first shortened link using the form above.
      </p>
    </div>
  );
};

export default EmptyState;
