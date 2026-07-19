import React from 'react';

function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-[#21262D] animate-pulse rounded ${className ?? ''}`} />;
}

export function PageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#161B22] border border-[#30363D] rounded p-3 h-24 flex flex-col gap-3">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-4" />
            </div>
            <Skeleton className="h-7 w-16" />
          </div>
        ))}
      </div>
      <div className="bg-[#161B22] border border-[#30363D] rounded-md overflow-hidden">
        <div className="bg-[#161B22] border-b border-[#30363D] p-3">
          <Skeleton className="h-4 w-40" />
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-4 px-3 py-2.5 border-b border-[#30363D]">
            <Skeleton className="h-3 w-6" />
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skeleton;
