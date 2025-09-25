import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Upload, 
  Palette, 
  Shield, 
  Database,
  Moon,
  Sun,
  Save,
  RefreshCw,
  Users,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { settingsService } from '@/services/settingsService';
import { useTheme } from '@/hooks/useTheme';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface InstitutionSettings {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface AdminRole {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'moderator';
  createdAt: string;
}

const Settings: React.FC = () => {
  const [institutionSettings, setInstitutionSettings] = useState<InstitutionSettings>({
    name: '',
    logo: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#10B981'
  });
  const [admins, setAdmins] = useState<AdminRole[]>([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'moderator' as 'moderator' | 'super-admin' });
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const settings = settingsService.getInstitutionSettings();
    setInstitutionSettings(settings);
    
    const adminList = settingsService.getAdmins();
    setAdmins(adminList);
  };

  const saveInstitutionSettings = () => {
    settingsService.updateInstitutionSettings(institutionSettings);
    
    // Apply color changes to CSS variables
    document.documentElement.style.setProperty('--primary', institutionSettings.primaryColor);
    document.documentElement.style.setProperty('--secondary', institutionSettings.secondaryColor);
    document.documentElement.style.setProperty('--accent', institutionSettings.accentColor);
    
    toast({
      title: "Settings Saved",
      description: "Institution settings have been updated successfully.",
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInstitutionSettings(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) {
      toast({
        title: "Missing Information",
        description: "Please provide both name and email for the new admin.",
        variant: "destructive",
      });
      return;
    }

    const admin: AdminRole = {
      id: Date.now().toString(),
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      createdAt: new Date().toISOString()
    };

    settingsService.addAdmin(admin);
    setAdmins(prev => [...prev, admin]);
    setNewAdmin({ name: '', email: '', role: 'moderator' });
    setIsAddingAdmin(false);
    
    toast({
      title: "Admin Added",
      description: `${admin.name} has been added as ${admin.role}.`,
    });
  };

  const removeAdmin = (id: string) => {
    settingsService.removeAdmin(id);
    setAdmins(prev => prev.filter(a => a.id !== id));
    toast({
      title: "Admin Removed",
      description: "The admin has been removed from the system.",
    });
  };

  const resetAllData = () => {
    settingsService.resetAllData();
    toast({
      title: "Data Reset Complete",
      description: "All application data has been cleared.",
    });
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Manage institution settings, admin roles, and system preferences
        </p>
      </div>

      <Tabs defaultValue="institution" className="space-y-4">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="institution">Institution</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="admins">Admin Roles</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Institution Settings */}
        <TabsContent value="institution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Institution Information</CardTitle>
              <CardDescription>
                Configure your institution's branding and identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="institution-name">Institution Name</Label>
                <Input
                  id="institution-name"
                  value={institutionSettings.name}
                  onChange={(e) => setInstitutionSettings(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter institution name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Institution Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  {institutionSettings.logo && (
                    <img 
                      src={institutionSettings.logo} 
                      alt="Institution Logo" 
                      className="w-20 h-20 object-contain rounded-lg border border-slate-200 dark:border-slate-700"
                    />
                  )}
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Label htmlFor="logo-upload" className="cursor-pointer">
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Logo
                        </span>
                      </Button>
                    </Label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      Recommended: 200x200px PNG or JPG
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={saveInstitutionSettings}>
                <Save className="w-4 h-4 mr-2" />
                Save Institution Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme & Colors</CardTitle>
              <CardDescription>
                Customize the appearance of your admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Toggle between light and dark themes
                  </p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={institutionSettings.primaryColor}
                      onChange={(e) => setInstitutionSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-20 h-10"
                    />
                    <Input
                      value={institutionSettings.primaryColor}
                      onChange={(e) => setInstitutionSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      placeholder="#3B82F6"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={institutionSettings.secondaryColor}
                      onChange={(e) => setInstitutionSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-20 h-10"
                    />
                    <Input
                      value={institutionSettings.secondaryColor}
                      onChange={(e) => setInstitutionSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      placeholder="#8B5CF6"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Input
                      id="accent-color"
                      type="color"
                      value={institutionSettings.accentColor}
                      onChange={(e) => setInstitutionSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-20 h-10"
                    />
                    <Input
                      value={institutionSettings.accentColor}
                      onChange={(e) => setInstitutionSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      placeholder="#10B981"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={saveInstitutionSettings}>
                <Palette className="w-4 h-4 mr-2" />
                Apply Theme Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Roles */}
        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Management</CardTitle>
              <CardDescription>
                Manage admin accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Admin Users</h3>
                <Button 
                  onClick={() => setIsAddingAdmin(true)}
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Admin
                </Button>
              </div>

              {/* Add Admin Form */}
              {isAddingAdmin && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Name"
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <Select
                      value={newAdmin.role}
                      onValueChange={(value: 'super-admin' | 'moderator') => 
                        setNewAdmin(prev => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="super-admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addAdmin} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingAdmin(false)}
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Admin List */}
              <div className="space-y-2">
                {admins.map((admin) => (
                  <div 
                    key={admin.id} 
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-100">
                          {admin.name}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {admin.email}
                        </p>
                      </div>
                      <Badge variant={admin.role === 'super-admin' ? 'default' : 'secondary'}>
                        {admin.role}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAdmin(admin.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Management</CardTitle>
              <CardDescription>
                Manage system data and perform maintenance tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <h3 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                  Data Management
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">
                  Warning: This action will permanently delete all application data including students, resources, and forum posts.
                </p>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Database className="w-4 h-4 mr-2" />
                      Reset All Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all
                        application data and reset the system to its initial state.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={resetAllData}>
                        Yes, Reset Everything
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                  System Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Version</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">2.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Environment</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">Production</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Last Updated</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;