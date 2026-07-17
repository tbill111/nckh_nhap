import React from 'react';
import { Link, useLocation } from 'wouter';
import { BookOpen, LayoutDashboard, Users, FolderGit2, BrainCircuit, Monitor, Settings as SettingsIcon, Search, Bell } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const menuItems = [
    { name: 'Tổng quan', path: '/', icon: LayoutDashboard },
    { name: 'Lớp học', path: '/lop-hoc', icon: Users },
    { name: 'Bài tập & Đồ án', path: '/bai-tap', icon: FolderGit2 },
    { name: 'Đánh giá AI', path: '/danh-gia-ai', icon: BrainCircuit },
    { name: 'Giám sát phòng máy', path: '/giam-sat', icon: Monitor },
    { name: 'Cài đặt', path: '/cai-dat', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-[100dvh] w-full bg-[#0D1117] text-[#E6EDF3] font-sans">
      {/* Sidebar */}
      <div className="w-60 border-r border-[#30363D] bg-[#0D1117] flex flex-col shrink-0">
        <div className="h-12 flex items-center px-4 gap-2 border-b border-[#30363D] shrink-0">
          <BookOpen size={20} className="text-[#E6EDF3]" />
          <span className="font-bold text-[#E6EDF3]">EduTrack AI</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path} className={`flex items-center px-4 py-2 my-1 mx-2 rounded-md text-sm gap-3 cursor-pointer ${
                isActive 
                  ? 'bg-[#21262D] border-l-2 border-[#0969DA] text-[#E6EDF3]' 
                  : 'text-[#8B949E] hover:bg-[#21262D] hover:text-[#E6EDF3] border-l-2 border-transparent'
              }`}>
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-12 border-b border-[#30363D] bg-[#0D1117] flex items-center px-4 gap-3 shrink-0">
          <div className="flex items-center bg-[#161B22] border border-[#30363D] rounded px-3 h-8 w-64 focus-within:border-[#0969DA]">
            <Search size={14} className="text-[#8B949E]" />
            <input 
              type="text" 
              placeholder="Tìm kiếm repo, sinh viên..." 
              className="bg-transparent border-none outline-none text-xs text-[#E6EDF3] placeholder:text-[#8B949E] ml-2 w-full"
            />
          </div>
          
          <div className="flex-1" />
          
          <div className="relative cursor-pointer text-[#8B949E] hover:text-[#E6EDF3]">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 bg-[#0969DA] text-white text-[10px] w-3 h-3 flex items-center justify-center rounded-full font-bold">
              3
            </span>
          </div>
          
          <div className="w-px h-6 bg-[#30363D] mx-2"></div>
          
          <div className="flex items-center gap-2">
            <div className="bg-[#0969DA] rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold text-white shrink-0">
              NTA
            </div>
            <span className="text-xs text-[#8B949E]">
              Giảng viên: <span className="text-[#E6EDF3]">Nguyễn Thái An</span>
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#0D1117] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}