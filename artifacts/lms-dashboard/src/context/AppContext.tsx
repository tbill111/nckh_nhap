import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_CLASSES, INITIAL_STUDENTS, INITIAL_ASSIGNMENTS, INITIAL_SUBMISSIONS,
  ClassRoom, Student, Assignment, Submission,
} from '../data/mockData';

interface AppContextType {
  classes: ClassRoom[];
  students: Student[];
  assignments: Assignment[];
  submissions: Submission[];
  addClass: (c: Omit<ClassRoom, 'id' | 'studentCount'>) => void;
  addStudent: (s: Omit<Student, 'id'>) => void;
  addAssignment: (a: Omit<Assignment, 'id' | 'submittedCount' | 'totalGroups'>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [classes, setClasses] = useState<ClassRoom[]>(INITIAL_CLASSES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [submissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);

  const addClass = (data: Omit<ClassRoom, 'id' | 'studentCount'>) => {
    const newClass: ClassRoom = { ...data, id: `c${Date.now()}`, studentCount: 0 };
    setClasses(prev => [...prev, newClass]);
  };

  const addStudent = (data: Omit<Student, 'id'>) => {
    const newStudent: Student = { ...data, id: `SV${String(Date.now()).slice(-3)}` };
    setStudents(prev => [...prev, newStudent]);
    setClasses(prev =>
      prev.map(c => c.id === data.classId ? { ...c, studentCount: c.studentCount + 1 } : c)
    );
  };

  const addAssignment = (data: Omit<Assignment, 'id' | 'submittedCount' | 'totalGroups'>) => {
    const cls = classes.find(c => c.id === data.classId);
    const totalGroups = cls ? Math.ceil(cls.studentCount / 2) : 0;
    const newAssignment: Assignment = { ...data, id: `a${Date.now()}`, submittedCount: 0, totalGroups };
    setAssignments(prev => [...prev, newAssignment]);
  };

  return (
    <AppContext.Provider value={{ classes, students, assignments, submissions, addClass, addStudent, addAssignment }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
