import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Headphones, 
  FileText, 
  HelpCircle, 
  Search,
  Filter,
  Play,
  Download,
  BookOpen,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'guides', label: 'Guides', icon: FileText },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  ];

  const resources = {
    videos: [
      {
        title: 'Managing Exam Stress',
        description: 'Learn effective techniques to handle academic pressure',
        duration: '12 min',
        thumbnail: '🎓',
        category: 'Academic'
      },
      {
        title: 'Breathing Exercises for Anxiety',
        description: 'Simple breathing techniques to calm your mind',
        duration: '8 min',
        thumbnail: '🫁',
        category: 'Wellness'
      },
      {
        title: 'Building Healthy Relationships',
        description: 'Navigate friendships and social connections',
        duration: '15 min',
        thumbnail: '👥',
        category: 'Social'
      },
      {
        title: 'Sleep Hygiene for Students',
        description: 'Improve your sleep quality and energy levels',
        duration: '10 min',
        thumbnail: '😴',
        category: 'Health'
      }
    ],
    audio: [
      {
        title: 'Guided Meditation for Beginners',
        description: 'A gentle introduction to mindfulness practice',
        duration: '20 min',
        thumbnail: '🧘',
        category: 'Meditation'
      },
      {
        title: 'Study Focus Background Sounds',
        description: 'Ambient sounds to enhance concentration',
        duration: '60 min',
        thumbnail: '🎵',
        category: 'Focus'
      },
      {
        title: 'Progressive Muscle Relaxation',
        description: 'Release physical tension and stress',
        duration: '25 min',
        thumbnail: '💆',
        category: 'Relaxation'
      },
      {
        title: 'Confidence Building Affirmations',
        description: 'Positive affirmations for self-esteem',
        duration: '15 min',
        thumbnail: '✨',
        category: 'Confidence'
      }
    ],
    guides: [
      {
        title: 'Complete Guide to Time Management',
        description: 'Master your schedule and boost productivity',
        duration: '15 min read',
        thumbnail: '⏰',
        category: 'Productivity'
      },
      {
        title: 'Understanding Depression in Students',
        description: 'Recognize signs and learn coping strategies',
        duration: '12 min read',
        thumbnail: '💭',
        category: 'Mental Health'
      },
      {
        title: 'Building Resilience Through Challenges',
        description: 'Develop mental strength and adaptability',
        duration: '18 min read',
        thumbnail: '💪',
        category: 'Resilience'
      },
      {
        title: 'Nutrition for Mental Wellness',
        description: 'How food affects your mood and mind',
        duration: '10 min read',
        thumbnail: '🥗',
        category: 'Nutrition'
      }
    ],
    faqs: [
      {
        title: 'How do I know if I need professional help?',
        description: 'Signs that indicate you should seek counseling',
        duration: '3 min read',
        thumbnail: '❓',
        category: 'Help'
      },
      {
        title: 'Is my information really confidential?',
        description: 'Understanding privacy and data protection',
        duration: '2 min read',
        thumbnail: '🔒',
        category: 'Privacy'
      },
      {
        title: 'How to support a friend in crisis?',
        description: 'Being there for someone who\'s struggling',
        duration: '5 min read',
        thumbnail: '🤝',
        category: 'Support'
      },
      {
        title: 'What if I can\'t afford counseling?',
        description: 'Free and low-cost mental health resources',
        duration: '4 min read',
        thumbnail: '💰',
        category: 'Resources'
      }
    ]
  };

  const filteredResources = resources[activeTab as keyof typeof resources]?.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Mental Health Resources
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our collection of videos, audio content, guides, and FAQs designed to support your mental wellness journey.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="glass-card p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
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
            className="flex items-center gap-2"
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Button>
        ))}
      </motion.div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources?.map((resource, index) => (
          <motion.div
            key={resource.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="group cursor-pointer"
          >
            <div className="glass-card p-6 group-hover:scale-105 transition-all duration-300">
              {/* Thumbnail */}
              <div className="w-full h-40 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-6xl">{resource.thumbnail}</span>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {resource.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {resource.duration}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <Button 
                    size="sm" 
                    className="btn-luxury"
                    onClick={() => {
                      alert(`${activeTab === 'videos' ? 'Video' : activeTab === 'audio' ? 'Audio' : 'Guide'} will be available in the full version!`);
                    }}
                  >
                    {activeTab === 'videos' && <Play className="w-4 h-4 mr-2" />}
                    {activeTab === 'audio' && <Play className="w-4 h-4 mr-2" />}
                    {(activeTab === 'guides' || activeTab === 'faqs') && <BookOpen className="w-4 h-4 mr-2" />}
                    {activeTab === 'videos' ? 'Watch' : activeTab === 'audio' ? 'Listen' : 'Read'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      alert('Download feature will be available in the full version!');
                    }}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredResources?.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No resources found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or browse different categories.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Resources;