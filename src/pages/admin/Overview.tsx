import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Overview: React.FC = () => {
  // Mock data for demonstration
  const kpiData = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Sessions",
      value: "1,254",
      change: "+8%",
      trend: "up",
      icon: Activity,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Resources Uploaded",
      value: "186",
      change: "+23%",
      trend: "up",
      icon: FileText,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Forum Flags",
      value: "7",
      change: "-15%",
      trend: "down",
      icon: AlertTriangle,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const stressTrendData = [
    { month: 'Jan', stress: 65, anxiety: 58, sleep: 72 },
    { month: 'Feb', stress: 68, anxiety: 62, sleep: 70 },
    { month: 'Mar', stress: 72, anxiety: 68, sleep: 68 },
    { month: 'Apr', stress: 75, anxiety: 72, sleep: 65 },
    { month: 'May', stress: 80, anxiety: 76, sleep: 62 },
    { month: 'Jun', stress: 78, anxiety: 74, sleep: 64 },
  ];

  const departmentData = [
    { name: 'Engineering', students: 1240, risk: 'medium' },
    { name: 'Medicine', students: 890, risk: 'high' },
    { name: 'Business', students: 567, risk: 'low' },
    { name: 'Arts', students: 150, risk: 'low' },
  ];

  const riskLevelData = [
    { name: 'Low Risk', value: 65, color: '#10B981' },
    { name: 'Medium Risk', value: 25, color: '#F59E0B' },
    { name: 'High Risk', value: 10, color: '#EF4444' },
  ];

  const recentAlerts = [
    { id: 1, type: 'high_stress', message: 'Spike in stress reports in Engineering department', time: '2 hours ago', severity: 'high' },
    { id: 2, type: 'flagged_post', message: 'Post flagged for inappropriate content', time: '4 hours ago', severity: 'medium' },
    { id: 3, type: 'resource_popular', message: 'Sleep hygiene resource trending', time: '6 hours ago', severity: 'low' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Dashboard Overview
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Welcome back! Here's what's happening with your students today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-emerald-600 border-emerald-200">
            <Shield className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {kpi.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                      {kpi.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-emerald-500 mr-1" />
                      )}
                      <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                        {kpi.change}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${kpi.color} rounded-lg flex items-center justify-center`}>
                    <kpi.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stress Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Mental Health Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stressTrendData}>
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
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Student Risk Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskLevelData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {riskLevelData.map((entry, index) => (
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

      {/* Department Overview and Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Department Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentData.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-100">{dept.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{dept.students} students</p>
                  </div>
                  <Badge 
                    variant={dept.risk === 'high' ? 'destructive' : dept.risk === 'medium' ? 'default' : 'secondary'}
                  >
                    {dept.risk} risk
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'high' ? 'bg-red-500' : 
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {alert.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;