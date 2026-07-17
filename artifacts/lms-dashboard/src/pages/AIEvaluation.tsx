import React from 'react';
import { CheckCircle, Edit, ExternalLink, ChevronRight, Info, AlertTriangle, Check } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'Giang Thanh Tùng', value: 68, fill: '#0969DA' },
  { name: 'Nguyễn Anh Minh', value: 32, fill: '#2EA44F' },
];

const barData = [
  { name: 'Tuần 1', Giang: 12, Minh: 5 },
  { name: 'Tuần 2', Giang: 8, Minh: 9 },
  { name: 'Tuần 3', Giang: 15, Minh: 7 },
  { name: 'Tuần 4', Giang: 6, Minh: 4 },
  { name: 'Tuần 5', Giang: 20, Minh: 8 },
  { name: 'Tuần 6', Giang: 11, Minh: 6 },
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
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center text-[11px] text-[#8B949E] uppercase tracking-wider font-semibold mb-2">
          <span>Tổng quan</span>
          <ChevronRight size={12} className="mx-1" />
          <span>Đánh giá AI</span>
          <ChevronRight size={12} className="mx-1" />
          <span className="text-[#E6EDF3]">Nhóm 01</span>
        </div>
        
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-[#E6EDF3]">Nhóm 01 — LMS System</h1>
          <div className="inline-flex items-center gap-1.5 bg-[#2EA44F]/20 text-[#2EA44F] px-2.5 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={14} />
            <span>Hoàn thành</span>
          </div>
          <a href="#" className="flex items-center gap-1 text-[#0969DA] hover:underline text-sm ml-2">
            github.com/group01/lms
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
      
      <div className="flex-1 flex gap-0 border border-[#30363D] rounded-md overflow-hidden bg-[#0D1117]">
        {/* Left Column */}
        <div className="w-1/2 flex flex-col p-4 border-r border-[#30363D] overflow-y-auto custom-scrollbar">
          <h2 className="text-sm font-semibold text-[#E6EDF3] mb-4">Phân bổ đóng góp</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-[#E6EDF3]">Giang Thanh Tùng</span>
                <span className="text-[#0969DA] font-bold">68%</span>
              </div>
              <div className="w-full bg-[#161B22] rounded-full h-1.5">
                <div className="bg-[#0969DA] h-1.5 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-[#E6EDF3]">Nguyễn Anh Minh</span>
                <span className="text-[#2EA44F] font-bold">32%</span>
              </div>
              <div className="w-full bg-[#161B22] rounded-full h-1.5">
                <div className="bg-[#2EA44F] h-1.5 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex mb-6 h-40">
            <div className="w-1/2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', color: '#E6EDF3', fontSize: '12px' }}
                    itemStyle={{ color: '#E6EDF3' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 flex items-center">
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8B949E' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#8B949E' }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', color: '#E6EDF3', fontSize: '12px' }}
                    cursor={{ fill: '#21262D' }}
                  />
                  <Bar dataKey="Giang" fill="#0969DA" radius={[2, 2, 0, 0]} barSize={8} />
                  <Bar dataKey="Minh" fill="#2EA44F" radius={[2, 2, 0, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <h3 className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider mb-3">Timeline Commit</h3>
          <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 max-h-64 space-y-3">
            {timelineData.map((item, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <div className="font-mono text-[#8B949E] shrink-0 w-32">{item.time}</div>
                <div className="font-mono font-bold shrink-0 w-16" style={{ color: item.color }}>{item.hash}</div>
                <div className="flex-1 text-[#E6EDF3]">
                  <span className="font-medium mr-2" style={{ color: item.color }}>{item.author}</span>
                  <span className="text-[#8B949E]">{item.msg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-1/2 flex flex-col p-4 bg-[#0D1117] overflow-y-auto custom-scrollbar">
          <h2 className="text-sm font-semibold text-[#E6EDF3] mb-4">Phân tích AI (Explainable AI)</h2>
          
          <div className="bg-[#161B22] border border-[#30363D] rounded-md p-4 font-mono text-xs leading-relaxed mb-6 space-y-2">
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
            <div className="flex items-start gap-2 text-[#E6EDF3] mt-4 pt-2 border-t border-[#30363D]">
              <Info size={14} className="text-[#2EA44F] mt-0.5 shrink-0" />
              <div><span className="text-[#2EA44F] mr-2 font-bold">Điểm AI tự động:</span>8.5/10 — đề xuất phê duyệt</div>
            </div>
          </div>
          
          <div className="flex items-baseline gap-3 mb-6">
            <div className="text-4xl font-bold text-[#E6EDF3]">8.5 <span className="text-xl text-[#8B949E] font-normal">/ 10</span></div>
            <div className="text-xs text-[#8B949E] uppercase tracking-wider font-semibold">Điểm AI tự động</div>
          </div>
          
          <h2 className="text-sm font-semibold text-[#E6EDF3] mb-3 mt-2">Câu hỏi vấn đáp sinh ra từ AI</h2>
          <div className="space-y-3 mb-8 flex-1">
            {[
              { level: 'CƠ BẢN', text: 'JWT token hoạt động như thế nào trong hệ thống này?', color: 'bg-[#2EA44F]/20 text-[#2EA44F] border-[#2EA44F]/30' },
              { level: 'CƠ BẢN', text: 'Giải thích cơ chế CORS đã được cấu hình trong project.', color: 'bg-[#2EA44F]/20 text-[#2EA44F] border-[#2EA44F]/30' },
              { level: 'NÂNG CAO', text: 'Middleware phân quyền role-based được thiết kế như thế nào?', color: 'bg-[#0969DA]/20 text-[#0969DA] border-[#0969DA]/30' },
              { level: 'NÂNG CAO', text: 'Tại sao bạn tách service layer ra khỏi controller?', color: 'bg-[#0969DA]/20 text-[#0969DA] border-[#0969DA]/30' },
              { level: 'PHẢN BIỆN', text: 'Nếu Cloudinary không khả dụng, hệ thống xử lý thế nào?', color: 'bg-[#FD8C73]/20 text-[#FD8C73] border-[#FD8C73]/30' },
            ].map((q, i) => (
              <div key={i} className="flex gap-3 text-sm items-start">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 mt-0.5 ${q.color}`}>{q.level}</span>
                <span className="text-[#E6EDF3]">{i + 1}. {q.text}</span>
              </div>
            ))}
          </div>
          
          <div className="flex gap-3 mt-auto pt-4 border-t border-[#30363D]">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#21262D] border border-[#30363D] hover:bg-[#30363D] text-[#E6EDF3] py-2 rounded-md font-medium text-sm transition-colors cursor-pointer">
              <Edit size={16} />
              Ghi đè điểm
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#2EA44F] hover:bg-[#238636] text-white py-2 rounded-md font-medium text-sm transition-colors cursor-pointer">
              <CheckCircle size={16} />
              Phê duyệt & Lưu ZIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}