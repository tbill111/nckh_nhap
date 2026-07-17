import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center h-full">
      <div className="bg-[#161B22] p-4 rounded-full border border-[#30363D] mb-4">
        <SettingsIcon size={32} className="text-[#8B949E]" />
      </div>
      <h2 className="text-xl font-bold text-[#E6EDF3] mb-2">Cài đặt hệ thống</h2>
      <p className="text-[#8B949E] text-sm max-w-md">Cấu hình tham số AI, điểm ngưỡng, quản lý thông báo và thông tin cá nhân của giảng viên.</p>
    </div>
  );
}