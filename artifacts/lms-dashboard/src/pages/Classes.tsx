import React from 'react';
import { Users } from 'lucide-react';

export default function Classes() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center h-full">
      <div className="bg-[#161B22] p-4 rounded-full border border-[#30363D] mb-4">
        <Users size={32} className="text-[#0969DA]" />
      </div>
      <h2 className="text-xl font-bold text-[#E6EDF3] mb-2">Quản lý Lớp học</h2>
      <p className="text-[#8B949E] text-sm max-w-md">Tính năng đang được phát triển. Bạn sẽ có thể quản lý danh sách sinh viên và các lớp học tại đây.</p>
    </div>
  );
}