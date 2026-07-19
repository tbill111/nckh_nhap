import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const INPUT_CLS = 'w-full bg-[#0D1117] border border-[#30363D] rounded px-3 py-2 text-sm text-[#E6EDF3] focus:border-[#0969DA] outline-none placeholder:text-[#8B949E]';
const LABEL_CLS = 'text-xs text-[#8B949E] mb-1 block font-medium';
const SECTION_CLS = 'bg-[#161B22] border border-[#30363D] rounded-md p-5 mb-4';

export default function Settings() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({ name: 'Nguyễn Thái An', email: 'an.nguyen@edu.vn', faculty: 'Công nghệ thông tin', phone: '0901 234 567' });
  const [notifs, setNotifs] = useState({ violation: true, dailySummary: true, aiComplete: false, weeklyReport: true });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Thông tin đã được cập nhật!', description: 'Hồ sơ giảng viên đã được lưu thành công.' });
  };

  const handleSaveNotifs = () => {
    toast({ title: 'Cài đặt đã được lưu!', description: 'Tuỳ chọn thông báo đã được cập nhật.' });
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon size={18} className="text-[#8B949E]" />
        <h1 className="text-base font-bold text-[#E6EDF3]">Cài đặt hệ thống</h1>
      </div>

      {/* Profile */}
      <div className={SECTION_CLS}>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#30363D]">
          <User size={15} className="text-[#0969DA]" />
          <h2 className="text-sm font-semibold text-[#E6EDF3]">Thông tin giảng viên</h2>
        </div>
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLS}>Họ và tên</label>
              <input className={INPUT_CLS} value={profile.name}
                onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className={LABEL_CLS}>Email</label>
              <input className={INPUT_CLS} type="email" value={profile.email}
                onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLS}>Khoa / Bộ môn</label>
              <input className={INPUT_CLS} value={profile.faculty}
                onChange={e => setProfile(p => ({ ...p, faculty: e.target.value }))} />
            </div>
            <div>
              <label className={LABEL_CLS}>Số điện thoại</label>
              <input className={INPUT_CLS} value={profile.phone}
                onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
            </div>
          </div>
          <div className="flex justify-end mt-1">
            <button type="submit"
              className="flex items-center gap-2 text-sm bg-[#0969DA] hover:bg-[#0860C4] text-white px-4 py-2 rounded transition-colors">
              <Save size={14} />Lưu thay đổi
            </button>
          </div>
        </form>
      </div>

      {/* Notifications */}
      <div className={SECTION_CLS}>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#30363D]">
          <Bell size={15} className="text-[#0969DA]" />
          <h2 className="text-sm font-semibold text-[#E6EDF3]">Cài đặt thông báo</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: 'violation', label: 'Nhận thông báo khi phát hiện vi phạm mới', desc: 'Nhận cảnh báo ngay lập tức qua email khi có sinh viên bị gắn cờ gian lận.' },
            { key: 'dailySummary', label: 'Nhận email tóm tắt hàng ngày', desc: 'Tổng hợp hoạt động của ngày gửi lúc 18:00 mỗi ngày làm việc.' },
            { key: 'aiComplete', label: 'Thông báo khi AI phân tích xong', desc: 'Nhận thông báo khi hệ thống AI hoàn tất phân tích một nhóm mới.' },
            { key: 'weeklyReport', label: 'Báo cáo tuần vào thứ Hai', desc: 'Báo cáo tổng hợp tiến độ các lớp học gửi vào đầu tuần.' },
          ].map(item => (
            <div key={item.key} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[#E6EDF3]">{item.label}</p>
                <p className="text-xs text-[#8B949E] mt-0.5">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                className={`shrink-0 w-10 h-5 rounded-full transition-colors relative ${notifs[item.key as keyof typeof notifs] ? 'bg-[#0969DA]' : 'bg-[#30363D]'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${notifs[item.key as keyof typeof notifs] ? 'left-5.5 translate-x-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-5">
          <button onClick={handleSaveNotifs}
            className="flex items-center gap-2 text-sm bg-[#0969DA] hover:bg-[#0860C4] text-white px-4 py-2 rounded transition-colors">
            <Save size={14} />Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
}
