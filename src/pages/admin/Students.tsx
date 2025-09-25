import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Filter,
  AlertTriangle,
  UserPlus,
  FileDown,
  FileUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { studentService, Student } from '@/services/studentService';
import { notificationService } from '@/services/notificationService';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    semester: 1,
    age: 18,
    gender: 'Male',
    phq9: 0,
    gad7: 0,
    pss: 0,
    sleep: 8
  });
  const { toast } = useToast();

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, filterDepartment, filterRisk]);

  const loadStudents = () => {
    // Get anonymized student data for admin view
    const data = studentService.getAllStudents(true);
    setStudents(data);
  };

  const filterStudents = () => {
    let filtered = [...students];

    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.includes(searchTerm)
      );
    }

    if (filterDepartment !== 'all') {
      filtered = filtered.filter(s => s.department === filterDepartment);
    }

    if (filterRisk !== 'all') {
      filtered = filtered.filter(s => s.riskLevel === filterRisk);
    }

    setFilteredStudents(filtered);
  };

  const handleAddStudent = () => {
    const newStudent = studentService.addStudent({
      name: formData.name,
      email: formData.email,
      department: formData.department,
      semester: formData.semester,
      age: formData.age,
      gender: formData.gender,
      screeningScores: {
        phq9: formData.phq9,
        gad7: formData.gad7,
        pss: formData.pss,
        sleep: formData.sleep
      },
      riskLevel: 'low',
      lastActive: new Date().toISOString(),
      joinedDate: new Date().toISOString(),
      counselingSessions: 0,
      resourcesAccessed: []
    });

    // Check if high risk and create notification
    if (formData.phq9 > 15) {
      notificationService.generateRiskAlert(newStudent.id, newStudent.name, formData.phq9);
    }

    loadStudents();
    setIsAddModalOpen(false);
    resetForm();
    toast({
      title: "Student Added",
      description: `${formData.name} has been added successfully.`,
    });
  };

  const handleEditStudent = () => {
    if (!selectedStudent) return;

    studentService.updateStudent(selectedStudent.id, {
      name: formData.name,
      email: formData.email,
      department: formData.department,
      semester: formData.semester,
      age: formData.age,
      gender: formData.gender,
      screeningScores: {
        phq9: formData.phq9,
        gad7: formData.gad7,
        pss: formData.pss,
        sleep: formData.sleep
      }
    });

    // Check if risk level increased
    if (formData.phq9 > 15) {
      notificationService.generateRiskAlert(selectedStudent.id, formData.name, formData.phq9);
    }

    loadStudents();
    setIsEditModalOpen(false);
    resetForm();
    toast({
      title: "Student Updated",
      description: `${formData.name}'s information has been updated.`,
    });
  };

  const handleDeleteStudent = (id: string) => {
    studentService.deleteStudent(id);
    loadStudents();
    toast({
      title: "Student Deleted",
      description: "The student has been removed from the system.",
    });
  };

  const openEditModal = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      department: student.department,
      semester: student.semester,
      age: student.age,
      gender: student.gender,
      phq9: student.screeningScores.phq9,
      gad7: student.screeningScores.gad7,
      pss: student.screeningScores.pss,
      sleep: student.screeningScores.sleep
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      department: 'Engineering',
      semester: 1,
      age: 18,
      gender: 'Male',
      phq9: 0,
      gad7: 0,
      pss: 0,
      sleep: 8
    });
    setSelectedStudent(null);
  };

  const handleExport = (format: 'json' | 'csv') => {
    const data = studentService.exportStudents(format);
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: `Students data exported as ${format.toUpperCase()}.`,
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = file.type === 'application/json' ? JSON.parse(content) : parseCSV(content);
        const result = studentService.bulkImport(data);
        loadStudents();
        toast({
          title: "Import Complete",
          description: `Successfully imported ${result.success} students. ${result.failed} failed.`,
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Please check the file format and try again.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const parseCSV = (content: string): any[] => {
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header.toLowerCase()] = values[index]?.trim();
      });
      return obj;
    });
  };

  const stats = studentService.getStatistics();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Student Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Monitor and manage student mental health data
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => handleExport('csv')}
          >
            <FileDown className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('json')}
          >
            <FileDown className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
          <div>
            <Input
              type="file"
              accept=".csv,.json"
              onChange={handleImport}
              className="hidden"
              id="import-file"
            />
            <Label htmlFor="import-file">
              <Button variant="outline" asChild>
                <span>
                  <FileUp className="w-4 h-4 mr-2" />
                  Import
                </span>
              </Button>
            </Label>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">High Risk</p>
                <p className="text-2xl font-bold text-red-600">{stats.byRisk.high}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Medium Risk</p>
                <p className="text-2xl font-bold text-orange-600">{stats.byRisk.medium}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Today</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeToday}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Medicine">Medicine</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRisk} onValueChange={setFilterRisk}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
          <CardDescription>
            Click on a student to view details or edit their information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>PHQ-9</TableHead>
                <TableHead>GAD-7</TableHead>
                <TableHead>PSS</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-mono">{student.id}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>
                    <Badge variant={student.screeningScores.phq9 > 15 ? 'destructive' : 'secondary'}>
                      {student.screeningScores.phq9}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.screeningScores.gad7 > 15 ? 'destructive' : 'secondary'}>
                      {student.screeningScores.gad7}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.screeningScores.pss > 20 ? 'destructive' : 'secondary'}>
                      {student.screeningScores.pss}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        student.riskLevel === 'high' ? 'destructive' : 
                        student.riskLevel === 'medium' ? 'default' : 'secondary'
                      }
                    >
                      {student.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(student)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Student Dialog */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={() => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        resetForm();
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit Student' : 'Add New Student'}</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Update student information and screening scores' : 'Enter student details and initial screening scores'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter student name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@university.edu"
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="semester">Semester</Label>
              <Input
                id="semester"
                type="number"
                min="1"
                max="8"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="16"
                max="30"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            <h3 className="font-semibold">Screening Scores</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phq9">PHQ-9 (Depression)</Label>
                <Input
                  id="phq9"
                  type="number"
                  min="0"
                  max="27"
                  value={formData.phq9}
                  onChange={(e) => setFormData({ ...formData, phq9: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="gad7">GAD-7 (Anxiety)</Label>
                <Input
                  id="gad7"
                  type="number"
                  min="0"
                  max="21"
                  value={formData.gad7}
                  onChange={(e) => setFormData({ ...formData, gad7: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="pss">PSS (Stress)</Label>
                <Input
                  id="pss"
                  type="number"
                  min="0"
                  max="40"
                  value={formData.pss}
                  onChange={(e) => setFormData({ ...formData, pss: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="sleep">Sleep Quality (hours)</Label>
                <Input
                  id="sleep"
                  type="number"
                  min="0"
                  max="12"
                  value={formData.sleep}
                  onChange={(e) => setFormData({ ...formData, sleep: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddModalOpen(false);
              setIsEditModalOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={isEditModalOpen ? handleEditStudent : handleAddStudent}>
              {isEditModalOpen ? 'Update Student' : 'Add Student'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;