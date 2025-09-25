import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  School, 
  Globe, 
  Shield, 
  Bell,
  Eye,
  EyeOff,
  Save,
  LogOut,
  Trash2,
  Settings,
  Heart,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    college: '',
    language: 'English',
    year: '',
    major: ''
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    dataSharing: false,
    notifications: true,
    analytics: true
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePrivacyChange = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleLogout = () => {
    signOut();
    navigate('/');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    toast({
      title: "Account deletion",
      description: "This feature would show a confirmation dialog in a real app.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-primary-light to-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-white">
            {user?.name?.charAt(0) || 'U'}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hi, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Manage your profile and privacy settings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={profileData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="pl-12 h-12"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="pl-12 h-12"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="college" className="text-sm font-medium text-gray-700 mb-2 block">
                    College/University
                  </Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="college"
                      name="college"
                      type="text"
                      value={profileData.college}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="pl-12 h-12"
                      placeholder="Your institution"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="language" className="text-sm font-medium text-gray-700 mb-2 block">
                    Preferred Language
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      id="language"
                      name="language"
                      value={profileData.language}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full h-12 pl-12 pr-3 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white disabled:bg-gray-50"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="year" className="text-sm font-medium text-gray-700 mb-2 block">
                    Academic Year
                  </Label>
                  <select
                    id="year"
                    name="year"
                    value={profileData.year}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white disabled:bg-gray-50"
                  >
                    <option value="">Select year</option>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="graduate">Graduate</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="major" className="text-sm font-medium text-gray-700 mb-2 block">
                    Major/Field of Study
                  </Label>
                  <Input
                    id="major"
                    name="major"
                    type="text"
                    value={profileData.major}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-12"
                    placeholder="Your major"
                  />
                </div>
              </div>

              {isEditing && (
                <Button type="submit" className="w-full btn-hero">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </form>
          </motion.div>
        </div>

        {/* Privacy & Settings */}
        <div className="space-y-6">
          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(privacySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {key === 'profileVisible' && 'Profile Visibility'}
                      {key === 'dataSharing' && 'Anonymous Data Sharing'}
                      {key === 'notifications' && 'Email Notifications'}
                      {key === 'analytics' && 'Usage Analytics'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {key === 'profileVisible' && 'Make your profile visible to other users'}
                      {key === 'dataSharing' && 'Help improve Mitra with anonymous usage data'}
                      {key === 'notifications' && 'Receive updates and wellness tips'}
                      {key === 'analytics' && 'Allow collection of anonymous usage statistics'}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Account Actions</h3>
            </div>
            
            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-start"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteAccount}
                className="w-full justify-start"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center mb-4">
              <Heart className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              If you're struggling or need someone to talk to, we're here for you.
            </p>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => toast({
                  title: "Contact Support",
                  description: "Support contact feature will be available in the full version.",
                })}
              >
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => toast({
                  title: "Crisis Resources",
                  description: "Crisis resources will be available in the full version.",
                })}
              >
                Crisis Resources
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;