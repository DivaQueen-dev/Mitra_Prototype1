import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Flag, 
  Check, 
  X, 
  Eye, 
  Clock, 
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface FlaggedPost {
  id: string;
  title: string;
  content: string;
  author: string;
  department: string;
  postDate: string;
  flagDate: string;
  flagReason: string;
  status: 'pending' | 'approved' | 'rejected';
  moderatorNotes?: string;
  severity: 'low' | 'medium' | 'high';
}

interface Moderator {
  id: string;
  name: string;
  email: string;
  department: string;
  assignedDate: string;
  status: 'active' | 'inactive';
  postsModerated: number;
}

const Forum: React.FC = () => {
  const [flaggedPosts, setFlaggedPosts] = useState<FlaggedPost[]>([]);
  const [moderators, setModerators] = useState<Moderator[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'moderators'>('posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPost, setSelectedPost] = useState<FlaggedPost | null>(null);
  const [moderatorNotes, setModeratorNotes] = useState('');

  // Mock data
  useEffect(() => {
    const mockFlaggedPosts: FlaggedPost[] = [
      {
        id: '1',
        title: 'Struggling with exam anxiety',
        content: 'I cannot handle the pressure anymore. The exams are making me feel extremely overwhelmed and I am having panic attacks daily. I do not know what to do.',
        author: 'Anonymous Student',
        department: 'Engineering',
        postDate: '2024-01-18',
        flagDate: '2024-01-19',
        flagReason: 'Mental health crisis - requires immediate attention',
        status: 'pending',
        severity: 'high'
      },
      {
        id: '2',
        title: 'Study group formation',
        content: 'Looking for study partners for upcoming semester. Anyone interested in forming a study group for advanced mathematics?',
        author: 'John Smith',
        department: 'Mathematics',
        postDate: '2024-01-17',
        flagDate: '2024-01-18',
        flagReason: 'Reported as spam by multiple users',
        status: 'pending',
        severity: 'low'
      },
      {
        id: '3',
        title: 'Campus counseling review',
        content: 'The counseling services at our campus are inadequate. They do not understand student problems and the waiting times are too long.',
        author: 'Concerned Student',
        department: 'Psychology',
        postDate: '2024-01-16',
        flagDate: '2024-01-17',
        flagReason: 'Inappropriate criticism of services',
        status: 'approved',
        severity: 'medium',
        moderatorNotes: 'Valid feedback about counseling services. Approved for discussion.'
      }
    ];

    const mockModerators: Moderator[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@university.edu',
        department: 'Psychology',
        assignedDate: '2023-09-01',
        status: 'active',
        postsModerated: 45
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.c@university.edu',
        department: 'Engineering',
        assignedDate: '2023-10-15',
        status: 'active',
        postsModerated: 32
      },
      {
        id: '3',
        name: 'Emily Davis',
        email: 'emily.d@university.edu',
        department: 'Medicine',
        assignedDate: '2023-08-20',
        status: 'inactive',
        postsModerated: 28
      }
    ];

    // Load from localStorage or use mock data
    const savedPosts = localStorage.getItem('mitra-admin-flagged-posts');
    const savedModerators = localStorage.getItem('mitra-admin-moderators');
    
    if (savedPosts) {
      setFlaggedPosts(JSON.parse(savedPosts));
    } else {
      setFlaggedPosts(mockFlaggedPosts);
      localStorage.setItem('mitra-admin-flagged-posts', JSON.stringify(mockFlaggedPosts));
    }

    if (savedModerators) {
      setModerators(JSON.parse(savedModerators));
    } else {
      setModerators(mockModerators);
      localStorage.setItem('mitra-admin-moderators', JSON.stringify(mockModerators));
    }
  }, []);

  const filteredPosts = flaggedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handlePostAction = (postId: string, action: 'approve' | 'reject', notes: string) => {
    const updatedPosts = flaggedPosts.map(post => 
      post.id === postId 
        ? { ...post, status: (action === 'approve' ? 'approved' : 'rejected') as 'approved' | 'rejected', moderatorNotes: notes }
        : post
    );
    
    setFlaggedPosts(updatedPosts);
    localStorage.setItem('mitra-admin-flagged-posts', JSON.stringify(updatedPosts));
    setSelectedPost(null);
    setModeratorNotes('');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const pendingCount = flaggedPosts.filter(p => p.status === 'pending').length;
  const approvedCount = flaggedPosts.filter(p => p.status === 'approved').length;
  const rejectedCount = flaggedPosts.filter(p => p.status === 'rejected').length;
  const activeModerators = moderators.filter(m => m.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Forum Moderation
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Review flagged posts and manage student moderators.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex border rounded-lg p-1 bg-slate-100 dark:bg-slate-800">
            <Button
              variant={activeTab === 'posts' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('posts')}
            >
              Flagged Posts
            </Button>
            <Button
              variant={activeTab === 'moderators' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('moderators')}
            >
              Moderators
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
              </div>
              <X className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Moderators</p>
                <p className="text-2xl font-bold text-blue-600">{activeModerators}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {activeTab === 'posts' ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-orange-600" />
              Flagged Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search flagged posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(post.severity)}>
                        {post.severity} priority
                      </Badge>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedPost(post)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Flagged Post</DialogTitle>
                          </DialogHeader>
                          {selectedPost && (
                            <div className="space-y-4">
                              <div>
                                <Label>Title</Label>
                                <p className="text-sm bg-slate-100 dark:bg-slate-700 p-2 rounded">
                                  {selectedPost.title}
                                </p>
                              </div>
                              
                              <div>
                                <Label>Content</Label>
                                <p className="text-sm bg-slate-100 dark:bg-slate-700 p-2 rounded max-h-32 overflow-y-auto">
                                  {selectedPost.content}
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label>Author</Label>
                                  <p>{selectedPost.author}</p>
                                </div>
                                <div>
                                  <Label>Department</Label>
                                  <p>{selectedPost.department}</p>
                                </div>
                                <div>
                                  <Label>Post Date</Label>
                                  <p>{new Date(selectedPost.postDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <Label>Flag Reason</Label>
                                  <p>{selectedPost.flagReason}</p>
                                </div>
                              </div>
                              
                              {selectedPost.status === 'pending' && (
                                <>
                                  <div>
                                    <Label htmlFor="notes">Moderator Notes</Label>
                                    <Textarea
                                      id="notes"
                                      value={moderatorNotes}
                                      onChange={(e) => setModeratorNotes(e.target.value)}
                                      placeholder="Add notes about your decision..."
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Button 
                                      variant="destructive" 
                                      onClick={() => handlePostAction(selectedPost.id, 'reject', moderatorNotes)}
                                      className="flex-1"
                                    >
                                      <X className="w-4 h-4 mr-1" />
                                      Reject
                                    </Button>
                                    <Button 
                                      onClick={() => handlePostAction(selectedPost.id, 'approve', moderatorNotes)}
                                      className="flex-1"
                                    >
                                      <Check className="w-4 h-4 mr-1" />
                                      Approve
                                    </Button>
                                  </div>
                                </>
                              )}
                              
                              {selectedPost.moderatorNotes && (
                                <div>
                                  <Label>Previous Notes</Label>
                                  <p className="text-sm bg-slate-100 dark:bg-slate-700 p-2 rounded">
                                    {selectedPost.moderatorNotes}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span>{post.department}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Flagged: {new Date(post.flagDate).toLocaleDateString()}</span>
                      <span>Reason: {post.flagReason}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Student Moderators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moderators.map((moderator) => (
                <div
                  key={moderator.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800 dark:text-slate-100">
                        {moderator.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {moderator.email} • {moderator.department}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Assigned: {new Date(moderator.assignedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                        {moderator.postsModerated} posts moderated
                      </p>
                      <Badge variant={moderator.status === 'active' ? 'default' : 'secondary'}>
                        {moderator.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={moderator.status === 'active' ? 'text-red-600' : 'text-green-600'}
                      >
                        {moderator.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Forum;