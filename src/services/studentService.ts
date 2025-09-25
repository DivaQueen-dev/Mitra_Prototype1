export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  semester: number;
  age: number;
  gender: string;
  screeningScores: {
    phq9: number; // Depression
    gad7: number; // Anxiety
    pss: number;  // Stress
    sleep: number; // Sleep quality
  };
  riskLevel: 'low' | 'medium' | 'high';
  lastActive: string;
  joinedDate: string;
  counselingSessions: number;
  resourcesAccessed: string[];
}

class StudentService {
  private readonly STORAGE_KEY = 'mitra-students';

  constructor() {
    this.initializeStudents();
  }

  private initializeStudents() {
    const existing = localStorage.getItem(this.STORAGE_KEY);
    if (!existing) {
      const mockStudents: Student[] = [
        {
          id: '1',
          name: 'Rahul Sharma',
          email: 'rahul.sharma@university.edu',
          department: 'Engineering',
          semester: 4,
          age: 20,
          gender: 'Male',
          screeningScores: {
            phq9: 12,
            gad7: 8,
            pss: 18,
            sleep: 6
          },
          riskLevel: 'medium',
          lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          joinedDate: '2024-01-15',
          counselingSessions: 3,
          resourcesAccessed: ['res-1', 'res-3', 'res-5']
        },
        {
          id: '2',
          name: 'Priya Patel',
          email: 'priya.patel@university.edu',
          department: 'Medicine',
          semester: 6,
          age: 22,
          gender: 'Female',
          screeningScores: {
            phq9: 18,
            gad7: 15,
            pss: 22,
            sleep: 4
          },
          riskLevel: 'high',
          lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          joinedDate: '2023-08-20',
          counselingSessions: 7,
          resourcesAccessed: ['res-1', 'res-2', 'res-4', 'res-6']
        },
        {
          id: '3',
          name: 'Amit Kumar',
          email: 'amit.kumar@university.edu',
          department: 'Business',
          semester: 2,
          age: 19,
          gender: 'Male',
          screeningScores: {
            phq9: 5,
            gad7: 4,
            pss: 10,
            sleep: 8
          },
          riskLevel: 'low',
          lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          joinedDate: '2024-02-10',
          counselingSessions: 1,
          resourcesAccessed: ['res-2']
        },
        {
          id: '4',
          name: 'Sneha Reddy',
          email: 'sneha.reddy@university.edu',
          department: 'Arts',
          semester: 3,
          age: 20,
          gender: 'Female',
          screeningScores: {
            phq9: 8,
            gad7: 10,
            pss: 14,
            sleep: 7
          },
          riskLevel: 'medium',
          lastActive: new Date().toISOString(),
          joinedDate: '2024-01-05',
          counselingSessions: 2,
          resourcesAccessed: ['res-3', 'res-4']
        },
        {
          id: '5',
          name: 'Vikram Singh',
          email: 'vikram.singh@university.edu',
          department: 'Engineering',
          semester: 8,
          age: 23,
          gender: 'Male',
          screeningScores: {
            phq9: 14,
            gad7: 12,
            pss: 20,
            sleep: 5
          },
          riskLevel: 'high',
          lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          joinedDate: '2023-06-15',
          counselingSessions: 5,
          resourcesAccessed: ['res-1', 'res-2', 'res-3', 'res-5', 'res-6']
        }
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockStudents));
    }
  }

  // Function to anonymize student name
  private anonymizeName(name: string, id: string): string {
    // Generate consistent anonymous ID based on original ID
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `Student-${hash % 10000}`;
  }

  getAllStudents(anonymize: boolean = false): Student[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    const students = data ? JSON.parse(data) : [];
    
    // Anonymize student data if requested (for admin view)
    if (anonymize) {
      return students.map((student: Student) => ({
        ...student,
        name: this.anonymizeName(student.name, student.id),
        email: `${student.id}@student.edu` // Generic email
      }));
    }
    
    return students;
  }

  getStudentById(id: string): Student | null {
    const students = this.getAllStudents();
    return students.find(s => s.id === id) || null;
  }

  addStudent(student: Omit<Student, 'id'>): Student {
    const students = this.getAllStudents();
    const newStudent: Student = {
      ...student,
      id: Date.now().toString()
    };
    students.push(newStudent);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(students));
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<Student>): void {
    const students = this.getAllStudents();
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
      students[index] = { ...students[index], ...updates };
      // Recalculate risk level based on scores
      students[index].riskLevel = this.calculateRiskLevel(students[index].screeningScores);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(students));
    }
  }

  deleteStudent(id: string): void {
    const students = this.getAllStudents();
    const filtered = students.filter(s => s.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  private calculateRiskLevel(scores: Student['screeningScores']): 'low' | 'medium' | 'high' {
    const { phq9, gad7, pss } = scores;
    const totalScore = phq9 + gad7 + pss;
    
    if (phq9 >= 15 || gad7 >= 15 || totalScore >= 45) {
      return 'high';
    } else if (phq9 >= 10 || gad7 >= 10 || totalScore >= 30) {
      return 'medium';
    }
    return 'low';
  }

  // Bulk import students from CSV/JSON
  bulkImport(data: any[]): { success: number; failed: number } {
    let success = 0;
    let failed = 0;

    data.forEach(item => {
      try {
        const student: Omit<Student, 'id'> = {
          name: item.name || 'Unknown',
          email: item.email || '',
          department: item.department || 'General',
          semester: parseInt(item.semester) || 1,
          age: parseInt(item.age) || 18,
          gender: item.gender || 'Other',
          screeningScores: {
            phq9: parseInt(item.phq9) || 0,
            gad7: parseInt(item.gad7) || 0,
            pss: parseInt(item.pss) || 0,
            sleep: parseInt(item.sleep) || 8
          },
          riskLevel: 'low',
          lastActive: new Date().toISOString(),
          joinedDate: item.joinedDate || new Date().toISOString(),
          counselingSessions: parseInt(item.counselingSessions) || 0,
          resourcesAccessed: []
        };
        
        this.addStudent(student);
        success++;
      } catch (error) {
        failed++;
      }
    });

    return { success, failed };
  }

  // Export students data
  exportStudents(format: 'json' | 'csv'): string {
    const students = this.getAllStudents();
    
    if (format === 'json') {
      return JSON.stringify(students, null, 2);
    } else {
      // CSV format
      const headers = ['ID', 'Name', 'Email', 'Department', 'Semester', 'Risk Level', 'PHQ-9', 'GAD-7', 'PSS', 'Sleep'];
      const rows = students.map(s => [
        s.id,
        s.name,
        s.email,
        s.department,
        s.semester,
        s.riskLevel,
        s.screeningScores.phq9,
        s.screeningScores.gad7,
        s.screeningScores.pss,
        s.screeningScores.sleep
      ]);
      
      const csvContent = [headers, ...rows]
        .map(row => row.join(','))
        .join('\n');
      
      return csvContent;
    }
  }

  // Get statistics
  getStatistics() {
    const students = this.getAllStudents();
    const total = students.length;
    const byRisk = {
      high: students.filter(s => s.riskLevel === 'high').length,
      medium: students.filter(s => s.riskLevel === 'medium').length,
      low: students.filter(s => s.riskLevel === 'low').length
    };
    const byDepartment = students.reduce((acc, s) => {
      acc[s.department] = (acc[s.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const avgScores = {
      phq9: students.reduce((sum, s) => sum + s.screeningScores.phq9, 0) / total || 0,
      gad7: students.reduce((sum, s) => sum + s.screeningScores.gad7, 0) / total || 0,
      pss: students.reduce((sum, s) => sum + s.screeningScores.pss, 0) / total || 0,
      sleep: students.reduce((sum, s) => sum + s.screeningScores.sleep, 0) / total || 0
    };

    return {
      total,
      byRisk,
      byDepartment,
      avgScores,
      activeToday: students.filter(s => {
        const lastActive = new Date(s.lastActive);
        const today = new Date();
        return lastActive.toDateString() === today.toDateString();
      }).length
    };
  }
}

export const studentService = new StudentService();