import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, AlertTriangle, ShieldX, Terminal } from 'lucide-react';
import { liveMonitorData } from '../data/mockData';

const logPool = [
  { level: 'INFO', msg: "Submit bài — Progress: 85%", pc: 'PC-09' },
  { level: 'INFO', msg: "Auto-save — Progress: 90%", pc: 'PC-03' },
  { level: 'INFO', msg: "Submit bài — Progress: 95%", pc: 'PC-13' },
  { level: 'WARN', msg: "Phát hiện chuyển tab sang ChatGPT lần 3", pc: 'PC-02' },
  { level: 'WARN', msg: "Chuyển tab — window.focus lost lần 2", pc: 'PC-06' },
  { level: 'WARN', msg: "Màn hình bị che khuất bởi cửa sổ khác", pc: 'PC-10' },
  { level: 'WARN', msg: "Tốc độ gõ bất thường — 450 WPM", pc: 'PC-14' },
  { level: 'WARN', msg: "Chuyển tab lần 4 — cảnh báo cuối", pc: 'PC-17' },
  { level: 'ERROR', msg: "Phát hiện clipboard paste từ nguồn ngoài — 247 ký tự", pc: 'PC-04' },
  { level: 'ERROR', msg: "Phát hiện truy cập GitHub Copilot", pc: 'PC-07' },
  { level: 'ERROR', msg: "Kết nối VPN phát hiện — địa chỉ 10.0.0.1", pc: 'PC-07' },
];

export default function LiveMonitor() {
  const [timeLeft, setTimeLeft] = useState(6300); // 1h45m
  const [logs, setLogs] = useState([
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setLogs(prev => [...prev, { time: timeStr, level: randomLog.level, pc: randomLog.pc, msg: randomLog.msg }]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-end mb-4 shrink-0">
        <div>
          <h1 className="text-lg font-bold text-[#E6EDF3] flex items-center gap-2">
            Giám sát trực tiếp — Phòng máy B301
            <span className="bg-[#FD8C73] animate-pulse text-white px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">Live</span>
          </h1>
          <p className="text-[#8B949E] text-xs mt-1">Buổi thi: Lập trình Web — 17/07/2025</p>
        </div>
        
        <div className="flex gap-4 text-sm font-semibold bg-[#161B22] border border-[#30363D] px-4 py-2 rounded-md">
          <div className="text-[#E6EDF3]">Đang thi: 28</div>
          <div className="w-px bg-[#30363D]"></div>
          <div className="text-[#E3B341]">Cảnh báo: 5</div>
          <div className="w-px bg-[#30363D]"></div>
          <div className="text-[#FD8C73]">Gian lận: 2</div>
          <div className="w-px bg-[#30363D]"></div>
          <div className="text-[#0969DA] font-mono w-20 text-center">{formatTime(timeLeft)}</div>
        </div>
      </div>

      <div className="flex-1 border border-[#30363D] rounded-md overflow-hidden bg-[#0D1117] flex flex-col min-h-0 mb-4">
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
              {liveMonitorData.map((student, idx) => {
                let statusNode;
                let rowClass = "hover:bg-[#21262D] border-b border-[#30363D] transition-colors";
                
                if (student.status === 'Bình thường') {
                  statusNode = (
                    <div className="flex items-center gap-1.5 text-[#8B949E]">
                      <ShieldCheck size={14} />
                      <span>{student.status}</span>
                    </div>
                  );
                } else if (student.status === 'Cảnh báo chuyển Tab') {
                  statusNode = (
                    <div className="inline-flex items-center gap-1.5 bg-[#E3B341]/20 text-[#E3B341] px-2 py-0.5 rounded text-[11px] font-medium">
                      <AlertTriangle size={12} />
                      <span>{student.status}</span>
                    </div>
                  );
                } else {
                  statusNode = (
                    <div className="inline-flex items-center gap-1.5 bg-[#FD8C73]/20 text-[#FD8C73] px-2 py-0.5 rounded text-[11px] font-medium">
                      <ShieldX size={12} />
                      <span>{student.status}</span>
                    </div>
                  );
                  rowClass += " bg-[#FD8C73]/5";
                }

                let progressColor = '#2EA44F';
                if (student.progress < 30) progressColor = '#FD8C73';
                else if (student.progress <= 60) progressColor = '#E3B341';

                return (
                  <tr key={student.id} className={rowClass}>
                    <td className="py-2 px-3 text-[#8B949E]">{idx + 1}</td>
                    <td className="py-2 px-3 font-mono text-[#8B949E]">{student.id}</td>
                    <td className="py-2 px-3 font-medium">{student.name}</td>
                    <td className="py-2 px-3 font-mono text-[#0969DA]">{student.pc}</td>
                    <td className="py-2 px-3 w-32">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-[#161B22] rounded-full h-1.5 border border-[#30363D]">
                          <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${student.progress}%`, backgroundColor: progressColor }}></div>
                        </div>
                        <span className="text-[10px] text-[#8B949E] w-6">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">{statusNode}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Terminal Logs */}
      <div className="h-48 shrink-0 flex flex-col border border-[#30363D] rounded-md overflow-hidden bg-[#010409]">
        <div className="bg-[#161B22] border-b border-[#30363D] px-3 py-1.5 flex items-center gap-2 shrink-0">
          <Terminal size={14} className="text-[#8B949E]" />
          <span className="text-[11px] text-[#8B949E] font-medium uppercase tracking-wider">WebSocket Agent Log — Thời gian thực</span>
        </div>
        <div className="p-2 overflow-y-auto flex-1 font-mono text-[11px] space-y-1 custom-scrollbar">
          {logs.map((log, i) => {
            let colorClass = "text-[#8B949E]";
            if (log.level === 'INFO') colorClass = "text-[#2EA44F]";
            if (log.level === 'WARN') colorClass = "text-[#E3B341]";
            if (log.level === 'ERROR') colorClass = "text-[#FD8C73]";

            return (
              <div key={i} className="flex gap-2">
                <span className="text-[#8B949E] opacity-70 shrink-0">[{log.time}]</span>
                <span className={`${colorClass} w-10 shrink-0`}>[{log.level}]</span>
                <span className="text-[#0969DA] shrink-0 w-12">{log.pc}:</span>
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