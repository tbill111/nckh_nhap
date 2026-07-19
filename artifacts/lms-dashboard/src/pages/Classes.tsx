import React, { useState, useEffect } from 'react';
import {
  Users, Plus, ChevronLeft, Calendar, MapPin, UserPlus, BookOpen, X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClassRoom } from '../data/mockData';
import { PageSkeleton } from '../components/SkeletonLoader';
import { useToast } from '@/hooks/use-toast';

interface CreateClassForm {
  name: string; subject: string; semester: string;
  year: string; schedule: string; room: string;
}
interface AddStudentForm {
  id: string; name: string; email: string; groupId: string;
}

const INPUT_CLS = 'w-full bg-[#0D1117] border border-[#30363D] rounded px-3 py-2 text-sm text-[#E6EDF3] focus:border-[#0969DA] outline-none placeholder:text-[#8B949E]';
const LABEL_CLS = 'text-xs text-[#8B949E] mb-1 block font-medium';

export default function Classes() {
  const { classes, students, addClass, addStudent } = useApp();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  const [createForm, setCreateForm] = useState<CreateClassForm>({
    name: '', subject: '', semester: 'II', year: '2024-2025', schedule: '', room: '',
  });
  const [addStudentForm, setAddStudentForm] = useState<AddStudentForm>({
    id: '', name: '', email: '', groupId: '',
  });

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const selectedClass = classes.find(c => c.id === selectedClassId);
  const classStudents = students.filter(s => s.classId === selectedClassId);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.name || !createForm.subject) return;
    addClass(createForm);
    toast({ title: 'Tạo lớp thành công!', description: `Lớp ${createForm.name} đã được thêm vào danh sách.` });
    setShowCreateModal(false);
    setCreateForm({ name: '', subject: '', semester: 'II', year: '2024-2025', schedule: '', room: '' });
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addStudentForm.id || !addStudentForm.name || !selectedClassId) return;
    addStudent({
      id: addStudentForm.id,
      name: addStudentForm.name,
      email: addStudentForm.email,
      classId: selectedClassId,
      groupId: addStudentForm.groupId ? parseInt(addStudentForm.groupId) : undefined,
    });
    toast({ title: 'Thêm sinh viên thành công!', description: `${addStudentForm.name} đã được thêm vào ${selectedClass?.name}.` });
    setShowAddStudentModal(false);
    setAddStudentForm({ id: '', name: '', email: '', groupId: '' });
  };

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {selectedClassId && (
            <button
              onClick={() => setSelectedClassId(null)}
              className="flex items-center gap-1 text-xs text-[#8B949E] hover:text-[#E6EDF3] transition-colors"
            >
              <ChevronLeft size={16} /> Quay lại
            </button>
          )}
          <h1 className="text-sm font-bold text-[#E6EDF3]">
            {selectedClass ? `${selectedClass.name} — ${selectedClass.subject}` : 'Quản lý Lớp học'}
          </h1>
          {selectedClass && (
            <span className="text-xs bg-[#0969DA]/20 text-[#0969DA] px-2 py-0.5 rounded-full">
              {classStudents.length} sinh viên
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {selectedClassId && (
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="flex items-center gap-1.5 text-xs bg-[#21262D] border border-[#30363D] hover:bg-[#30363D] text-[#E6EDF3] px-3 py-1.5 rounded transition-colors"
            >
              <UserPlus size={14} /> Thêm sinh viên
            </button>
          )}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 text-xs bg-[#0969DA] hover:bg-[#0860C4] text-white px-3 py-1.5 rounded transition-colors"
          >
            <Plus size={14} /> Tạo lớp học mới
          </button>
        </div>
      </div>

      {/* Content */}
      {!selectedClassId ? (
        <div className="grid grid-cols-2 gap-3">
          {classes.map(cls => (
            <ClassCard key={cls.id} cls={cls} onClick={() => setSelectedClassId(cls.id)} />
          ))}
        </div>
      ) : (
        <StudentTable students={classStudents} />
      )}

      {/* Create Class Modal */}
      {showCreateModal && (
        <Modal title="Tạo lớp học mới" onClose={() => setShowCreateModal(false)}>
          <form onSubmit={handleCreateClass} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLS}>Tên lớp *</label>
                <input className={INPUT_CLS} placeholder="65HTTT1" required
                  value={createForm.name} onChange={e => setCreateForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className={LABEL_CLS}>Môn học *</label>
                <input className={INPUT_CLS} placeholder="Lập trình Web" required
                  value={createForm.subject} onChange={e => setCreateForm(f => ({ ...f, subject: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLS}>Học kỳ</label>
                <select className={INPUT_CLS} value={createForm.semester}
                  onChange={e => setCreateForm(f => ({ ...f, semester: e.target.value }))}>
                  <option value="I">Học kỳ I</option>
                  <option value="II">Học kỳ II</option>
                  <option value="Hè">Học kỳ Hè</option>
                </select>
              </div>
              <div>
                <label className={LABEL_CLS}>Năm học</label>
                <input className={INPUT_CLS} placeholder="2024-2025"
                  value={createForm.year} onChange={e => setCreateForm(f => ({ ...f, year: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLS}>Lịch học</label>
                <input className={INPUT_CLS} placeholder="Thứ 2, 4 | 7h30 - 9h30"
                  value={createForm.schedule} onChange={e => setCreateForm(f => ({ ...f, schedule: e.target.value }))} />
              </div>
              <div>
                <label className={LABEL_CLS}>Phòng học</label>
                <input className={INPUT_CLS} placeholder="B301"
                  value={createForm.room} onChange={e => setCreateForm(f => ({ ...f, room: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-2 mt-2 justify-end">
              <button type="button" onClick={() => setShowCreateModal(false)}
                className="text-sm bg-[#21262D] border border-[#30363D] hover:bg-[#30363D] text-[#E6EDF3] px-4 py-2 rounded transition-colors">
                Hủy
              </button>
              <button type="submit"
                className="text-sm bg-[#0969DA] hover:bg-[#0860C4] text-white px-4 py-2 rounded transition-colors">
                Tạo lớp
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <Modal title={`Thêm sinh viên vào ${selectedClass?.name}`} onClose={() => setShowAddStudentModal(false)}>
          <form onSubmit={handleAddStudent} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLS}>Mã SV *</label>
                <input className={INPUT_CLS} placeholder="SV099" required
                  value={addStudentForm.id} onChange={e => setAddStudentForm(f => ({ ...f, id: e.target.value }))} />
              </div>
              <div>
                <label className={LABEL_CLS}>Họ tên *</label>
                <input className={INPUT_CLS} placeholder="Nguyễn Văn A" required
                  value={addStudentForm.name} onChange={e => setAddStudentForm(f => ({ ...f, name: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLS}>Email</label>
                <input className={INPUT_CLS} placeholder="sv@edu.vn" type="email"
                  value={addStudentForm.email} onChange={e => setAddStudentForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className={LABEL_CLS}>Nhóm dự án (tuỳ chọn)</label>
                <input className={INPUT_CLS} placeholder="1" type="number"
                  value={addStudentForm.groupId} onChange={e => setAddStudentForm(f => ({ ...f, groupId: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-2 mt-2 justify-end">
              <button type="button" onClick={() => setShowAddStudentModal(false)}
                className="text-sm bg-[#21262D] border border-[#30363D] hover:bg-[#30363D] text-[#E6EDF3] px-4 py-2 rounded transition-colors">
                Hủy
              </button>
              <button type="submit"
                className="text-sm bg-[#0969DA] hover:bg-[#0860C4] text-white px-4 py-2 rounded transition-colors">
                Thêm sinh viên
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function ClassCard({ cls, onClick }: { cls: ClassRoom; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#161B22] border border-[#30363D] rounded-md p-4 cursor-pointer hover:border-[#0969DA] transition-colors group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-bold text-[#E6EDF3] group-hover:text-[#58A6FF] transition-colors">{cls.name}</div>
          <div className="text-[11px] text-[#8B949E] mt-0.5">Học kỳ {cls.semester} / {cls.year}</div>
        </div>
        <span className="text-[11px] bg-[#0969DA]/20 text-[#0969DA] px-2 py-0.5 rounded-full shrink-0 ml-2">
          {cls.subject}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 text-xs text-[#8B949E]">
        <div className="flex items-center gap-2">
          <Users size={12} className="shrink-0" />
          <span>{cls.studentCount} sinh viên</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={12} className="shrink-0" />
          <span>{cls.schedule}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={12} className="shrink-0" />
          <span>Phòng {cls.room}</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-[#30363D] flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-[#8B949E]">
          <BookOpen size={11} />
          <span>Nhấn để xem danh sách sinh viên</span>
        </div>
        <ChevronLeft size={14} className="text-[#30363D] rotate-180" />
      </div>
    </div>
  );
}

function StudentTable({ students }: { students: ReturnType<typeof useApp>['students'] }) {
  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-[#30363D] rounded-md">
        <Users size={32} className="text-[#30363D] mb-3" />
        <p className="text-sm text-[#8B949E]">Chưa có sinh viên nào trong lớp này.</p>
        <p className="text-xs text-[#30363D] mt-1">Nhấn "Thêm sinh viên" để bắt đầu.</p>
      </div>
    );
  }
  return (
    <div className="border border-[#30363D] rounded-md overflow-hidden bg-[#0D1117]">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#161B22] text-[#8B949E]">
          <tr>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">STT</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Mã SV</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Họ tên</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Email</th>
            <th className="py-2 px-3 font-medium border-b border-[#30363D]">Nhóm dự án</th>
          </tr>
        </thead>
        <tbody className="text-[#E6EDF3]">
          {students.map((s, i) => (
            <tr key={s.id} className="hover:bg-[#21262D] border-b border-[#30363D] last:border-0 transition-colors">
              <td className="py-2 px-3 text-[#8B949E]">{i + 1}</td>
              <td className="py-2 px-3 font-mono text-[#8B949E]">{s.id}</td>
              <td className="py-2 px-3 font-medium">{s.name}</td>
              <td className="py-2 px-3 text-[#8B949E]">{s.email || '—'}</td>
              <td className="py-2 px-3">
                {s.groupId
                  ? <span className="bg-[#0969DA]/20 text-[#0969DA] px-2 py-0.5 rounded-full text-[11px]">Nhóm {String(s.groupId).padStart(2, '0')}</span>
                  : <span className="text-[#30363D]">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 w-[480px] max-w-full shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-[#E6EDF3]">{title}</h2>
          <button onClick={onClose} className="text-[#8B949E] hover:text-[#E6EDF3] transition-colors"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
