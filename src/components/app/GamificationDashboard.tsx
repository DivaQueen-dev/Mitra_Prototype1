import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Award, Target, Calendar, BookOpen, Heart } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const GamificationDashboard: React.FC = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalJournalEntries, setTotalJournalEntries] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_mood',
      title: 'First Check-in',
      description: 'Complete your first mood check-in',
      icon: Heart,
      color: 'rose',
      unlocked: false,
    },
    {
      id: 'streak_7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: Flame,
      color: 'gold',
      unlocked: false,
      progress: 0,
      maxProgress: 7,
    },
    {
      id: 'journal_10',
      title: 'Thoughtful Writer',
      description: 'Write 10 journal entries',
      icon: BookOpen,
      color: 'violet',
      unlocked: false,
      progress: 0,
      maxProgress: 10,
    },
    {
      id: 'tasks_25',
      title: 'Task Master',
      description: 'Complete 25 academic tasks',
      icon: Target,
      color: 'emerald',
      unlocked: false,
      progress: 0,
      maxProgress: 25,
    },
  ]);

  useEffect(() => {
    // Load gamification data from localStorage
    const streak = localStorage.getItem('current_streak') || '0';
    const journals = localStorage.getItem('journal_entries') || '[]';
    const tasks = localStorage.getItem('completed_tasks') || '0';
    
    setCurrentStreak(parseInt(streak));
    setTotalJournalEntries(JSON.parse(journals).length);
    setCompletedTasks(parseInt(tasks));

    // Update achievements based on progress
    const updatedAchievements = achievements.map(achievement => {
      let unlocked = achievement.unlocked;
      let progress = achievement.progress;

      switch (achievement.id) {
        case 'first_mood':
          const todayMood = localStorage.getItem(`mood_${new Date().toDateString()}`);
          unlocked = !!todayMood;
          break;
        case 'streak_7':
          progress = Math.min(parseInt(streak), 7);
          unlocked = parseInt(streak) >= 7;
          break;
        case 'journal_10':
          progress = Math.min(JSON.parse(journals).length, 10);
          unlocked = JSON.parse(journals).length >= 10;
          break;
        case 'tasks_25':
          progress = Math.min(parseInt(tasks), 25);
          unlocked = parseInt(tasks) >= 25;
          break;
      }

      return { ...achievement, unlocked, progress };
    });

    setAchievements(updatedAchievements);
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      gold: 'from-yellow-400 to-yellow-600',
      emerald: 'from-emerald-400 to-emerald-600',
      violet: 'from-violet-400 to-violet-600',
      rose: 'from-rose-400 to-rose-600',
      primary: 'from-blue-400 to-blue-600',
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-card text-center"
        >
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">{currentStreak}</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="luxury-card text-center"
        >
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-400 to-violet-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">{totalJournalEntries}</div>
          <div className="text-sm text-muted-foreground">Journal Entries</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="luxury-card text-center"
        >
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">{completedTasks}</div>
          <div className="text-sm text-muted-foreground">Tasks Completed</div>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="luxury-card"
      >
        <div className="flex items-center mb-4">
          <Award className="w-5 h-5 text-primary mr-2" />
          <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            const colorClasses = getColorClasses(achievement.color);
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${colorClasses} flex items-center justify-center ${
                    achievement.unlocked ? 'shadow-lg' : 'opacity-50'
                  }`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-semibold text-sm ${
                      achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    
                    {achievement.maxProgress && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${colorClasses} transition-all duration-500`}
                          style={{ 
                            width: `${Math.min((achievement.progress || 0) / achievement.maxProgress * 100, 100)}%` 
                          }}
                        />
                      </div>
                    )}
                    
                    {achievement.unlocked && (
                      <div className="badge-gold mt-2">
                        Unlocked!
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default GamificationDashboard;