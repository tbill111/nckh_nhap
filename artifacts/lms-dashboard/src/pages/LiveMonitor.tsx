import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, AlertTriangle, ShieldX, Terminal, ChevronDown,
  LayoutList, LayoutGrid,
} from 'lucide-react';
import { roomData, MonitorStudent } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

const ROOMS = ['B301', 'B302', 'B303', 'C401'] as const;
type RoomKey = typeof ROOMS[number];
type ViewMode = 'list' | 'grid';

const logPool = [
  { level: 'INFO', msg: 'Submit bài — Progress cập nhật', pc: 'PC-09' },
  { level: 'INFO', msg: 'Auto-save thành công', pc: 'PC-03' },
  { level: 'INFO', msg: 'Kết nối agent ổn định', pc: 'PC-13' },
  { level: 'WARN', msg: 'Phát hiện chuyển tab sang ChatGPT lần 3', pc: 'PC-02' },
  { level: 'WARN', msg: 'Chuyển tab — window.focus lost', pc: 'PC-06' },
  { level: 'WARN', msg: 'Màn hình bị che khuất bởi cửa sổ khác', pc: 'PC-10' },
  { level: 'WARN', msg: 'Tốc độ gõ bất thường — 450 WPM', pc: 'PC-14' },
  { level: 'WARN', msg: 'Chuyển tab lần 4 — cảnh báo cuối', pc: 'PC-17' },
  { level: 'ERROR', msg: 'Phát hiện clipboard paste từ nguồn ngoài — 247 ký tự', pc: 'PC-04' },
  { level: 'ERROR', msg: 'Phát hiện truy cập GitHub Copilot', pc: 'PC-07' },
  { level: 'ERROR', msg: 'Kết nối VPN phát hiện — địa chỉ 10.0.0.1', pc: 'PC-07' },
];

interface LogEntry { time: string; level: string; pc: string; msg: string; }

