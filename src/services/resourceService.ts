export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'article' | 'guide' | 'infographic';
  category: 'stress' | 'sleep' | 'anxiety' | 'depression' | 'burnout' | 'general';
  description: string;
  content: string;
  url?: string;
  tags: string[];
  views: number;
  likes: number;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  duration?: string; // For videos/audio
  readTime?: string; // For articles
}

class ResourceService {
  private readonly STORAGE_KEY = 'mitra-resources';
  private readonly ANALYTICS_KEY = 'mitra-resource-analytics';

  constructor() {
    this.initializeResources();
  }

  private initializeResources() {
    const existing = localStorage.getItem(this.STORAGE_KEY);
    if (!existing) {
      const initialResources: Resource[] = [
        {
          id: '1',
          title: 'Managing Exam Stress: A Complete Guide',
          type: 'guide',
          category: 'stress',
          description: 'Comprehensive guide on handling exam-related stress and anxiety',
          content: 'This guide covers breathing techniques, time management, and study strategies...',
          tags: ['exams', 'stress', 'study-tips', 'time-management'],
          views: 1543,
          likes: 234,
          uploadedBy: 'Dr. Sarah Johnson',
          uploadedAt: '2024-01-15T10:00:00Z',
          lastModified: '2024-02-20T14:30:00Z',
          readTime: '15 min'
        },
        {
          id: '2',
          title: 'Sleep Hygiene for Students',
          type: 'video',
          category: 'sleep',
          description: 'Video guide on improving sleep quality for better academic performance',
          content: 'Video content about sleep hygiene practices...',
          url: 'https://example.com/sleep-video',
          tags: ['sleep', 'health', 'wellness', 'productivity'],
          views: 892,
          likes: 156,
          uploadedBy: 'Wellness Team',
          uploadedAt: '2024-02-01T09:00:00Z',
          lastModified: '2024-02-01T09:00:00Z',
          duration: '12:34'
        },
        {
          id: '3',
          title: 'Mindfulness Meditation for Anxiety',
          type: 'audio',
          category: 'anxiety',
          description: 'Guided meditation session for reducing anxiety',
          content: 'Audio meditation guide...',
          url: 'https://example.com/meditation-audio',
          tags: ['meditation', 'mindfulness', 'anxiety', 'relaxation'],
          views: 2103,
          likes: 412,
          uploadedBy: 'Mindfulness Center',
          uploadedAt: '2024-01-20T11:00:00Z',
          lastModified: '2024-01-20T11:00:00Z',
          duration: '20:00'
        },
        {
          id: '4',
          title: 'Understanding Depression in College',
          type: 'article',
          category: 'depression',
          description: 'In-depth article about recognizing and dealing with depression',
          content: 'Article content about depression symptoms and coping strategies...',
          tags: ['depression', 'mental-health', 'awareness', 'support'],
          views: 567,
          likes: 89,
          uploadedBy: 'Mental Health Team',
          uploadedAt: '2024-01-25T13:00:00Z',
          lastModified: '2024-02-15T10:00:00Z',
          readTime: '8 min'
        },
        {
          id: '5',
          title: 'Burnout Prevention Strategies',
          type: 'infographic',
          category: 'burnout',
          description: 'Visual guide to preventing and managing academic burnout',
          content: 'Infographic showing signs of burnout and prevention techniques...',
          tags: ['burnout', 'prevention', 'self-care', 'balance'],
          views: 1234,
          likes: 267,
          uploadedBy: 'Student Wellness',
          uploadedAt: '2024-02-10T15:00:00Z',
          lastModified: '2024-02-10T15:00:00Z'
        }
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialResources));
    }

    // Initialize analytics
    if (!localStorage.getItem(this.ANALYTICS_KEY)) {
      localStorage.setItem(this.ANALYTICS_KEY, JSON.stringify({}));
    }
  }

  getAllResources(): Resource[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  getResourceById(id: string): Resource | null {
    const resources = this.getAllResources();
    return resources.find(r => r.id === id) || null;
  }

  addResource(resource: Omit<Resource, 'id' | 'views' | 'likes' | 'uploadedAt' | 'lastModified'>): Resource {
    const resources = this.getAllResources();
    const newResource: Resource = {
      ...resource,
      id: Date.now().toString(),
      views: 0,
      likes: 0,
      uploadedAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    resources.push(newResource);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(resources));
    return newResource;
  }

  updateResource(id: string, updates: Partial<Resource>): void {
    const resources = this.getAllResources();
    const index = resources.findIndex(r => r.id === id);
    if (index !== -1) {
      resources[index] = {
        ...resources[index],
        ...updates,
        lastModified: new Date().toISOString()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(resources));
    }
  }

  deleteResource(id: string): void {
    const resources = this.getAllResources();
    const filtered = resources.filter(r => r.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  // Track resource view
  trackView(resourceId: string): void {
    const resources = this.getAllResources();
    const resource = resources.find(r => r.id === resourceId);
    if (resource) {
      resource.views++;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(resources));
      
      // Update analytics
      const analytics = this.getAnalytics();
      const today = new Date().toISOString().split('T')[0];
      if (!analytics[today]) {
        analytics[today] = {};
      }
      analytics[today][resourceId] = (analytics[today][resourceId] || 0) + 1;
      localStorage.setItem(this.ANALYTICS_KEY, JSON.stringify(analytics));
    }
  }

  // Track resource like
  trackLike(resourceId: string): void {
    const resources = this.getAllResources();
    const resource = resources.find(r => r.id === resourceId);
    if (resource) {
      resource.likes++;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(resources));
    }
  }

  // Get analytics data
  getAnalytics(): Record<string, Record<string, number>> {
    const data = localStorage.getItem(this.ANALYTICS_KEY);
    return data ? JSON.parse(data) : {};
  }

  // Get popular resources
  getPopularResources(limit: number = 5): Resource[] {
    const resources = this.getAllResources();
    return resources.sort((a, b) => b.views - a.views).slice(0, limit);
  }

  // Get resources by category
  getResourcesByCategory(category: string): Resource[] {
    const resources = this.getAllResources();
    return resources.filter(r => r.category === category);
  }

  // Search resources
  searchResources(query: string): Resource[] {
    const resources = this.getAllResources();
    const searchTerm = query.toLowerCase();
    return resources.filter(r => 
      r.title.toLowerCase().includes(searchTerm) ||
      r.description.toLowerCase().includes(searchTerm) ||
      r.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Get resource statistics
  getStatistics() {
    const resources = this.getAllResources();
    const totalViews = resources.reduce((sum, r) => sum + r.views, 0);
    const totalLikes = resources.reduce((sum, r) => sum + r.likes, 0);
    
    const byCategory = resources.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byType = resources.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: resources.length,
      totalViews,
      totalLikes,
      avgViews: resources.length > 0 ? Math.round(totalViews / resources.length) : 0,
      byCategory,
      byType,
      popular: this.getPopularResources(3)
    };
  }
}

export const resourceService = new ResourceService();