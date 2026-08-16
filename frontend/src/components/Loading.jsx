import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#140F12]/80 backdrop-blur-sm z-50">
        <Loader2 className="w-10 h-10 text-[#EBB369] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 text-[#EBB369] animate-spin" />
    </div>
  );
};

export default Loading;
