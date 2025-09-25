import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Brain,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ComposedChart, Area } from 'recharts';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data for charts
  const monthlyTrends = [
    { month: 'Aug', stress: 65, anxiety: 58, sleep: 72, depression: 45, students: 2650 },
    { month: 'Sep', stress: 68, anxiety: 62, sleep: 70, depression: 48, students: 2720 },
    { month: 'Oct', stress: 72, anxiety: 68, sleep: 68, depression: 52, students: 2780 },
    { month: 'Nov', stress: 75, anxiety: 72, sleep: 65, depression: 55, students: 2820 },
    { month: 'Dec', stress: 80, anxiety: 76, sleep: 62, depression: 58, students: 2847 },
    { month: 'Jan', stress: 78, anxiety: 74, sleep: 64, depression: 56, students: 2890 },
  ];

  const departmentData = [
    { name: 'Engineering', stress: 78, anxiety: 72, sleep: 65, students: 1240, risk: 72 },
    { name: 'Medicine', stress: 82, anxiety: 79, sleep: 61, students: 890, risk: 85 },
    { name: 'Business', stress: 68, anxiety: 64, sleep: 70, students: 567, risk: 58 },
    { name: 'Arts', stress: 62, anxiety: 58, sleep: 75, students: 150, risk: 45 },
    { name: 'Sciences', stress: 74, anxiety: 70, sleep: 67, students: 340, risk: 68 },
  ];

  const semesterComparison = [
    { semester: 'Sem 1', stress: 65, anxiety: 60, sleep: 70 },
    { semester: 'Sem 2', stress: 68, anxiety: 64, sleep: 68 },
    { semester: 'Sem 3', stress: 70, anxiety: 67, sleep: 66 },
    { semester: 'Sem 4', stress: 72, anxiety: 69, sleep: 64 },
    { semester: 'Sem 5', stress: 75, anxiety: 72, sleep: 62 },
    { semester: 'Sem 6', stress: 78, anxiety: 75, sleep: 60 },
    { semester: 'Sem 7', stress: 80, anxiety: 77, sleep: 58 },
    { semester: 'Sem 8', stress: 82, anxiety: 79, sleep: 56 },
  ];

  const resourcePopularity = [
    { name: 'Stress Management', value: 35, color: '#EF4444' },
    { name: 'Sleep Hygiene', value: 28, color: '#3B82F6' },
    { name: 'Anxiety Coping', value: 22, color: '#F59E0B' },
    { name: 'Depression Support', value: 15, color: '#8B5CF6' },
  ];

  const weeklyActivity = [
    { day: 'Mon', posts: 45, counseling: 12, resources: 89 },
    { day: 'Tue', posts: 52, counseling: 15, resources: 102 },
    { day: 'Wed', posts: 48, counseling: 18, resources: 95 },
    { day: 'Thu', posts: 61, counseling: 14, resources: 118 },
    { day: 'Fri', posts: 38, counseling: 9, resources: 76 },
    { day: 'Sat', posts: 29, counseling: 6, resources: 54 },
    { day: 'Sun', posts: 25, counseling: 4, resources: 42 },
  ];

  const handleExportReport = (type: string) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `mitra_${type}_report_${timestamp}.csv`;
    
    // Mock CSV content
    let csvContent = "";
    if (type === 'mental_health') {
      csvContent = "Period,Stress,Anxiety,Sleep Issues,Depression\n" +
        monthlyTrends.map(row => `${row.month},${row.stress},${row.anxiety},${row.sleep},${row.depression}`).join("\n");
    } else if (type === 'department') {
      csvContent = "Department,Students,Stress Level,Anxiety Level,Sleep Issues,Risk Score\n" +
        departmentData.map(row => `${row.name},${row.students},${row.stress},${row.anxiety},${row.sleep},${row.risk}`).join("\n");
    }
    
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // AI Insights (mock)
  const aiInsights = [
    {
      type: 'warning',
      title: 'Stress Spike Predicted',
      description: 'Based on historical data, stress levels are likely to increase by 15% during the upcoming exam period (Feb 15-28).',
      confidence: 87
    },
    {
      type: 'info',
      title: 'Sleep Resource Trending',
      description: 'Sleep hygiene resources show 40% higher engagement this month, suggesting increased awareness.',
      confidence: 92
    },
    {
      type: 'urgent',
      title: 'Medicine Department Alert',
      description: 'Medicine students showing significantly higher anxiety levels (79%) compared to university average (65%).',
      confidence: 95
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Reports & Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Comprehensive insights into student mental health trends and platform usage.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="semester">Semester</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="medicine">Medicine</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${
                  insight.type === 'urgent' 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : insight.type === 'warning'
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`font-medium ${
                    insight.type === 'urgent' ? 'text-red-800 dark:text-red-200' :
                    insight.type === 'warning' ? 'text-yellow-800 dark:text-yellow-200' :
                    'text-blue-800 dark:text-blue-200'
                  }`}>
                    {insight.title}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className={`text-sm ${
                  insight.type === 'urgent' ? 'text-red-700 dark:text-red-300' :
                  insight.type === 'warning' ? 'text-yellow-700 dark:text-yellow-300' :
                  'text-blue-700 dark:text-blue-300'
                }`}>
                  {insight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mental Health Trends */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Mental Health Trends
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleExportReport('mental_health')}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E2E8F0', 
                      borderRadius: '8px' 
                    }} 
                  />
                  <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} name="Stress" />
                  <Line type="monotone" dataKey="anxiety" stroke="#F59E0B" strokeWidth={2} name="Anxiety" />
                  <Line type="monotone" dataKey="sleep" stroke="#3B82F6" strokeWidth={2} name="Sleep Issues" />
                  <Line type="monotone" dataKey="depression" stroke="#8B5CF6" strokeWidth={2} name="Depression" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Comparison */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Department Risk Levels
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleExportReport('department')}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E2E8F0', 
                      borderRadius: '8px' 
                    }} 
                  />
                  <Bar dataKey="risk" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Semester Progression */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Semester-wise Progression
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={semesterComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="semester" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E2E8F0', 
                      borderRadius: '8px' 
                    }} 
                  />
                  <Bar dataKey="stress" fill="#EF4444" radius={[2, 2, 0, 0]} />
                  <Line type="monotone" dataKey="anxiety" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="sleep" stroke="#3B82F6" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Resource Popularity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              Most Accessed Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resourcePopularity}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {resourcePopularity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Weekly Platform Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E2E8F0', 
                    borderRadius: '8px' 
                  }} 
                />
                <Bar dataKey="posts" fill="#3B82F6" name="Forum Posts" />
                <Bar dataKey="counseling" fill="#10B981" name="Counseling Sessions" />
                <Bar dataKey="resources" fill="#8B5CF6" name="Resource Views" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-slate-600" />
            Export Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" onClick={() => handleExportReport('comprehensive')}>
              <Download className="w-4 h-4 mr-2" />
              Comprehensive Report
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('department_insights')}>
              <Download className="w-4 h-4 mr-2" />
              Department Insights
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('monthly_summary')}>
              <Download className="w-4 h-4 mr-2" />
              Monthly Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;