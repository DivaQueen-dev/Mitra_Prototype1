import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Heart, 
  ArrowUp, 
  ArrowDown,
  Plus, 
  Users, 
  Clock,
  BookOpen,
  Brain,
  Coffee,
  GraduationCap,
  Smile,
  Trophy,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGamification } from '@/hooks/useGamification';
import CreatePostModal from '@/components/app/CreatePostModal';
import { useToast } from '@/hooks/use-toast';

const Community: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [votedPosts, setVotedPosts] = useState<Record<number, 'up' | 'down'>>({});
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Effective breathing exercises for exam stress?',
      content: 'My finals are next week and I\'m having panic attacks during study sessions. Can anyone share breathing techniques that actually work?',
      author: 'AnxiousStudent23',
      category: 'stress',
      timeAgo: '1 hour ago',
      upvotes: 34,
      downvotes: 2,
      replies: 12,
      helpful: true,
      tags: ['breathing', 'anxiety', 'finals']
    },
    {
      id: 2,
      title: 'Best study schedule for multiple exams',
      content: 'I have 5 exams in 2 weeks. How do you create a realistic study schedule that doesn\'t burn you out? Looking for practical tips.',
      author: 'StudyPlanMaster',
      category: 'exams',
      timeAgo: '3 hours ago',
      upvotes: 28,
      downvotes: 1,
      replies: 9,
      helpful: true,
      tags: ['schedule', 'planning', 'exams']
    },
    {
      id: 3,
      title: 'Free tutoring resources for calculus?',
      content: 'Struggling with derivatives and integrals. Any recommendations for free online tutoring or practice sites that actually help?',
      author: 'MathStruggler',
      category: 'academic',
      timeAgo: '6 hours ago',
      upvotes: 19,
      downvotes: 3,
      replies: 15,
      helpful: false,
      tags: ['calculus', 'tutoring', 'math-help']
    },
    {
      id: 4,
      title: '10-minute meditation changed my life',
      content: 'Started doing 10 minutes of meditation daily and my stress levels have dropped significantly. Here\'s my routine and apps I use...',
      author: 'ZenStudent',
      category: 'relaxation',
      timeAgo: '1 day ago',
      upvotes: 76,
      downvotes: 4,
      replies: 31,
      helpful: true,
      tags: ['meditation', 'routine', 'stress-relief']
    },
    {
      id: 5,
      title: 'Small wins matter - celebrating progress',
      content: 'Completed all my assignments this week and even had time for self-care. Remember to celebrate the small victories!',
      author: 'ProgressTracker',
      category: 'stress',
      timeAgo: '2 days ago',
      upvotes: 52,
      downvotes: 1,
      replies: 24,
      helpful: true,
      tags: ['progress', 'self-care', 'motivation']
    }
  ]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { addXP } = useGamification();
  const { toast } = useToast();

  const categories = [
    { id: 'all', label: 'All Posts', icon: MessageSquare, count: 67 },
    { id: 'stress', label: 'Stress Management', icon: Brain, count: 18 },
    { id: 'exams', label: 'Exam Support', icon: GraduationCap, count: 12 },
    { id: 'academic', label: 'Academic Help', icon: BookOpen, count: 15 },
    { id: 'relaxation', label: 'Relaxation & Wellness', icon: Smile, count: 22 },
  ];


  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleVote = (postId: number, voteType: 'up' | 'down') => {
    setVotedPosts(prev => ({
      ...prev,
      [postId]: prev[postId] === voteType ? undefined : voteType
    }));
    
    // Award XP for community interaction
    addXP(5, 'community_post');
  };

  const handleCreatePost = (newPost: any) => {
    setPosts(prev => [newPost, ...prev]);
    addXP(15, 'community_post');
    toast({
      title: "Post created!",
      description: "Your post has been shared with the community.",
    });
  };

  const leaderboard = [
    { name: 'HelpfulHeart', xp: 2450, level: 25, posts: 89 },
    { name: 'StudyBuddy', xp: 2180, level: 22, posts: 67 },
    { name: 'MindfulMate', xp: 1920, level: 20, posts: 54 },
    { name: 'WisdomSeeker', xp: 1650, level: 17, posts: 43 },
    { name: 'PeaceKeeper', xp: 1380, level: 14, posts: 38 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Student Community
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Connect with fellow students, share experiences, and find support in a safe, moderated environment.
        </p>
        <Button className="btn-luxury" onClick={() => setIsCreatePostOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Create New Post
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">1,247</h3>
          <p className="text-gray-600">Active Members</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">356</h3>
          <p className="text-gray-600">Posts This Week</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">2,891</h3>
          <p className="text-gray-600">Support Interactions</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Categories */}
          <div className="luxury-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-center">
                    <category.icon className="w-4 h-4 mr-3" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="luxury-card p-6">
            <div className="flex items-center mb-4">
              <Trophy className="w-5 h-5 text-gold mr-2" />
              <h3 className="text-lg font-semibold text-foreground">Top Contributors</h3>
            </div>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div key={user.name} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' :
                    index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white' :
                    index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{user.name}</div>
                    <div className="text-xs text-muted-foreground">Level {user.level} • {user.posts} posts</div>
                  </div>
                  <div className="text-xs text-primary font-medium">{user.xp} XP</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posts Feed */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="luxury-card hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    {/* Reddit-style Voting */}
                    <div className="flex flex-col items-center space-y-1 mr-2">
                      <button
                        onClick={() => handleVote(post.id, 'up')}
                        className={`vote-button ${votedPosts[post.id] === 'up' ? 'voted-up' : ''}`}
                      >
                        <ArrowUp className="w-5 h-5" />
                      </button>
                      <span className="text-sm font-bold text-foreground min-w-[20px] text-center">
                        {post.upvotes - post.downvotes + (votedPosts[post.id] === 'up' ? 1 : votedPosts[post.id] === 'down' ? -1 : 0)}
                      </span>
                      <button
                        onClick={() => handleVote(post.id, 'down')}
                        className={`vote-button ${votedPosts[post.id] === 'down' ? 'voted-down' : ''}`}
                      >
                        <ArrowDown className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {post.author.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{post.author}</p>
                            <div className="flex items-center text-muted-foreground text-sm">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.timeAgo}
                            </div>
                          </div>
                        </div>
                        {post.helpful && (
                          <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                            Helpful
                          </span>
                        )}
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {post.title}
                        </h3>
                        <p className="text-foreground leading-relaxed mb-3">
                          {post.content}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm">{post.replies} comments</span>
                          </button>
                          
                          <button className="flex items-center space-x-2 text-muted-foreground hover:text-rose transition-colors">
                            <span className="text-sm">Report</span>
                          </button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary hover:text-primary/80"
                          onClick={() => toast({
                            title: "Feature coming soon!",
                            description: "Reply functionality will be available in the full version.",
                          })}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onPostCreated={handleCreatePost}
      />
    </div>
  );
};

export default Community;