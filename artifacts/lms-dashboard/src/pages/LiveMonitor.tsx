import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, AlertTriangle, ShieldX, Terminal, ChevronDown,
  LayoutList, LayoutGrid, Monitor, XCircle,
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

// ── Grid View (Command Center — Monitor Icon Map) ──────────────────────────────
function GridView({ students }: { students: MonitorStudent[] }) {
  return (
    <div className="overflow-y-auto flex-1 custom-scrollbar px-5 py-4">
      {/* Legend */}
      <div className="flex items-center gap-6 mb-5 text-[11px] text-[#8B949E]">
        <span className="font-semibold uppercase tracking-widest">Chú thích:</span>
        <span className="flex items-center gap-2">
          <Monitor size={13} color="#2EA44F" />
          Bình thường
        </span>
        <span className="flex items-center gap-2">
          <Monitor size={13} color="#EAB308" />
          Cảnh báo chuyển Tab
        </span>
        <span className="flex items-center gap-2">
          <Monitor size={13} color="#FD8C73" />
          Sử dụng AI trái phép
        </span>
      </div>

      <div className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-6">
        {students.map(s => <PCCard key={s.id} student={s} />)}
      </div>
    </div>
  );
}

function PCCard({ student: s }: { student: MonitorStudent }) {
  const isFraud = s.status === 'Sử dụng AI trái phép';
  const isWarn  = s.status === 'Cảnh báo chuyển Tab';

  // Monitor stroke colour & glow
  const iconColor  = isFraud ? '#FD8C73' : isWarn ? '#EAB308' : '#2EA44F';
  const glowStyle  = isFraud
    ? { filter: 'drop-shadow(0 0 10px rgba(253,140,115,0.9))' }
    : isWarn
    ? { filter: 'drop-shadow(0 0 10px rgba(234,179,8,0.8))' }
    : {};
  const pulseClass = isWarn ? 'animate-pulse' : '';

  // Progress bar colour
  const progressColor =
    s.progress < 30 ? '#FD8C73' : s.progress <= 60 ? '#E3B341' : '#2EA44F';

  // Short name: last-name + first-name initial  (VD: "Tùng G.")
  const parts = s.name.trim().split(' ');
  const shortName =
    parts.length >= 2
      ? `${parts[parts.length - 1]} ${parts[0][0]}.`
      : s.name;

  return (
    <div className="relative flex flex-col items-center gap-1.5 cursor-default select-none group">

      {/* ── Badge (top-right of icon zone) ── */}
      {(isFraud || isWarn) && (
        <div className="absolute top-0 right-0 z-10 translate-x-1 -translate-y-1">
          {isFraud
            ? <XCircle size={14} className="text-[#FD8C73] drop-shadow-[0_0_6px_rgba(253,140,115,0.9)]" />
            : <AlertTriangle size={13} className="text-[#EAB308] drop-shadow-[0_0_6px_rgba(234,179,8,0.8)]" />
          }
        </div>
      )}

      {/* ── Monitor icon zone ── */}
      <div className={`relative ${pulseClass}`} style={glowStyle}>
        <Monitor size={56} color={iconColor} strokeWidth={1.4} />

        {/* PC code overlaid on the screen face of the icon */}
        <span
          className="absolute inset-0 flex items-center justify-center font-mono font-bold text-[10px] tracking-tight pb-3"
          style={{ color: iconColor }}
        >
          {s.pc}
        </span>
      </div>

      {/* ── Student name ── */}
      <span
        className="text-[11px] font-medium text-center leading-tight max-w-[80px] truncate"
        style={{ color: isFraud ? '#FD8C73' : isWarn ? '#EAB308' : '#C9D1D9' }}
      >
        {shortName}
      </span>

      {/* ── Mini progress bar ── */}
      <div className="w-full max-w-[72px]">
        <div className="w-full bg-[#161B22] rounded-full h-[3px]">
          <div
            className="h-[3px] rounded-full transition-all duration-500"
            style={{ width: `${s.progress}%`, backgroundColor: progressColor }}
          />
        </div>
        <span
          className="block text-center text-[9px] font-mono mt-0.5"
          style={{ color: progressColor }}
        >
          {s.progress}%
        </span>
      </div>

      {/* ── Hover tooltip ── */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
        <div className="bg-[#21262D] border border-[#30363D] rounded px-3 py-2 text-[11px] shadow-xl">
          <div className="font-semibold text-[#E6EDF3]">{s.name}</div>
          <div className="text-[#8B949E] mt-0.5">{s.id} · {s.pc}</div>
          <div className="mt-0.5 font-medium" style={{ color: iconColor }}>{s.status}</div>
        </div>
        <div className="w-2 h-2 bg-[#21262D] border-r border-b border-[#30363D] rotate-45 mx-auto -mt-1" />
      </div>
    </div>
  );
}
