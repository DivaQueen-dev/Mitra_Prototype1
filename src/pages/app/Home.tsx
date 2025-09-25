import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Users, 
  Brain,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import MoodTracker from '@/components/app/MoodTracker';
import GamificationDashboard from '@/components/app/GamificationDashboard';
import DigitalJournal from '@/components/app/DigitalJournal';

const Home: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Chat with Personal AI',
      description: 'Talk to your mental health assistant',
      icon: MessageSquare,
      color: 'primary',
      href: '/app/chat-personal'
    },
    {
      title: 'Chat with Mentor AI',
      description: 'Get academic guidance and support',
      icon: Brain,
      color: 'violet',
      href: '/app/chat-mentor'
    },
    {
      title: 'Book Session',
      description: 'Schedule a confidential counseling session',
      icon: Calendar,
      color: 'emerald',
      href: '/app/booking'
    },
    {
      title: 'Explore Resources',
      description: 'Discover helpful mental health content',
      icon: BookOpen,
      color: 'gold',
      href: '/app/resources'
    },
    {
      title: 'Join Community',
      description: 'Connect with peer support groups',
      icon: Users,
      color: 'violet',
      href: '/app/community'
    },
    {
      title: 'Academic Dashboard',
      description: 'Track your academic progress',
      icon: GraduationCap,
      color: 'emerald',
      href: '/app/academic'
    }
  ];

  const dailyTips = [
    "Take 5 deep breaths and notice how you feel in this moment.",
    "Remember: It's okay to not be okay. You're not alone in this journey.",
    "Small progress is still progress. Celebrate your tiny wins today.",
    "Your mental health matters. Take time for yourself today.",
    "Connect with someone you trust - a simple conversation can help.",
    "Practice gratitude: name three things you're thankful for right now."
  ];

  const getButtonClass = (color: string) => {
    const colorMap = {
      primary: 'btn-luxury',
      emerald: 'btn-emerald',
      violet: 'btn-violet',
      gold: 'btn-gold',
    };
    return colorMap[color as keyof typeof colorMap] || 'btn-luxury';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-foreground">
            Hi {user?.name}, how are you feeling today?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome to your personal wellness dashboard. Take a moment to check in with yourself 
            and explore the tools designed to support your mental health and academic journey.
          </p>
        </motion.div>

        {/* Mood Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <MoodTracker />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-foreground text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -4 }}
                  className="luxury-card cursor-pointer group"
                  onClick={() => window.location.href = action.href}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                      action.color === 'primary' ? 'from-blue-400 to-blue-600' :
                      action.color === 'emerald' ? 'from-emerald-400 to-emerald-600' :
                      action.color === 'violet' ? 'from-violet-400 to-violet-600' :
                      'from-yellow-400 to-yellow-600'
                    } flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{action.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{action.description}</p>
                  <button className={`${getButtonClass(action.color)} w-full`}>
                    Get Started
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Digital Journal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DigitalJournal />
          </motion.div>

          {/* Progress & Gamification */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <GamificationDashboard />

            {/* Daily Wellness Tip */}
            <div className="luxury-card">
              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                💡 Daily Wellness Tip
              </h4>
              <p className="text-muted-foreground text-sm">
                {dailyTips[Math.floor(Math.random() * dailyTips.length)]}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;