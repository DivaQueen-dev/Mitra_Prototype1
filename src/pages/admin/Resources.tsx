import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Video, 
  Headphones, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  BarChart3,
  Star
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

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'article';
  category: 'stress' | 'sleep' | 'anxiety' | 'depression' | 'burnout';
  uploadDate: string;
  views: number;
  rating: number;
  tags: string[];
  url?: string;
}

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'article' as Resource['type'],
    category: 'stress' as Resource['category'],
    tags: '',
    url: ''
  });

  // Mock resource data
  useEffect(() => {
    const mockResources: Resource[] = [
      {
        id: '1',
        title: 'Managing Exam Stress',
        description: 'Comprehensive guide on handling academic pressure during examination periods.',
        type: 'article',
        category: 'stress',
        uploadDate: '2024-01-15',
        views: 1250,
        rating: 4.8,
        tags: ['exam', 'coping', 'academic'],
        url: 'https://example.com/stress-guide'
      },
      {
        id: '2',
        title: 'Sleep Hygiene for Students',
        description: 'Video tutorial on establishing healthy sleep patterns for better academic performance.',
        type: 'video',
        category: 'sleep',
        uploadDate: '2024-01-10',
        views: 890,
        rating: 4.6,
        tags: ['sleep', 'health', 'routine'],
        url: 'https://example.com/sleep-video'
      },
      {
        id: '3',
        title: 'Mindfulness Meditation Audio',
        description: 'Guided meditation session for anxiety relief and mental clarity.',
        type: 'audio',
        category: 'anxiety',
        uploadDate: '2024-01-08',
        views: 2100,
        rating: 4.9,
        tags: ['meditation', 'mindfulness', 'calm'],
        url: 'https://example.com/meditation-audio'
      }
    ];

    // Load from localStorage or use mock data
    const savedResources = localStorage.getItem('mitra-admin-resources');
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    } else {
      setResources(mockResources);
      localStorage.setItem('mitra-admin-resources', JSON.stringify(mockResources));
    }
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || resource.type === filterType;
    const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <Headphones className="w-5 h-5" />;
      case 'article': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800 border-red-200';
      case 'audio': return 'bg-green-100 text-green-800 border-green-200';
      case 'article': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      stress: 'bg-orange-100 text-orange-800',
      sleep: 'bg-purple-100 text-purple-800',
      anxiety: 'bg-yellow-100 text-yellow-800',
      depression: 'bg-indigo-100 text-indigo-800',
      burnout: 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleAddResource = () => {
    const resource: Resource = {
      id: Date.now().toString(),
      title: newResource.title,
      description: newResource.description,
      type: newResource.type,
      category: newResource.category,
      uploadDate: new Date().toISOString().split('T')[0],
      views: 0,
      rating: 0,
      tags: newResource.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      url: newResource.url
    };

    const updatedResources = [...resources, resource];
    setResources(updatedResources);
    localStorage.setItem('mitra-admin-resources', JSON.stringify(updatedResources));
    
    setNewResource({
      title: '',
      description: '',
      type: 'article',
      category: 'stress',
      tags: '',
      url: ''
    });
    setIsAddModalOpen(false);
  };

  const totalViews = resources.reduce((sum, resource) => sum + resource.views, 0);
  const avgRating = resources.length > 0 
    ? (resources.reduce((sum, resource) => sum + resource.rating, 0) / resources.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Resource Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage psychoeducational content and track resource analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newResource.title}
                    onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                    placeholder="Resource title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newResource.description}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                    placeholder="Brief description"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={newResource.type} onValueChange={(value: Resource['type']) => setNewResource({...newResource, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newResource.category} onValueChange={(value: Resource['category']) => setNewResource({...newResource, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stress">Stress</SelectItem>
                        <SelectItem value="sleep">Sleep</SelectItem>
                        <SelectItem value="anxiety">Anxiety</SelectItem>
                        <SelectItem value="depression">Depression</SelectItem>
                        <SelectItem value="burnout">Burnout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="url">URL (optional)</Label>
                  <Input
                    id="url"
                    value={newResource.url}
                    onChange={(e) => setNewResource({...newResource, url: e.target.value})}
                    placeholder="https://example.com/resource"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={newResource.tags}
                    onChange={(e) => setNewResource({...newResource, tags: e.target.value})}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddResource} className="flex-1">
                    Add Resource
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Resources</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{resources.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Views</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Average Rating</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{avgRating}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Most Popular</p>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {resources.length > 0 ? resources.reduce((prev, current) => 
                    prev.views > current.views ? prev : current
                  ).category : 'N/A'}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="stress">Stress</SelectItem>
                <SelectItem value="sleep">Sleep</SelectItem>
                <SelectItem value="anxiety">Anxiety</SelectItem>
                <SelectItem value="depression">Depression</SelectItem>
                <SelectItem value="burnout">Burnout</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge className={`${getTypeColor(resource.type)} flex items-center gap-1`}>
                          {getTypeIcon(resource.type)}
                          {resource.type}
                        </Badge>
                        <Badge className={getCategoryColor(resource.category)}>
                          {resource.category}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {resource.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {resource.rating}
                        </span>
                      </div>
                      <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex gap-1 flex-wrap mb-4">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {resource.url && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Resources;