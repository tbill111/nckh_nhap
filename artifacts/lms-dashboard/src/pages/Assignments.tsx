import React, { useState, useEffect } from 'react';
import {
  FolderGit2, Plus, ChevronLeft, ExternalLink, BrainCircuit, FileX, X, Calendar, Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Assignment } from '../data/mockData';
import { PageSkeleton } from '../components/SkeletonLoader';
import { useToast } from '@/hooks/use-toast';

const INPUT_CLS = 'w-full bg-[#0D1117] border border-[#30363D] rounded px-3 py-2 text-sm text-[#E6EDF3] focus:border-[#0969DA] outline-none placeholder:text-[#8B949E]';
const LABEL_CLS = 'text-xs text-[#8B949E] mb-1 block font-medium';

interface CreateAssignmentForm {
  title: string; description: string; classId: string;
  deadline: string; repoTemplate: string;
}

export default function Assignments() {
  const { assignments, submissions, classes, addAssignment } = useApp();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateAssignmentForm>({
    title: '', description: '', classId: '', deadline: '', repoTemplate: '',
  });

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const selectedAssignment = assignments.find(a => a.id === selectedId);
  const filteredSubmissions = submissions.filter(s => s.assignmentId === selectedId);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.classId || !form.deadline) return;
    addAssignment({
      title: form.title, description: form.description,
      classId: form.classId, deadline: form.deadline,
      repoTemplate: form.repoTemplate || undefined, status: 'Đang mở',
    });
    toast({ title: 'Tạo đồ án thành công!', description: `Đồ án "${form.title}" đã được giao cho lớp.` });
    setShowCreateModal(false);
    setForm({ title: '', description: '', classId: '', deadline: '', repoTemplate: '' });
  };

  const handleAnalyzeAI = (groupName: string, submissionId: string) => {
    setAnalyzingId(submissionId);
    toast({ title: 'Đang gửi yêu cầu phân tích AI...', description: `Nhóm: ${groupName}` });
    setTimeout(() => {
      setAnalyzingId(null);
      toast({ title: 'AI đã nhận yêu cầu phân tích.', description: 'Kết quả sẽ có sau vài phút. Vào màn Đánh giá AI để xem.' });
    }, 1500);
  };

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {selectedId && (
            <button onClick={() => setSelectedId(null)}
              className="flex items-center gap-1 text-xs text-[#8B949E] hover:text-[#E6EDF3] transition-colors">
              <ChevronLeft size={16} /> Quay lại
            </button>
          )}
          <h1 className="text-sm font-bold text-[#E6EDF3]">
            {selectedAssignment ? selectedAssignment.title : 'Bài tập & Đồ án'}
          </h1>
          {selectedAssignment && (
            <>
              <span className="text-xs bg-[#0969DA]/20 text-[#0969DA] px-2 py-0.5 rounded-full">
                {classes.find(c => c.id === selectedAssignment.classId)?.name}
              </span>
              <StatusBadge status={selectedAssignment.status} />
            </>
          )}
        </div>
        {!selectedId && (
          <button onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 text-xs bg-[#0969DA] hover:bg-[#0860C4] text-white px-3 py-1.5 rounded transition-colors">
            <Plus size={14} /> Tạo đồ án mới
          </button>
        )}
      </div>

      {/* Deadline info when viewing submissions */}
      {selectedAssignment && (
        <div className="flex items-center gap-4 text-xs text-[#8B949E] shrink-0">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} />
            <span>Hạn nộp: <span className="text-[#E6EDF3] font-medium">{selectedAssignment.deadline}</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={13} />
            <span>Đã nộp: <span className="text-[#E6EDF3] font-medium">{filteredSubmissions.length}</span> / {selectedAssignment.totalGroups} nhóm</span>
          </div>
        </div>
      )}

      {/* Content */}
      {!selectedId ? (
        <AssignmentTable
          assignments={assignments}
          classes={classes}
          onSelect={setSelectedId}
        />
      ) : (
        <SubmissionsTable
          submissions={filteredSubmissions}
          analyzingId={analyzingId}
          onAnalyze={handleAnalyzeAI}
        />
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setShowCreateModal(false)}>
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 w-[520px] max-w-full shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-[#E6EDF3]">Tạo đồ án mới</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-[#8B949E] hover:text-[#E6EDF3]"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreate} className="flex flex-col gap-3">
              <div>
                <label className={LABEL_CLS}>Tên đồ án *</label>
                <input className={INPUT_CLS} placeholder="Đồ án cuối kỳ — Hệ thống LMS" required
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className={LABEL_CLS}>Mô tả</label>
                <textarea className={INPUT_CLS + ' resize-none'} rows={3}
                  placeholder="Mô tả yêu cầu đồ án..."
                  value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL_CLS}>Lớp áp dụng *</label>
                  <select className={INPUT_CLS} required
                    value={form.classId} onChange={e => setForm(f => ({ ...f, classId: e.target.value }))}>
                    <option value="">-- Chọn lớp --</option>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name} — {c.subject}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={LABEL_CLS}>Hạn nộp *</label>
                  <input className={INPUT_CLS} type="date" required
                    value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className={LABEL_CLS}>Link Repo mẫu (tuỳ chọn)</label>
                <input className={INPUT_CLS} placeholder="https://github.com/gv/project-template"
                  value={form.repoTemplate} onChange={e => setForm(f => ({ ...f, repoTemplate: e.target.value }))} />
              </div>
              <div className="flex gap-2 mt-2 justify-end">
                <button type="button" onClick={() => setShowCreateModal(false)}
                  className="text-sm bg-[#21262D] border border-[#30363D] hover:bg-[#30363D] text-[#E6EDF3] px-4 py-2 rounded transition-colors">
                  Hủy
                </button>
                <button type="submit"
                  className="text-sm bg-[#0969DA] hover:bg-[#0860C4] text-white px-4 py-2 rounded transition-colors">
                  Tạo đồ án
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Assignment['status'] }) {
  if (status === 'Đang mở') return (
    <span className="text-[11px] bg-[#2EA44F]/20 text-[#2EA44F] px-2 py-0.5 rounded-full">{status}</span>
  );
  if (status === 'Hết hạn') return (
    <span className="text-[11px] bg-[#FD8C73]/20 text-[#FD8C73] px-2 py-0.5 rounded-full">{status}</span>
  );
  return <span className="text-[11px] bg-[#30363D] text-[#8B949E] px-2 py-0.5 rounded-full">{status}</span>;
}

