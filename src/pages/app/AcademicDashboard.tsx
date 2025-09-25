import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Plus, 
  MessageCircle,
  Target,
  TrendingUp,
  Clock,
  Star,
  Brain,
  Edit3,
  Trash2,
  Users,
  FileText,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useGamification } from '@/hooks/useGamification';
import InstitutionSelector from '@/components/InstitutionSelector';
import CollegeCounselor from '@/components/app/CollegeCounselor';
import MentorAI from '@/components/app/MentorAI';

const AcademicDashboard: React.FC = () => {
  const { user } = useAuth();
  const { addXP } = useGamification();
  const [hasAccess, setHasAccess] = useState(false);
  const [activeTab, setActiveTab] = useState('assignments');
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskImportance, setNewTaskImportance] = useState('normal');
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const institution = localStorage.getItem('mitra_institution');
    const passkey = localStorage.getItem('mitra_passkey');
    if (institution && passkey) {
      setHasAccess(true);
    }
  }, []);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('mitra-academic-tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      {
        id: 1,
        title: 'Complete Data Structures Assignment',
        description: 'Implement binary tree operations and submit by Friday',
        dueDate: '2025-01-20',
        importance: 'high',
        completed: false,
        subject: 'Computer Science'
      },
      {
        id: 2,
        title: 'Study for Calculus Midterm',
        description: 'Review chapters 5-8, practice integration problems',
        dueDate: '2025-01-25',
        importance: 'normal',
        completed: false,
        subject: 'Mathematics'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('mitra-academic-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInstitutionAccess = (institution: string, passkey: string) => {
    setHasAccess(true);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        description: newTaskDescription,
        dueDate: '',
        importance: newTaskImportance,
        completed: false,
        subject: 'General'
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setNewTaskDescription('');
      setNewTaskImportance('normal');
      setShowAddTask(false);
      addXP(10, 'academic_task');
    }
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (!task.completed && updatedTask.completed) {
          addXP(25, 'academic_task');
        }
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getImportanceClass = (importance: string) => {
    switch (importance) {
      case 'urgent': return 'tag-urgent';
      case 'high': return 'tag-high';
      case 'normal': return 'tag-normal';
      case 'low': return 'tag-low';
      default: return 'tag-normal';
    }
  };

  const sidebarTabs = [
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'mentor', label: 'Mentor AI', icon: Brain },
    { id: 'projects', label: 'Projects', icon: Target },
    { id: 'exams', label: 'Exams', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'counselor', label: 'College Counselor', icon: Users },
  ];

  if (!hasAccess) {
    return <InstitutionSelector onInstitutionSelected={handleInstitutionAccess} />;
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-6">
        <h2 className="text-lg font-semibold mb-6 text-gradient">Academic Dashboard</h2>
        <nav className="space-y-2">
          {sidebarTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gradient">Your Tasks</h1>
            
            {/* Add Task Button */}
            <Button onClick={() => setShowAddTask(true)} className="btn-luxury">
              <Plus className="w-4 h-4 mr-2" />
              Add New Task
            </Button>

            {/* Add Task Form */}
            {showAddTask && (
              <div className="luxury-card p-6">
                <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Task title"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                  <Textarea
                    placeholder="Task description (optional)"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    rows={3}
                  />
                  <Select value={newTaskImportance} onValueChange={setNewTaskImportance}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select importance level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">🔴 Urgent</SelectItem>
                      <SelectItem value="high">🟠 High</SelectItem>
                      <SelectItem value="normal">🟢 Normal</SelectItem>
                      <SelectItem value="low">⚪ Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-3">
                    <Button onClick={handleAddTask} className="btn-luxury">
                      Add Task
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddTask(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Tasks List */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className={`luxury-card ${task.completed ? 'opacity-75' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 transition-all ${
                          task.completed 
                            ? 'bg-primary border-primary' 
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            task.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                          }`}>
                            {task.title}
                          </h3>
                          <span className={getImportanceClass(task.importance)}>
                            {task.importance}
                          </span>
                        </div>
                        
                        {task.description && (
                          <p className={`text-muted-foreground mb-2 ${task.completed ? 'line-through' : ''}`}>
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="text-rose hover:text-rose/80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mentor' && <MentorAI />}
        
        {activeTab === 'counselor' && <CollegeCounselor />}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gradient">Projects</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="luxury-card">
                <h3 className="text-lg font-semibold mb-2">Final Year Project</h3>
                <p className="text-muted-foreground mb-4">AI-Based Student Mental Health Analysis</p>
                <div className="flex items-center justify-between">
                  <span className="tag-high">In Progress</span>
                  <span className="text-sm text-muted-foreground">Due: March 2025</span>
                </div>
              </div>
              <div className="luxury-card">
                <h3 className="text-lg font-semibold mb-2">Database Project</h3>
                <p className="text-muted-foreground mb-4">University Management System</p>
                <div className="flex items-center justify-between">
                  <span className="tag-normal">Completed</span>
                  <span className="text-sm text-muted-foreground">Submitted</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gradient">Upcoming Exams</h1>
            <div className="space-y-4">
              <div className="luxury-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Data Structures & Algorithms</h3>
                    <p className="text-muted-foreground">Mid-term Examination</p>
                  </div>
                  <div className="text-right">
                    <div className="tag-urgent">Jan 25, 2025</div>
                    <p className="text-sm text-muted-foreground mt-1">Room: CS-101</p>
                  </div>
                </div>
              </div>
              <div className="luxury-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Database Management Systems</h3>
                    <p className="text-muted-foreground">Final Examination</p>
                  </div>
                  <div className="text-right">
                    <div className="tag-high">Feb 15, 2025</div>
                    <p className="text-sm text-muted-foreground mt-1">Room: CS-205</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gradient">Academic Resources</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="luxury-card">
                <FileText className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-2">Course Materials</h3>
                <p className="text-muted-foreground text-sm">Access lectures, notes, and assignments</p>
              </div>
              <div className="luxury-card">
                <BookOpen className="w-8 h-8 text-emerald mb-3" />
                <h3 className="text-lg font-semibold mb-2">Digital Library</h3>
                <p className="text-muted-foreground text-sm">Research papers and e-books</p>
              </div>
              <div className="luxury-card">
                <Award className="w-8 h-8 text-gold mb-3" />
                <h3 className="text-lg font-semibold mb-2">Certification Courses</h3>
                <p className="text-muted-foreground text-sm">Professional development courses</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicDashboard;