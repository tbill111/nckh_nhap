import React from 'react';
import { Users, GitBranch, ShieldAlert, CheckCircle, Loader2 } from 'lucide-react';
import { groupsData } from '../data/mockData';
import { Link } from 'wouter';

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-[#161B22] border border-[#30363D] rounded p-3 flex flex-col justify-between h-24">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#8B949E] font-medium uppercase tracking-wider">Tổng số sinh viên</span>
            <Users size={16} className="text-[#0969DA]" />
          </div>
          <div className="text-3xl font-bold text-[#E6EDF3]">147</div>
        </div>
        
        <div className="bg-[#161B22] border border-[#30363D] rounded p-3 flex flex-col justify-between h-24">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#8B949E] font-medium uppercase tracking-wider">Repo đã nộp</span>
            <GitBranch size={16} className="text-[#2EA44F]" />
          </div>
          <div className="text-3xl font-bold text-[#E6EDF3]">89</div>
        </div>
        
        <div className="bg-[#161B22] border border-[#30363D] rounded p-3 flex flex-col justify-between h-24">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#8B949E] font-medium uppercase tracking-wider">Repo bị gắn cờ</span>
            <ShieldAlert size={16} className="text-[#FD8C73]" />
          </div>
          <div className="text-3xl font-bold text-[#E6EDF3]">12</div>
        </div>
        
        <div className="bg-[#161B22] border border-[#30363D] rounded p-3 flex flex-col justify-between h-24">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#8B949E] font-medium uppercase tracking-wider">Dự án đạt chuẩn</span>
            <CheckCircle size={16} className="text-[#2EA44F]" />
          </div>
          <div className="text-3xl font-bold text-[#E6EDF3]">67</div>
        </div>
      </div>
      
      <div>
        <h2 className="text-sm font-semibold mb-2 text-[#E6EDF3]">Nhóm đồ án — Học kỳ II / 2024-2025</h2>
        <div className="w-full border border-[#30363D] rounded-md overflow-hidden text-xs bg-[#0D1117]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#161B22] text-[#8B949E]">
              <tr>
                <th className="py-2 px-3 font-medium border-b border-[#30363D]">STT</th>
                <th className="py-2 px-3 font-medium border-b border-[#30363D]">Tên nhóm</th>
                <th className="py-2 px-3 font-medium border-b border-[#30363D]">Thành viên</th>
                <th className="py-2 px-3 font-medium border-b border-[#30363D]">Link Git</th>
                <th className="py-2 px-3 font-medium border-b border-[#30363D]">Trạng thái AI</th>
                <th className="py-2 px-3 font-medium border-b border-[#30363D]">Điểm TB</th>
                <th className="py-2 px-3 font-medium border-b border-[#30363D] text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-[#E6EDF3]">
              {groupsData.map((group, idx) => {
                let statusBadge;
                if (group.status === 'Hoàn thành') {
                  statusBadge = (
                    <div className="inline-flex items-center gap-1.5 bg-[#2EA44F]/20 text-[#2EA44F] px-2 py-0.5 rounded-full text-[11px] font-medium">
                      <CheckCircle size={12} />
                      <span>{group.status}</span>
                    </div>
                  );
                } else if (group.status === 'Đang phân tích...') {
                  statusBadge = (
                    <div className="inline-flex items-center gap-1.5 bg-[#0969DA]/20 text-[#0969DA] px-2 py-0.5 rounded-full text-[11px] font-medium">
                      <Loader2 size={12} className="animate-spin" />
                      <span>{group.status}</span>
                    </div>
                  );
                } else {
                  statusBadge = (
                    <div className="inline-flex items-center gap-1.5 bg-[#30363D] text-[#8B949E] px-2 py-0.5 rounded-full text-[11px] font-medium">
                      <span>{group.status}</span>
                    </div>
                  );
                }

                let scoreColor = 'text-[#E6EDF3]';
                if (group.score >= 8.0) scoreColor = 'text-[#2EA44F]';
                else if (group.score < 5.0 && group.score > 0) scoreColor = 'text-[#FD8C73]';
                else if (group.score === 0) scoreColor = 'text-[#8B949E]';

                return (
                  <tr key={group.id} className="hover:bg-[#21262D] border-b border-[#30363D] last:border-0 transition-colors">
                    <td className="py-2 px-3 text-[#8B949E]">{idx + 1}</td>
                    <td className="py-2 px-3 font-medium text-[#E6EDF3]">{group.name}</td>
                    <td className="py-2 px-3 text-[#8B949E]">{group.members}</td>
                    <td className="py-2 px-3">
                      <a href={`https://${group.link}`} target="_blank" rel="noreferrer" className="text-[#0969DA] hover:underline hover:text-[#58A6FF]">{group.link}</a>
                    </td>
                    <td className="py-2 px-3">{statusBadge}</td>
                    <td className={`py-2 px-3 font-bold ${scoreColor}`}>{group.score.toFixed(1)}</td>
                    <td className="py-2 px-3 text-right">
                      <Link href="/danh-gia-ai" className="inline-block text-xs border border-[#30363D] rounded px-2 py-1 hover:bg-[#21262D] text-[#8B949E] transition-colors hover:text-[#E6EDF3]">
                        Xem chi tiết
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-[#161B22] border border-[#FD8C73]/30 rounded-md p-3">
        <div className="flex items-center gap-2 mb-2 text-[#FD8C73]">
          <ShieldAlert size={16} />
          <h3 className="font-semibold text-sm">Cảnh báo gian lận</h3>
        </div>
        <ul className="text-xs space-y-1.5 text-[#E6EDF3]">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FD8C73]"></div>
            <span><span className="font-medium text-[#E6EDF3]">Nhóm 08</span> — điểm 4.1 — Nghi gian lận</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E3B341]"></div>
            <span><span className="font-medium text-[#E6EDF3]">Nhóm 04</span> — điểm 6.3 — Đang xem xét</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0969DA]"></div>
            <span><span className="font-medium text-[#E6EDF3]">Nhóm 02</span> — Đang phân tích</span>
          </li>
        </ul>
      </div>
    </div>
  );
}