function AssignmentTable({
  assignments, classes, onSelect
}: {
  assignments: Assignment[];
  classes: ReturnType<typeof useApp>['classes'];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="border border-[#30363D] rounded-md overflow-hidden bg-[#0D1117]">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#161B22] text-[#8B949E]">
          <tr>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">STT</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Tên đồ án</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Lớp</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Hạn nộp</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Đã nộp</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Trạng thái</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D] text-right">Hành động</th>
          </tr>
        </thead>
        <tbody className="text-[#E6EDF3]">
          {assignments.map((a, i) => {
            const cls = classes.find(c => c.id === a.classId);
            const pct = a.totalGroups > 0 ? (a.submittedCount / a.totalGroups) * 100 : 0;
            return (
              <tr key={a.id} onClick={() => onSelect(a.id)}
                className="hover:bg-[#21262D] border-b border-[#30363D] last:border-0 transition-colors cursor-pointer">
                <td className="py-2 px-3 text-[#8B949E]">{i + 1}</td>
                <td className="py-2 px-3 font-medium text-[#E6EDF3]">{a.title}</td>
                <td className="py-2 px-3 text-[#8B949E]">{cls?.name ?? '—'}</td>
                <td className="py-2 px-3 text-[#8B949E]">{a.deadline}</td>
                <td className="py-2 px-3 w-36">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#21262D] rounded h-1">
                      <div className="bg-[#0969DA] h-1 rounded transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[#8B949E] shrink-0 w-10 text-right">{a.submittedCount}/{a.totalGroups}</span>
                  </div>
                </td>
                <td className="py-2 px-3"><StatusBadge status={a.status} /></td>
                <td className="py-2 px-3 text-right" onClick={e => { e.stopPropagation(); onSelect(a.id); }}>
                  <button className="text-xs border border-[#30363D] rounded px-2 py-1 hover:bg-[#21262D] text-[#8B949E] hover:text-[#E6EDF3] transition-colors">
                    Xem nộp bài
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SubmissionsTable({
  submissions, analyzingId, onAnalyze
}: {
  submissions: ReturnType<typeof useApp>['submissions'];
  analyzingId: string | null;
  onAnalyze: (groupName: string, id: string) => void;
}) {
  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-[#30363D] rounded-md">
        <FileX size={32} className="text-[#30363D] mb-3" />
        <p className="text-sm text-[#8B949E]">Chưa có nhóm nào nộp bài cho đồ án này.</p>
      </div>
    );
  }
  return (
    <div className="border border-[#30363D] rounded-md overflow-hidden bg-[#0D1117]">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#161B22] text-[#8B949E]">
          <tr>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">STT</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Tên nhóm</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Thành viên</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Repo URL</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Thời gian nộp</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D] text-right">Hành động</th>
          </tr>
        </thead>
        <tbody className="text-[#E6EDF3]">
          {submissions.map((s, i) => (
            <tr key={s.id} className="hover:bg-[#21262D] border-b border-[#30363D] last:border-0 transition-colors">
              <td className="py-2 px-3 text-[#8B949E]">{i + 1}</td>
              <td className="py-2 px-3 font-medium">{s.groupName}</td>
              <td className="py-2 px-3 text-[#8B949E]">{s.members.join(', ')}</td>
              <td className="py-2 px-3">
                <a href={s.repoUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 text-[#0969DA] hover:underline hover:text-[#58A6FF]"
                  onClick={e => e.stopPropagation()}>
                  <span className="truncate max-w-[180px]">{s.repoUrl.replace('https://', '')}</span>
                  <ExternalLink size={11} className="shrink-0" />
                </a>
              </td>
              <td className="py-2 px-3 text-[#8B949E] font-mono">{s.submittedAt}</td>
              <td className="py-2 px-3 text-right">
                <button
                  disabled={analyzingId === s.id}
                  onClick={() => onAnalyze(s.groupName, s.id)}
                  className="flex items-center gap-1.5 text-[11px] bg-[#0969DA]/20 text-[#0969DA] hover:bg-[#0969DA]/30 disabled:opacity-50 px-2 py-1 rounded transition-colors ml-auto"
                >
                  <BrainCircuit size={12} />
                  {analyzingId === s.id ? 'Đang gửi...' : 'Phân tích AI'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
