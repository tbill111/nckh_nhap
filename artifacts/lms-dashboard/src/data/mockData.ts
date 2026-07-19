// ─── Types ───────────────────────────────────────────────────────────────────
export interface ClassRoom {
  id: string; name: string; subject: string; semester: string;
  year: string; studentCount: number; schedule: string; room: string;
}
export interface Student {
  id: string; name: string; email: string; classId: string; groupId?: number;
}
export interface Assignment {
  id: string; title: string; description: string; classId: string;
  deadline: string; repoTemplate?: string;
  status: 'Đang mở' | 'Hết hạn' | 'Chưa bắt đầu';
  submittedCount: number; totalGroups: number;
}
export interface Submission {
  id: string; assignmentId: string; groupId: number; groupName: string;
  members: string[]; repoUrl: string; submittedAt: string;
}
export interface MonitorStudent {
  id: string; name: string; pc: string; progress: number; status: string;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────
export const INITIAL_CLASSES: ClassRoom[] = [
  { id: 'c1', name: '65HTTT1', subject: 'Lập trình Web', semester: 'II', year: '2024-2025', studentCount: 38, schedule: 'Thứ 2, 4 | 7h30 - 9h30', room: 'B301' },
  { id: 'c2', name: '65HTTT2', subject: 'Lập trình Web', semester: 'II', year: '2024-2025', studentCount: 36, schedule: 'Thứ 3, 5 | 9h30 - 11h30', room: 'B302' },
  { id: 'c3', name: '65CNTT1', subject: 'Cơ sở dữ liệu nâng cao', semester: 'II', year: '2024-2025', studentCount: 40, schedule: 'Thứ 4, 6 | 13h - 15h', room: 'B401' },
  { id: 'c4', name: '65KTPM1', subject: 'Kiến trúc phần mềm', semester: 'II', year: '2024-2025', studentCount: 35, schedule: 'Thứ 6 | 15h - 18h', room: 'B201' },
];

export const INITIAL_STUDENTS: Student[] = [
  { id: 'SV001', name: 'Giang Thanh Tùng', email: 'tung.gt@edu.vn', classId: 'c1', groupId: 1 },
  { id: 'SV002', name: 'Nguyễn Anh Minh', email: 'minh.na@edu.vn', classId: 'c1', groupId: 1 },
  { id: 'SV003', name: 'Trương Thảo Anh', email: 'anh.tt@edu.vn', classId: 'c1', groupId: 2 },
  { id: 'SV004', name: 'Đặng Thị Thu Hương', email: 'huong.dtt@edu.vn', classId: 'c1', groupId: 2 },
  { id: 'SV005', name: 'Lê Văn Phúc', email: 'phuc.lv@edu.vn', classId: 'c1', groupId: 3 },
  { id: 'SV006', name: 'Ngô Thị Lan', email: 'lan.nt@edu.vn', classId: 'c1', groupId: 3 },
  { id: 'SV007', name: 'Phạm Minh Đức', email: 'duc.pm@edu.vn', classId: 'c1', groupId: 4 },
  { id: 'SV008', name: 'Vũ Thị Hoa', email: 'hoa.vt@edu.vn', classId: 'c1', groupId: 4 },
  { id: 'SV009', name: 'Đinh Quốc Hùng', email: 'hung.dq@edu.vn', classId: 'c2', groupId: 5 },
  { id: 'SV010', name: 'Cao Thị Mai', email: 'mai.ct@edu.vn', classId: 'c2', groupId: 5 },
  { id: 'SV011', name: 'Bùi Văn Nam', email: 'nam.bv@edu.vn', classId: 'c2', groupId: 6 },
  { id: 'SV012', name: 'Trần Thị Ngọc', email: 'ngoc.tt@edu.vn', classId: 'c2', groupId: 6 },
  { id: 'SV013', name: 'Hoàng Đức Long', email: 'long.hd@edu.vn', classId: 'c2', groupId: 7 },
  { id: 'SV014', name: 'Lý Thị Bảo', email: 'bao.lt@edu.vn', classId: 'c2', groupId: 7 },
  { id: 'SV015', name: 'Nguyễn Tuấn Kiệt', email: 'kiet.nt@edu.vn', classId: 'c3', groupId: 8 },
  { id: 'SV016', name: 'Phan Thị Yến', email: 'yen.pt@edu.vn', classId: 'c3', groupId: 8 },
  { id: 'SV017', name: 'Đỗ Quang Vinh', email: 'vinh.dq@edu.vn', classId: 'c3' },
  { id: 'SV018', name: 'Lưu Thị Phương', email: 'phuong.lt@edu.vn', classId: 'c3' },
  { id: 'SV019', name: 'Tống Minh Khoa', email: 'khoa.tm@edu.vn', classId: 'c4' },
  { id: 'SV020', name: 'Hà Thị Diệu', email: 'dieu.ht@edu.vn', classId: 'c4' },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  { id: 'a1', title: 'Đồ án cuối kỳ — Hệ thống LMS', description: 'Xây dựng hệ thống quản lý học tập tích hợp AI với đầy đủ chức năng CRUD, xác thực JWT và phân quyền theo vai trò.', classId: 'c1', deadline: '2025-07-20', repoTemplate: 'github.com/gv-nta/lms-template', status: 'Đang mở', submittedCount: 6, totalGroups: 8 },
  { id: 'a2', title: 'Đồ án cuối kỳ — Ứng dụng thi trực tuyến', description: 'Phát triển nền tảng thi trực tuyến có tích hợp chống gian lận, hỗ trợ đa dạng câu hỏi và thống kê kết quả tự động.', classId: 'c2', deadline: '2025-07-25', status: 'Đang mở', submittedCount: 3, totalGroups: 6 },
  { id: 'a3', title: 'Bài tập lớn — Tối ưu truy vấn SQL', description: 'Phân tích và tối ưu hóa hiệu suất truy vấn cho cơ sở dữ liệu quy mô lớn, viết báo cáo so sánh trước/sau tối ưu.', classId: 'c3', deadline: '2025-07-10', status: 'Hết hạn', submittedCount: 8, totalGroups: 8 },
  { id: 'a4', title: 'Đồ án — Thiết kế microservices', description: 'Thiết kế và triển khai kiến trúc microservices cho một hệ thống thương mại điện tử, bao gồm API Gateway và service discovery.', classId: 'c4', deadline: '2025-08-01', status: 'Đang mở', submittedCount: 2, totalGroups: 5 },
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  { id: 's1', assignmentId: 'a1', groupId: 1, groupName: 'Nhóm 01 — LMS System', members: ['Giang Thanh Tùng', 'Nguyễn Anh Minh'], repoUrl: 'https://github.com/group01/lms', submittedAt: '2025-07-15 14:32' },
  { id: 's2', assignmentId: 'a1', groupId: 2, groupName: 'Nhóm 02 — Online Exam', members: ['Trương Thảo Anh', 'Đặng Thị Thu Hương'], repoUrl: 'https://github.com/group02/exam', submittedAt: '2025-07-16 09:20' },
  { id: 's3', assignmentId: 'a1', groupId: 3, groupName: 'Nhóm 03 — Quản lý KTX', members: ['Lê Văn Phúc', 'Ngô Thị Lan'], repoUrl: 'https://github.com/group03/ktx', submittedAt: '2025-07-14 22:10' },
  { id: 's4', assignmentId: 'a1', groupId: 4, groupName: 'Nhóm 04 — Chatbot CSKH', members: ['Phạm Minh Đức', 'Vũ Thị Hoa'], repoUrl: 'https://github.com/group04/chatbot', submittedAt: '2025-07-15 18:45' },
  { id: 's5', assignmentId: 'a1', groupId: 6, groupName: 'Nhóm 06 — IoT Dashboard', members: ['Bùi Văn Nam', 'Trần Thị Ngọc'], repoUrl: 'https://github.com/group06/iot', submittedAt: '2025-07-13 11:00' },
  { id: 's6', assignmentId: 'a1', groupId: 8, groupName: 'Nhóm 08 — Food Delivery', members: ['Nguyễn Tuấn Kiệt', 'Phan Thị Yến'], repoUrl: 'https://github.com/group08/food', submittedAt: '2025-07-16 23:59' },
  { id: 's7', assignmentId: 'a2', groupId: 9, groupName: 'Nhóm 09 — Quiz Platform', members: ['Đinh Quốc Hùng', 'Cao Thị Mai'], repoUrl: 'https://github.com/group09/quiz', submittedAt: '2025-07-20 15:30' },
  { id: 's8', assignmentId: 'a3', groupId: 10, groupName: 'Nhóm 10 — DB Optimizer', members: ['Hoàng Đức Long', 'Lý Thị Bảo'], repoUrl: 'https://github.com/group10/db-opt', submittedAt: '2025-07-09 21:00' },
];

// ─── Legacy data (kept for Dashboard & AI Evaluation) ─────────────────────────
export const groupsData = [
  { id: 1, name: 'Nhóm 01 — LMS System', members: 'Giang Thanh Tùng, Nguyễn Anh Minh', link: 'github.com/group01/lms', status: 'Hoàn thành', score: 8.5 },
  { id: 2, name: 'Nhóm 02 — Online Exam', members: 'Trương Thảo Anh, Đặng Thị Thu Hương', link: 'github.com/group02/exam', status: 'Đang phân tích...', score: 7.2 },
  { id: 3, name: 'Nhóm 03 — Quản lý KTX', members: 'Lê Văn Phúc, Ngô Thị Lan', link: 'github.com/group03/ktx', status: 'Hoàn thành', score: 9.1 },
  { id: 4, name: 'Nhóm 04 — Chatbot CSKH', members: 'Phạm Minh Đức, Vũ Thị Hoa', link: 'github.com/group04/chatbot', status: 'Hoàn thành', score: 6.3 },
  { id: 5, name: 'Nhóm 05 — E-Commerce', members: 'Đinh Quốc Hùng, Cao Thị Mai', link: 'github.com/group05/shop', status: 'Chưa nộp', score: 0 },
  { id: 6, name: 'Nhóm 06 — IoT Dashboard', members: 'Bùi Văn Nam, Trần Thị Ngọc', link: 'github.com/group06/iot', status: 'Hoàn thành', score: 8.8 },
  { id: 7, name: 'Nhóm 07 — HR System', members: 'Hoàng Đức Long, Lý Thị Bảo', link: 'github.com/group07/hr', status: 'Đang phân tích...', score: 7.5 },
  { id: 8, name: 'Nhóm 08 — Food Delivery', members: 'Nguyễn Tuấn Kiệt, Phan Thị Yến', link: 'github.com/group08/food', status: 'Hoàn thành', score: 4.1 },
];

// ─── Room monitor data ────────────────────────────────────────────────────────
export const roomData: Record<string, MonitorStudent[]> = {
  'B301': [
    { id: 'SV001', name: 'Giang Thanh Tùng', pc: 'PC-01', progress: 75, status: 'Bình thường' },
    { id: 'SV002', name: 'Nguyễn Anh Minh', pc: 'PC-02', progress: 60, status: 'Cảnh báo chuyển Tab' },
    { id: 'SV003', name: 'Trương Thảo Anh', pc: 'PC-03', progress: 90, status: 'Bình thường' },
    { id: 'SV004', name: 'Đặng Thị Thu Hương', pc: 'PC-04', progress: 45, status: 'Sử dụng AI trái phép' },
    { id: 'SV005', name: 'Lê Văn Phúc', pc: 'PC-05', progress: 55, status: 'Bình thường' },
    { id: 'SV006', name: 'Ngô Thị Lan', pc: 'PC-06', progress: 80, status: 'Cảnh báo chuyển Tab' },
    { id: 'SV007', name: 'Phạm Minh Đức', pc: 'PC-07', progress: 30, status: 'Sử dụng AI trái phép' },
    { id: 'SV008', name: 'Vũ Thị Hoa', pc: 'PC-08', progress: 70, status: 'Bình thường' },
    { id: 'SV009', name: 'Đinh Quốc Hùng', pc: 'PC-09', progress: 85, status: 'Bình thường' },
    { id: 'SV010', name: 'Cao Thị Mai', pc: 'PC-10', progress: 40, status: 'Cảnh báo chuyển Tab' },
    { id: 'SV011', name: 'Bùi Văn Nam', pc: 'PC-11', progress: 65, status: 'Bình thường' },
    { id: 'SV012', name: 'Trần Thị Ngọc', pc: 'PC-12', progress: 50, status: 'Bình thường' },
    { id: 'SV013', name: 'Hoàng Đức Long', pc: 'PC-13', progress: 95, status: 'Bình thường' },
    { id: 'SV014', name: 'Lý Thị Bảo', pc: 'PC-14', progress: 25, status: 'Cảnh báo chuyển Tab' },
    { id: 'SV015', name: 'Nguyễn Tuấn Kiệt', pc: 'PC-15', progress: 70, status: 'Bình thường' },
    { id: 'SV016', name: 'Phan Thị Yến', pc: 'PC-16', progress: 88, status: 'Bình thường' },
    { id: 'SV017', name: 'Đỗ Quang Vinh', pc: 'PC-17', progress: 35, status: 'Cảnh báo chuyển Tab' },
    { id: 'SV018', name: 'Lưu Thị Phương', pc: 'PC-18', progress: 72, status: 'Bình thường' },
    { id: 'SV019', name: 'Tống Minh Khoa', pc: 'PC-19', progress: 58, status: 'Bình thường' },
    { id: 'SV020', name: 'Hà Thị Diệu', pc: 'PC-20', progress: 92, status: 'Bình thường' },
  ],
  'B302': [
    { id: 'SV021', name: 'Võ Thị Hạnh', pc: 'PC-01', progress: 82, status: 'Bình thường' },
    { id: 'SV022', name: 'Dương Minh Tuấn', pc: 'PC-02', progress: 67, status: 'Cảnh báo chuyển Tab' },
    { id: 'SV023', name: 'Lâm Thị Kim Anh', pc: 'PC-03', progress: 91, status: 'Bình thường' },
    { id: 'SV024', name: 'Trịnh Công Sơn', pc: 'PC-04', progress: 28, status: 'Sử dụng AI trái phép' },
    { id: 'SV025', name: 'Nguyễn Thị Lan Anh', pc: 'PC-05', progress: 74, status: 'Bình thường' },
    { id: 'SV026', name: 'Phan Văn Minh', pc: 'PC-06', progress: 53, status: 'Bình thường' },
    { id: 'SV027', name: 'Đinh Thị Thảo', pc: 'PC-07', progress: 44, status: 'Cảnh báo chuyển Tab' },
    { id: 'SV028', name: 'Hồ Quang Dũng', pc: 'PC-08', progress: 86, status: 'Bình thường' },
    { id: 'SV029', name: 'Bùi Thị Phương Thảo', pc: 'PC-09', progress: 61, status: 'Bình thường' },
    { id: 'SV030', name: 'Trần Hữu Nghĩa', pc: 'PC-10', progress: 77, status: 'Bình thường' },
  ],
  'B303': [
    { id: 'SV031', name: 'Lưu Văn Hải', pc: 'PC-01', progress: 88, status: 'Bình thường' },
    { id: 'SV032', name: 'Ngô Minh Châu', pc: 'PC-02', progress: 72, status: 'Bình thường' },
    { id: 'SV033', name: 'Hoàng Thị Tuyết', pc: 'PC-03', progress: 95, status: 'Bình thường' },
    { id: 'SV034', name: 'Phùng Văn Đại', pc: 'PC-04', progress: 38, status: 'Cảnh báo chuyển Tab' },
    { id: 'SV035', name: 'Vũ Thị Thanh Hương', pc: 'PC-05', progress: 80, status: 'Bình thường' },
    { id: 'SV036', name: 'Đỗ Minh Trí', pc: 'PC-06', progress: 63, status: 'Bình thường' },
    { id: 'SV037', name: 'Cao Thị Ngân', pc: 'PC-07', progress: 54, status: 'Bình thường' },
    { id: 'SV038', name: 'Trương Văn Khải', pc: 'PC-08', progress: 97, status: 'Bình thường' },
  ],
  'C401': [
    { id: 'SV041', name: 'Phạm Thị Quỳnh', pc: 'PC-01', progress: 68, status: 'Bình thường' },
    { id: 'SV042', name: 'Nguyễn Văn Thắng', pc: 'PC-02', progress: 42, status: 'Cảnh báo chuyển Tab' },
    { id: 'SV043', name: 'Lê Thị Kim Ngân', pc: 'PC-03', progress: 79, status: 'Bình thường' },
    { id: 'SV044', name: 'Trần Đình Quân', pc: 'PC-04', progress: 22, status: 'Sử dụng AI trái phép' },
    { id: 'SV045', name: 'Bùi Minh Hằng', pc: 'PC-05', progress: 85, status: 'Bình thường' },
    { id: 'SV046', name: 'Đinh Văn Long', pc: 'PC-06', progress: 57, status: 'Bình thường' },
    { id: 'SV047', name: 'Vũ Thị Thanh', pc: 'PC-07', progress: 91, status: 'Bình thường' },
    { id: 'SV048', name: 'Hoàng Văn Phong', pc: 'PC-08', progress: 33, status: 'Cảnh báo chuyển Tab' },
    { id: 'SV049', name: 'Ngô Thị Bích', pc: 'PC-09', progress: 74, status: 'Bình thường' },
    { id: 'SV050', name: 'Phan Văn Tài', pc: 'PC-10', progress: 88, status: 'Bình thường' },
    { id: 'SV051', name: 'Lâm Thị Duyên', pc: 'PC-11', progress: 46, status: 'Bình thường' },
    { id: 'SV052', name: 'Trịnh Văn Hùng', pc: 'PC-12', progress: 69, status: 'Bình thường' },
  ],
};

// kept for backward compat
export const liveMonitorData = roomData['B301'];
