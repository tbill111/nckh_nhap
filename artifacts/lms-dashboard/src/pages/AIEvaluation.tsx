import React, { useState } from 'react';
import {
  CheckCircle, Edit, ExternalLink, ChevronRight, Info, AlertTriangle, Check,
  ChevronLeft, Loader2, Save
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { groupsData } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

const pieData = [
  { name: 'Giang Thanh Tùng', value: 68, fill: '#0969DA' },
  { name: 'Nguyễn Anh Minh', value: 32, fill: '#2EA44F' },
];

const barData = [
  { name: 'T1', Giang: 12, Minh: 5 },
  { name: 'T2', Giang: 8, Minh: 9 },
  { name: 'T3', Giang: 15, Minh: 7 },
  { name: 'T4', Giang: 6, Minh: 4 },
  { name: 'T5', Giang: 20, Minh: 8 },
  { name: 'T6', Giang: 11, Minh: 6 },
];

const timelineData = [
  { time: '2025-06-28 14:32', author: 'Giang Thanh Tùng', msg: 'feat: Hoàn thiện module đăng nhập JWT', hash: 'a1b2c3d', color: '#0969DA' },
  { time: '2025-06-27 09:15', author: 'Nguyễn Anh Minh', msg: 'fix: Sửa lỗi CORS trên endpoint /api/users', hash: 'e4f5g6h', color: '#2EA44F' },
  { time: '2025-06-26 22:41', author: 'Giang Thanh Tùng', msg: 'feat: Thêm middleware phân quyền role-based', hash: 'i7j8k9l', color: '#0969DA' },
  { time: '2025-06-25 16:08', author: 'Nguyễn Anh Minh', msg: 'docs: Cập nhật README và hướng dẫn deploy', hash: 'm0n1o2p', color: '#2EA44F' },
  { time: '2025-06-24 11:30', author: 'Giang Thanh Tùng', msg: 'feat: Tích hợp Cloudinary upload avatar', hash: 'q3r4s5t', color: '#0969DA' },
  { time: '2025-06-23 20:15', author: 'Giang Thanh Tùng', msg: 'refactor: Tách service layer khỏi controller', hash: 'u6v7w8x', color: '#0969DA' },
  { time: '2025-06-22 15:00', author: 'Nguyễn Anh Minh', msg: 'test: Thêm unit test cho UserService', hash: 'y9z0a1b', color: '#2EA44F' },
  { time: '2025-06-21 10:45', author: 'Giang Thanh Tùng', msg: 'init: Khởi tạo project với Express TypeScript', hash: 'c2d3e4f', color: '#0969DA' },
];

export default function AIEvaluation() {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const { toast } = useToast();
  const [isEditingScore, setIsEditingScore] = useState(false);
  const [newScore, setNewScore] = useState('8.5');

  const selectedGroup = groupsData.find(g => g.id === selectedGroupId);

  if (!selectedGroupId || !selectedGroup) {
    return <GroupList onSelect={setSelectedGroupId} />;
  }

  const handleOverrideScore = () => {
    if (!isEditingScore) {
      setIsEditingScore(true);
    } else {
      const score = parseFloat(newScore);
      if (!isNaN(score) && score >= 0 && score <= 10) {
        setIsEditingScore(false);
        toast({ title: 'Điểm đã được cập nhật!', description: `Điểm mới của ${selectedGroup.name}: ${score.toFixed(1)}/10` });
      }
    }
  };

  const handleApprove = () => {
    toast({ title: 'Đang tạo file ZIP...', description: 'Vui lòng chờ trong giây lát.' });
    setTimeout(() => {
      toast({ title: 'Phê duyệt thành công!', description: 'File ZIP đã được tạo và lưu vào hệ thống.' });
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 shrink-0">
        <div className="flex items-center text-[11px] text-[#8B949E] uppercase tracking-wider font-semibold mb-2">
          <button onClick={() => setSelectedGroupId(null)} className="flex items-center gap-1 hover:text-[#E6EDF3] transition-colors">
            <ChevronLeft size={12} /> Đánh giá AI
          </button>
          <ChevronRight size={12} className="mx-1" />
          <span className="text-[#E6EDF3]">{selectedGroup.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-[#E6EDF3]">{selectedGroup.name}</h1>
          <div className="inline-flex items-center gap-1.5 bg-[#2EA44F]/20 text-[#2EA44F] px-2.5 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={14} /><span>{selectedGroup.status}</span>
          </div>
          <a href={`https://${selectedGroup.link}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-1 text-[#0969DA] hover:underline text-sm ml-2">
            {selectedGroup.link}<ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="flex-1 flex gap-0 border border-[#30363D] rounded-md overflow-hidden bg-[#0D1117] min-h-0">
        {/* Left */}
        <div className="w-1/2 flex flex-col p-4 border-r border-[#30363D] overflow-y-auto custom-scrollbar">
          <h2 className="text-sm font-semibold text-[#E6EDF3] mb-4">Phân bổ đóng góp</h2>
          <div className="space-y-3 mb-5">
            {[{ name: 'Giang Thanh Tùng', pct: 68, color: '#0969DA' }, { name: 'Nguyễn Anh Minh', pct: 32, color: '#2EA44F' }].map(m => (
              <div key={m.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-[#E6EDF3]">{m.name}</span>
                  <span className="font-bold" style={{ color: m.color }}>{m.pct}%</span>
                </div>
                <div className="w-full bg-[#161B22] rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex mb-5 h-40">
            <div className="w-1/2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={68} paddingAngle={2} dataKey="value" stroke="none">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', color: '#E6EDF3', fontSize: '12px' }} itemStyle={{ color: '#E6EDF3' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={barData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8B949E' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#8B949E' }} axisLine={false} tickLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', color: '#E6EDF3', fontSize: '12px' }} cursor={{ fill: '#21262D' }} />
                  <Bar dataKey="Giang" fill="#0969DA" radius={[2, 2, 0, 0]} barSize={7} />
                  <Bar dataKey="Minh" fill="#2EA44F" radius={[2, 2, 0, 0]} barSize={7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h3 className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider mb-3">Timeline Commit</h3>
          <div className="overflow-y-auto pr-1 custom-scrollbar flex-1 space-y-2.5">
            {timelineData.map((item, i) => (
              <div key={i} className="flex gap-2 text-xs">
                <div className="font-mono text-[#8B949E] shrink-0 w-32 text-[11px]">{item.time}</div>
                <div className="font-mono font-bold shrink-0 w-14 text-[11px]" style={{ color: item.color }}>{item.hash}</div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium mr-1.5 text-[11px]" style={{ color: item.color }}>{item.author}</span>
                  <span className="text-[#8B949E] text-[11px]">{item.msg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="w-1/2 flex flex-col p-4 bg-[#0D1117] overflow-y-auto custom-scrollbar">
          <h2 className="text-sm font-semibold text-[#E6EDF3] mb-3">Phân tích AI (Explainable AI)</h2>
          <div className="bg-[#161B22] border border-[#30363D] rounded-md p-4 font-mono text-xs leading-relaxed mb-4 space-y-2">
            <div className="flex items-start gap-2 text-[#E6EDF3]">
              <Check size={14} className="text-[#2EA44F] mt-0.5 shrink-0" />
              <div><span className="text-[#8B949E] mr-2">Tỷ lệ đóng góp:</span>Giang Thanh Tùng chiếm 68% commit, tập trung vào backend</div>
            </div>
            <div className="flex items-start gap-2 text-[#E6EDF3]">
              <Check size={14} className="text-[#2EA44F] mt-0.5 shrink-0" />
              <div><span className="text-[#8B949E] mr-2">Chất lượng code:</span>Commit message rõ ràng, theo convention feat/fix/docs</div>
            </div>
            <div className="flex items-start gap-2 text-[#E6EDF3]">
              <Check size={14} className="text-[#2EA44F] mt-0.5 shrink-0" />
              <div><span className="text-[#8B949E] mr-2">Độc lập làm việc:</span>Không phát hiện copy-paste từ nguồn ngoài</div>
            </div>
            <div className="flex items-start gap-2 text-[#E6EDF3]">
              <AlertTriangle size={14} className="text-[#E3B341] mt-0.5 shrink-0" />
              <div><span className="text-[#E3B341] mr-2">Cảnh báo:</span>Nguyễn Anh Minh có 4 commit trong 2 tuần cuối, thấp hơn trung bình</div>
            </div>
            <div className="flex items-start gap-2 text-[#E6EDF3] mt-3 pt-2 border-t border-[#30363D]">
              <Info size={14} className="text-[#2EA44F] mt-0.5 shrink-0" />
              <div><span className="text-[#2EA44F] mr-2 font-bold">Điểm AI tự động:</span>8.5/10 — đề xuất phê duyệt</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-5">
            {isEditingScore ? (
              <div className="flex items-center gap-2">
                <input
                  type="number" min="0" max="10" step="0.1"
                  value={newScore} onChange={e => setNewScore(e.target.value)}
                  className="w-20 bg-[#0D1117] border border-[#0969DA] rounded px-2 py-1 text-xl font-bold text-[#E6EDF3] outline-none"
                />
                <span className="text-xl text-[#8B949E] font-normal">/ 10</span>
              </div>
            ) : (
              <div className="text-4xl font-bold text-[#E6EDF3]">{newScore} <span className="text-xl text-[#8B949E] font-normal">/ 10</span></div>
            )}
            <div className="text-xs text-[#8B949E] uppercase tracking-wider font-semibold">Điểm AI tự động</div>
          </div>

          <h2 className="text-sm font-semibold text-[#E6EDF3] mb-3">Câu hỏi vấn đáp sinh ra từ AI</h2>
          <div className="space-y-2.5 mb-6 flex-1">
            {[
              { level: 'CƠ BẢN', text: 'JWT token hoạt động như thế nào trong hệ thống này?', color: 'bg-[#2EA44F]/20 text-[#2EA44F] border-[#2EA44F]/30' },
              { level: 'CƠ BẢN', text: 'Giải thích cơ chế CORS đã được cấu hình trong project.', color: 'bg-[#2EA44F]/20 text-[#2EA44F] border-[#2EA44F]/30' },
              { level: 'NÂNG CAO', text: 'Middleware phân quyền role-based được thiết kế như thế nào?', color: 'bg-[#0969DA]/20 text-[#0969DA] border-[#0969DA]/30' },
              { level: 'NÂNG CAO', text: 'Tại sao bạn tách service layer ra khỏi controller?', color: 'bg-[#0969DA]/20 text-[#0969DA] border-[#0969DA]/30' },
              { level: 'PHẢN BIỆN', text: 'Nếu Cloudinary không khả dụng, hệ thống xử lý thế nào?', color: 'bg-[#FD8C73]/20 text-[#FD8C73] border-[#FD8C73]/30' },
            ].map((q, i) => (
              <div key={i} className="flex gap-2.5 text-sm items-start">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 mt-0.5 ${q.color}`}>{q.level}</span>
                <span className="text-[#E6EDF3] text-xs">{i + 1}. {q.text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-auto pt-4 border-t border-[#30363D] shrink-0">
            <button onClick={handleOverrideScore}
              className="flex-1 flex items-center justify-center gap-2 bg-[#21262D] border border-[#30363D] hover:bg-[#30363D] text-[#E6EDF3] py-2 rounded-md font-medium text-sm transition-colors cursor-pointer">
              {isEditingScore ? <><Save size={15} />Lưu điểm</> : <><Edit size={15} />Ghi đè điểm</>}
            </button>
            <button onClick={handleApprove}
              className="flex-1 flex items-center justify-center gap-2 bg-[#2EA44F] hover:bg-[#238636] text-white py-2 rounded-md font-medium text-sm transition-colors cursor-pointer">
              <CheckCircle size={15} />Phê duyệt & Lưu ZIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GroupList({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div className="flex flex-col h-full gap-4">
      <h1 className="text-sm font-bold text-[#E6EDF3] shrink-0">Đánh giá AI — Danh sách nhóm</h1>
      <div className="border border-[#30363D] rounded-md overflow-hidden bg-[#0D1117]">
        <table className="w-full text-left text-xs border-collapse">
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
              const isComplete = group.status === 'Hoàn thành';
              const isAnalyzing = group.status === 'Đang phân tích...';
              const scoreColor = group.score >= 8 ? 'text-[#2EA44F]' : group.score < 5 && group.score > 0 ? 'text-[#FD8C73]' : group.score === 0 ? 'text-[#8B949E]' : 'text-[#E6EDF3]';
              return (
                <tr key={group.id} className="hover:bg-[#21262D] border-b border-[#30363D] last:border-0 transition-colors">
                  <td className="py-2 px-3 text-[#8B949E]">{idx + 1}</td>
                  <td className="py-2 px-3 font-medium">{group.name}</td>
                  <td className="py-2 px-3 text-[#8B949E]">{group.members}</td>
                  <td className="py-2 px-3">
                    <a href={`https://${group.link}`} target="_blank" rel="noreferrer" className="text-[#0969DA] hover:underline">{group.link}</a>
                  </td>
                  <td className="py-2 px-3">
                    {isComplete && <span className="inline-flex items-center gap-1.5 bg-[#2EA44F]/20 text-[#2EA44F] px-2 py-0.5 rounded-full text-[11px]"><CheckCircle size={11} />{group.status}</span>}
                    {isAnalyzing && <span className="inline-flex items-center gap-1.5 bg-[#0969DA]/20 text-[#0969DA] px-2 py-0.5 rounded-full text-[11px]"><Loader2 size={11} className="animate-spin" />{group.status}</span>}
                    {!isComplete && !isAnalyzing && <span className="inline-flex items-center gap-1.5 bg-[#30363D] text-[#8B949E] px-2 py-0.5 rounded-full text-[11px]">{group.status}</span>}
                  </td>
                  <td className={`py-2 px-3 font-bold ${scoreColor}`}>{group.score.toFixed(1)}</td>
                  <td className="py-2 px-3 text-right">
                    <button onClick={() => onSelect(group.id)}
                      className="text-xs border border-[#30363D] rounded px-2 py-1 hover:bg-[#21262D] text-[#8B949E] hover:text-[#E6EDF3] transition-colors">
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
