import React from 'react';
import { FolderGit2 } from 'lucide-react';

export default function Assignments() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center h-full">
      <div className="bg-[#161B22] p-4 rounded-full border border-[#30363D] mb-4">
        <FolderGit2 size={32} className="text-[#2EA44F]" />
      </div>
      <h2 className="text-xl font-bold text-[#E6EDF3] mb-2">Bài tập & Đồ án</h2>
      <p className="text-[#8B949E] text-sm max-w-md">Tính năng đang được phát triển. Xem danh sách các bài tập, đồ án và cấu hình deadline cho từng nhóm.</p>
    </div>
  );
}