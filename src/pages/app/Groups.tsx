import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  School, 
  Heart, 
  BookOpen, 
  Coffee, 
  Gamepad2,
  Music,
  Camera,
  Plus,
  MessageCircle,
  UserPlus,
  UserMinus,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Groups: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [joinedGroups, setJoinedGroups] = useState(new Set([1, 3, 5]));

  const tabs = [
    { id: 'all', label: 'All Groups' },
    { id: 'college', label: 'College Groups' },
    { id: 'interest', label: 'Interest Groups' },
    { id: 'joined', label: 'My Groups' },
  ];

  const collegeGroups = [
    {
      id: 1,
      name: 'MIT Mental Health Support',
      description: 'Safe space for MIT students to share experiences and support each other',
      members: 234,
      type: 'college',
      college: 'MIT',
      isPrivate: false,
      recentActivity: '2 hours ago',
      icon: School,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 2,
      name: 'Stanford Wellness Circle',
      description: 'Promoting mental wellness and work-life balance at Stanford',
      members: 189,
      type: 'college',
      college: 'Stanford',
      isPrivate: false,
      recentActivity: '4 hours ago',
      icon: Heart,
      color: 'from-red-400 to-red-600'
    },
    {
      id: 3,
      name: 'Harvard Study Stress Management',
      description: 'Dealing with academic pressure and finding healthy coping mechanisms',
      members: 156,
      type: 'college',
      college: 'Harvard',
      isPrivate: false,
      recentActivity: '1 day ago',
      icon: BookOpen,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const interestGroups = [
    {
      id: 4,
      name: 'Mindfulness & Meditation',
      description: 'Daily meditation practices and mindfulness techniques for students',
      members: 567,
      type: 'interest',
      category: 'Wellness',
      isPrivate: false,
      recentActivity: '30 minutes ago',
      icon: Heart,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 5,
      name: 'Creative Therapy',
      description: 'Art, music, and creative expression as mental health outlets',
      members: 234,
      type: 'interest',
      category: 'Creative',
      isPrivate: false,
      recentActivity: '3 hours ago',
      icon: Camera,
      color: 'from-pink-400 to-pink-600'
    },
    {
      id: 6,
      name: 'Gaming & Mental Health',
      description: 'Exploring the relationship between gaming and psychological wellbeing',
      members: 345,
      type: 'interest',
      category: 'Gaming',
      isPrivate: false,
      recentActivity: '6 hours ago',
      icon: Gamepad2,
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      id: 7,
      name: 'Coffee & Conversations',
      description: 'Casual meetups for meaningful discussions about life and mental health',
      members: 178,
      type: 'interest',
      category: 'Social',
      isPrivate: false,
      recentActivity: '2 days ago',
      icon: Coffee,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 8,
      name: 'Music Therapy Circle',
      description: 'Using music as a tool for emotional expression and healing',
      members: 289,
      type: 'interest',
      category: 'Music',
      isPrivate: false,
      recentActivity: '1 day ago',
      icon: Music,
      color: 'from-teal-400 to-teal-600'
    }
  ];

  const allGroups = [...collegeGroups, ...interestGroups];

  const getFilteredGroups = () => {
    switch (activeTab) {
      case 'college':
        return collegeGroups;
      case 'interest':
        return interestGroups;
      case 'joined':
        return allGroups.filter(group => joinedGroups.has(group.id));
      default:
        return allGroups;
    }
  };

  const handleJoinLeave = (groupId: number) => {
    const newJoinedGroups = new Set(joinedGroups);
    if (newJoinedGroups.has(groupId)) {
      newJoinedGroups.delete(groupId);
    } else {
      newJoinedGroups.add(groupId);
    }
    setJoinedGroups(newJoinedGroups);
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
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Student Groups
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
          Connect with students from your college or those who share your interests. Join supportive communities where you belong.
        </p>
        <Button 
          className="btn-luxury"
          onClick={() => {
            // Demo functionality
            alert('Create Group feature will be available in the full version!');
          }}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Group
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{allGroups.length}</h3>
          <p className="text-gray-600">Active Groups</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <School className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{collegeGroups.length}</h3>
          <p className="text-gray-600">College Groups</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{interestGroups.length}</h3>
          <p className="text-gray-600">Interest Groups</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{joinedGroups.size}</h3>
          <p className="text-gray-600">Groups Joined</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </motion.div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredGroups().map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="group"
          >
            <div className="glass-card p-6 h-full group-hover:scale-105 transition-all duration-300">
              {/* Group Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${group.color} rounded-xl flex items-center justify-center`}>
                  <group.icon className="w-6 h-6 text-white" />
                </div>
                {joinedGroups.has(group.id) && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Joined
                  </span>
                )}
              </div>

              {/* Group Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {group.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {group.description}
                </p>
                
                {group.type === 'college' && 'college' in group && (
                  <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mb-2">
                    <School className="w-3 h-3 mr-1" />
                    {group.college}
                  </span>
                )}
                
                {group.type === 'interest' && 'category' in group && (
                  <span className="inline-flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full mb-2">
                    <Heart className="w-3 h-3 mr-1" />
                    {group.category}
                  </span>
                )}
              </div>

              {/* Group Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {group.members} members
                </div>
                <div className="text-xs">
                  Active {group.recentActivity}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleJoinLeave(group.id)}
                  variant={joinedGroups.has(group.id) ? "outline" : "default"}
                  size="sm"
                  className="flex-1"
                >
                  {joinedGroups.has(group.id) ? (
                    <>
                      <UserMinus className="w-4 h-4 mr-2" />
                      Leave
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Join
                    </>
                  )}
                </Button>
                {joinedGroups.has(group.id) && (
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {getFilteredGroups().length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No groups found
          </h3>
          <p className="text-gray-600">
            {activeTab === 'joined' 
              ? "You haven't joined any groups yet. Browse and join groups that interest you!"
              : "No groups available in this category."
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Groups;