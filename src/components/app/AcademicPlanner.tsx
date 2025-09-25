import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Check, 
  BookOpen, 
  FileText, 
  GraduationCap,
  Target,
  Brain,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGamification } from '@/hooks/useGamification';

interface AcademicTask {
  id: string;
  title: string;
  description: string;
  type: 'assignment' | 'project' | 'exam' | 'study';
  subject: string;
  dueDate: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  completed: boolean;
  completedAt?: string;
}

const AcademicPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<AcademicTask[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedView, setSelectedView] = useState<'all' | 'pending' | 'completed'>('all');
  const [newTask, setNewTask] = useState<Partial<AcademicTask>>({
    title: '',
    description: '',
    type: 'assignment',
    subject: '',
    dueDate: '',
    priority: 'normal',
  });
  const { addXP } = useGamification();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const saved = localStorage.getItem('mitra-academic-tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  };

  const saveTasks = (updatedTasks: AcademicTask[]) => {
    localStorage.setItem('mitra-academic-tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate) {
      const task: AcademicTask = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description || '',
        type: newTask.type as AcademicTask['type'],
        subject: newTask.subject || '',
        dueDate: newTask.dueDate,
        priority: newTask.priority as AcademicTask['priority'],
        completed: false,
      };
      
      saveTasks([...tasks, task]);
      setNewTask({
        title: '',
        description: '',
        type: 'assignment',
        subject: '',
        dueDate: '',
        priority: 'normal',
      });
      setShowAddTask(false);
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date().toISOString() : undefined,
        };
        
        // Award XP for completing task
        if (!task.completed) {
          addXP(20, 'academic_task');
        }
        
        return updatedTask;
      }
      return task;
    });
    
    saveTasks(updatedTasks);
  };

  const getTaskIcon = (type: AcademicTask['type']) => {
    switch (type) {
      case 'assignment': return FileText;
      case 'project': return Target;
      case 'exam': return GraduationCap;
      case 'study': return BookOpen;
      default: return FileText;
    }
  };

  const getPriorityColor = (priority: AcademicTask['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'normal': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    }
  };

  const getFilteredTasks = () => {
    switch (selectedView) {
      case 'pending': return tasks.filter(task => !task.completed);
      case 'completed': return tasks.filter(task => task.completed);
      default: return tasks;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Academic Planner</h2>
            <p className="text-sm text-muted-foreground">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddTask(!showAddTask)} className="btn-luxury">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Progress Bar */}
      {totalTasks > 0 && (
        <div className="luxury-card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Add Task Form */}
      {showAddTask && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-card"
        >
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Add New Task</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Task Title</label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Subject</label>
                <Input
                  value={newTask.subject}
                  onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                  placeholder="Subject/Course"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Type</label>
                <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value as AcademicTask['type'] })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="study">Study Session</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Due Date</label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Priority</label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value as AcademicTask['priority'] })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Task description (optional)"
                rows={3}
                className="mt-1"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleAddTask} className="btn-luxury">
                Create Task
              </Button>
              <Button variant="outline" onClick={() => setShowAddTask(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filter Buttons */}
      <div className="flex space-x-2">
        {(['all', 'pending', 'completed'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setSelectedView(view)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedView === view
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {getFilteredTasks().map((task, index) => {
          const TaskIcon = getTaskIcon(task.type);
          const daysUntilDue = getDaysUntilDue(task.dueDate);
          
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`luxury-card transition-all duration-200 ${
                task.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-gray-300 hover:border-emerald-400'
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <TaskIcon className="w-4 h-4 text-muted-foreground" />
                        <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {task.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {daysUntilDue < 0 && !task.completed && (
                          <div className="flex items-center text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Overdue
                          </div>
                        )}
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                        {daysUntilDue >= 0 && !task.completed && (
                          <span className="text-xs">({daysUntilDue} days)</span>
                        )}
                      </div>
                    </div>
                    
                    {task.subject && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {task.subject}
                      </div>
                    )}
                    
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {getFilteredTasks().length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {selectedView === 'all' ? 'No tasks yet' : `No ${selectedView} tasks`}
            </h3>
            <p className="text-muted-foreground">
              {selectedView === 'all' 
                ? 'Add your first academic task to get started.' 
                : `You have no ${selectedView} tasks right now.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Mentor AI Placeholder */}
      <div className="luxury-card p-6 border-l-4 border-l-blue-500">
        <div className="flex items-center space-x-3 mb-3">
          <Brain className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-foreground">Mentor AI</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Need help with your studies? Ask our Mentor AI for guidance on assignments, study strategies, or academic planning.
        </p>
        <Button variant="outline" className="w-full">
          Chat with Mentor AI
        </Button>
      </div>
    </div>
  );
};

export default AcademicPlanner;