export default function LiveMonitor() {
  const { toast } = useToast();
  const [selectedRoom, setSelectedRoom] = useState<RoomKey>('B301');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [timeLeft, setTimeLeft] = useState(6300);
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: '14:00:00', level: 'INFO', pc: 'SYSTEM', msg: 'Bắt đầu phiên giám sát phòng máy B301' },
    { time: '14:02:15', level: 'INFO', pc: 'PC-01', msg: 'Đăng nhập thành công' },
    { time: '14:05:22', level: 'INFO', pc: 'PC-03', msg: 'Bắt đầu làm bài' },
    { time: '14:10:45', level: 'WARN', pc: 'PC-02', msg: 'Chuyển tab lần 1' },
    { time: '14:15:30', level: 'INFO', pc: 'PC-12', msg: 'Auto-save thành công' },
    { time: '14:20:10', level: 'ERROR', pc: 'PC-07', msg: 'Mất kết nối mạng' },
    { time: '14:21:05', level: 'INFO', pc: 'PC-07', msg: 'Kết nối lại thành công' },
    { time: '14:25:40', level: 'WARN', pc: 'PC-10', msg: 'Tốc độ gõ > 300 WPM' },
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const students = roomData[selectedRoom] ?? [];
  const warningCount = students.filter(s => s.status === 'Cảnh báo chuyển Tab').length;
  const fraudCount = students.filter(s => s.status === 'Sử dụng AI trái phép').length;

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(p => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const r = logPool[Math.floor(Math.random() * logPool.length)];
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      setLogs(prev => [...prev, { time, level: r.level, pc: r.pc, msg: r.msg }]);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleRoomChange = (room: RoomKey) => {
    setSelectedRoom(room);
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setLogs(prev => [...prev, { time, level: 'INFO', pc: 'SYSTEM', msg: `Chuyển sang giám sát phòng ${room}` }]);
    toast({ title: `Đã chuyển sang phòng ${room}`, description: `Đang giám sát ${(roomData[room] ?? []).length} sinh viên.` });
  };

  const fmt = (s: number) =>
    `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="flex flex-col h-full overflow-hidden gap-3">
      {/* ── Header ── */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold text-[#E6EDF3] flex items-center gap-2">
            Giám sát trực tiếp — Phòng máy
            <span className="bg-[#FD8C73] animate-pulse text-white px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">
              Live
            </span>
          </h1>

          {/* Room Selector */}
          <div className="relative flex items-center">
            <select
              value={selectedRoom}
              onChange={e => handleRoomChange(e.target.value as RoomKey)}
              className="appearance-none bg-[#161B22] border border-[#30363D] rounded px-3 py-1.5 text-sm text-[#E6EDF3] focus:border-[#0969DA] outline-none pr-8 cursor-pointer hover:border-[#8B949E] transition-colors"
            >
              {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2 text-[#8B949E] pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-[#161B22] border border-[#30363D] rounded overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              title="Chế độ danh sách"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#0969DA] text-white'
                  : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'
              }`}
            >
              <LayoutList size={14} />
              <span className="hidden sm:inline">Danh sách</span>
            </button>
            <div className="w-px h-5 bg-[#30363D]" />
            <button
              onClick={() => setViewMode('grid')}
              title="Chế độ sơ đồ phòng"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#0969DA] text-white'
                  : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'
              }`}
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Sơ đồ</span>
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex gap-4 text-sm font-semibold bg-[#161B22] border border-[#30363D] px-4 py-2 rounded-md">
          <div className="text-[#E6EDF3]">Đang thi: {students.length}</div>
          <div className="w-px bg-[#30363D]" />
          <div className="text-[#E3B341]">Cảnh báo: {warningCount}</div>
          <div className="w-px bg-[#30363D]" />
          <div className="text-[#FD8C73]">Gian lận: {fraudCount}</div>
          <div className="w-px bg-[#30363D]" />
          <div className="text-[#0969DA] font-mono w-20 text-center">{fmt(timeLeft)}</div>
        </div>
      </div>

      <p className="text-[#8B949E] text-xs shrink-0">
        Buổi thi: Lập trình Web — 17/07/2025 | Phòng {selectedRoom}
      </p>

      {/* ── Main content area (list or grid) ── */}
      <div className="flex-1 min-h-0 border border-[#30363D] rounded-md overflow-hidden bg-[#0D1117] flex flex-col">
        {viewMode === 'list' ? (
          <ListView students={students} />
        ) : (
          <GridView students={students} />
        )}
      </div>

      {/* ── Terminal ── */}
      <div className="h-44 shrink-0 flex flex-col border border-[#30363D] rounded-md overflow-hidden bg-[#010409]">
        <div className="bg-[#161B22] border-b border-[#30363D] px-3 py-1.5 flex items-center gap-2 shrink-0">
          <Terminal size={13} className="text-[#8B949E]" />
          <span className="text-[11px] text-[#8B949E] font-medium uppercase tracking-wider">
            WebSocket Agent Log — Thời gian thực · {selectedRoom}
          </span>
        </div>
        <div className="p-2 overflow-y-auto flex-1 font-mono text-[11px] space-y-0.5 custom-scrollbar">
          {logs.map((log, i) => {
            const col =
              log.level === 'INFO'
                ? 'text-[#2EA44F]'
                : log.level === 'WARN'
                ? 'text-[#E3B341]'
                : 'text-[#FD8C73]';
            return (
              <div key={i} className="flex gap-2">
                <span className="text-[#8B949E] opacity-60 shrink-0">[{log.time}]</span>
                <span className={`${col} w-12 shrink-0`}>[{log.level}]</span>
                <span className="text-[#0969DA] shrink-0 w-14">{log.pc}:</span>
                <span className="text-[#E6EDF3] opacity-90">{log.msg}</span>
              </div>
            );
          })}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}

// ── List View ──────────────────────────────────────────────────────────────────
function ListView({ students }: { students: MonitorStudent[] }) {
  return (
    <div className="overflow-y-auto flex-1 custom-scrollbar">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#161B22] text-[#8B949E] sticky top-0 z-10 shadow-[0_1px_0_#30363D]">
          <tr>
            <th className="py-2 px-3 font-medium">STT</th>
            <th className="py-2 px-3 font-medium">Mã SV</th>
            <th className="py-2 px-3 font-medium">Họ tên</th>
            <th className="py-2 px-3 font-medium">Máy số</th>
            <th className="py-2 px-3 font-medium">Tiến độ</th>
            <th className="py-2 px-3 font-medium">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="text-[#E6EDF3]">
          {students.map((s, idx) => {
            const isFraud = s.status === 'Sử dụng AI trái phép';
            const isWarn = s.status === 'Cảnh báo chuyển Tab';
            const rowCls = `border-b border-[#30363D] transition-colors ${
              isFraud ? 'bg-[#FD8C73]/5 hover:bg-[#FD8C73]/10' : 'hover:bg-[#21262D]'
            }`;
            const progressColor =
              s.progress < 30 ? '#FD8C73' : s.progress <= 60 ? '#E3B341' : '#2EA44F';
            return (
              <tr key={s.id} className={rowCls}>
                <td className="py-2 px-3 text-[#8B949E]">{idx + 1}</td>
                <td className="py-2 px-3 font-mono text-[#8B949E]">{s.id}</td>
                <td className="py-2 px-3 font-medium">{s.name}</td>
                <td className="py-2 px-3 font-mono text-[#0969DA]">{s.pc}</td>
                <td className="py-2 px-3 w-32">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-[#161B22] rounded-full h-1.5 border border-[#30363D]">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{ width: `${s.progress}%`, backgroundColor: progressColor }}
                      />
                    </div>
                    <span className="text-[10px] text-[#8B949E] w-7">{s.progress}%</span>
                  </div>
                </td>
                <td className="py-2 px-3">
                  {isFraud && (
                    <span className="inline-flex items-center gap-1.5 bg-[#FD8C73]/20 text-[#FD8C73] px-2 py-0.5 rounded text-[11px] font-medium">
                      <ShieldX size={12} />{s.status}
                    </span>
                  )}
                  {isWarn && (
                    <span className="inline-flex items-center gap-1.5 bg-[#E3B341]/20 text-[#E3B341] px-2 py-0.5 rounded text-[11px] font-medium">
                      <AlertTriangle size={12} />{s.status}
                    </span>
                  )}
                  {!isFraud && !isWarn && (
                    <span className="flex items-center gap-1.5 text-[#8B949E]">
                      <ShieldCheck size={13} />{s.status}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Grid View (Device Map) ─────────────────────────────────────────────────────
function GridView({ students }: { students: MonitorStudent[] }) {
  return (
    <div className="overflow-y-auto flex-1 custom-scrollbar p-4">
      {/* Legend */}
      <div className="flex items-center gap-5 mb-4 text-[11px] text-[#8B949E]">
        <span className="font-semibold text-[#8B949E] uppercase tracking-wider">Chú thích:</span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-[#30363D] inline-block bg-[#0D1117]" />
          Bình thường
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-[#E3B341] inline-block bg-[#E3B341]/10" />
          Cảnh báo
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-[#FD8C73] inline-block bg-[#FD8C73]/15" />
          Gian lận AI
        </span>
      </div>

      <div className="grid grid-cols-4 xl:grid-cols-5 gap-3">
        {students.map(s => <PCCard key={s.id} student={s} />)}
      </div>
    </div>
  );
}

function PCCard({ student: s }: { student: MonitorStudent }) {
  const isFraud = s.status === 'Sử dụng AI trái phép';
  const isWarn = s.status === 'Cảnh báo chuyển Tab';

  const progressColor =
    s.progress < 30 ? '#FD8C73' : s.progress <= 60 ? '#E3B341' : '#2EA44F';

  // Card appearance based on status
  const cardCls = isFraud
    ? 'bg-[#FD8C73]/10 border-[#FD8C73] shadow-[0_0_12px_rgba(253,140,115,0.25)]'
    : isWarn
    ? 'bg-[#E3B341]/8 border-[#E3B341] animate-pulse shadow-[0_0_10px_rgba(227,179,65,0.15)]'
    : 'bg-[#0D1117] border-[#30363D] hover:border-[#8B949E]';

  // Abbreviate the name: first word + last word initial
  const nameParts = s.name.trim().split(' ');
  const shortName =
    nameParts.length >= 3
      ? `${nameParts[nameParts.length - 1]} ${nameParts[nameParts.length - 2][0]}.`
      : s.name;

  return (
    <div
      className={`relative border rounded-md p-2.5 flex flex-col gap-1.5 cursor-default select-none transition-all duration-300 group ${cardCls}`}
    >
      {/* PC label + status icon */}
      <div className="flex items-center justify-between">
        <span className="font-mono font-bold text-xs text-[#0969DA]">{s.pc}</span>
        {isFraud && <ShieldX size={12} className="text-[#FD8C73] shrink-0" />}
        {isWarn && <AlertTriangle size={12} className="text-[#E3B341] shrink-0" />}
        {!isFraud && !isWarn && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#2EA44F] shrink-0" />
        )}
      </div>

      {/* Student name */}
      <div className="text-center py-1.5 flex-1 flex items-center justify-center min-h-[28px]">
        <span
          className={`text-[11px] font-medium leading-tight text-center ${
            isFraud ? 'text-[#FD8C73]' : isWarn ? 'text-[#E3B341]' : 'text-[#C9D1D9]'
          }`}
        >
          {shortName}
        </span>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-[#8B949E] uppercase tracking-wider">Tiến độ</span>
          <span
            className="text-[10px] font-bold font-mono"
            style={{ color: progressColor }}
          >
            {s.progress}%
          </span>
        </div>
        <div className="w-full bg-[#161B22] rounded-full h-1 border border-[#21262D]">
          <div
            className="h-1 rounded-full transition-all duration-500"
            style={{ width: `${s.progress}%`, backgroundColor: progressColor }}
          />
        </div>
      </div>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div className="bg-[#21262D] border border-[#30363D] rounded px-2.5 py-1.5 text-[11px] whitespace-nowrap shadow-lg">
          <div className="font-medium text-[#E6EDF3]">{s.name}</div>
          <div className="text-[#8B949E] mt-0.5">{s.id} · {s.pc}</div>
          <div
            className="mt-0.5 font-medium"
            style={{ color: isFraud ? '#FD8C73' : isWarn ? '#E3B341' : '#8B949E' }}
          >
            {s.status}
          </div>
        </div>
        {/* Arrow */}
        <div className="w-2 h-2 bg-[#21262D] border-r border-b border-[#30363D] rotate-45 mx-auto -mt-1" />
      </div>
    </div>
  );
}
