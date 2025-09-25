import { useState, useEffect } from 'react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  requirement: number;
  currentProgress: number;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  journalEntries: number;
  academicTasks: number;
  communityPosts: number;
  totalActiveDays: number;
}

export const useGamification = () => {
  const [stats, setStats] = useState<UserStats>({
    xp: 0,
    level: 1,
    streak: 0,
    journalEntries: 0,
    academicTasks: 0,
    communityPosts: 0,
    totalActiveDays: 0,
  });

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'first_mood',
      name: 'First Check-in',
      description: 'Complete your first mood check-in',
      icon: '💙',
      color: 'blue',
      unlocked: false,
      requirement: 1,
      currentProgress: 0,
    },
    {
      id: 'streak_7',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      color: 'gold',
      unlocked: false,
      requirement: 7,
      currentProgress: 0,
    },
    {
      id: 'journal_master',
      name: 'Journal Master',
      description: 'Write 10 journal entries',
      icon: '📝',
      color: 'violet',
      unlocked: false,
      requirement: 10,
      currentProgress: 0,
    },
    {
      id: 'academic_achiever',
      name: 'Academic Achiever',
      description: 'Complete 25 academic tasks',
      icon: '🎓',
      color: 'emerald',
      unlocked: false,
      requirement: 25,
      currentProgress: 0,
    },
    {
      id: 'community_helper',
      name: 'Community Helper',
      description: 'Make 5 helpful community posts',
      icon: '🤝',
      color: 'blue',
      unlocked: false,
      requirement: 5,
      currentProgress: 0,
    },
  ]);

  useEffect(() => {
    loadGamificationData();
  }, []);

  const loadGamificationData = () => {
    const savedStats = localStorage.getItem('mitra-gamification-stats');
    const savedBadges = localStorage.getItem('mitra-gamification-badges');
    
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
    
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    }
  };

  const saveGamificationData = (newStats: UserStats, newBadges?: Badge[]) => {
    localStorage.setItem('mitra-gamification-stats', JSON.stringify(newStats));
    if (newBadges) {
      localStorage.setItem('mitra-gamification-badges', JSON.stringify(newBadges));
    }
  };

  const addXP = (amount: number, activity: string) => {
    const newStats = { ...stats, xp: stats.xp + amount };
    
    // Calculate new level
    newStats.level = Math.floor(newStats.xp / 100) + 1;
    
    // Update activity-specific counters
    switch (activity) {
      case 'mood_checkin':
        newStats.totalActiveDays = Math.max(newStats.totalActiveDays, getCurrentStreak() || 1);
        break;
      case 'journal_entry':
        newStats.journalEntries += 1;
        break;
      case 'academic_task':
        newStats.academicTasks += 1;
        break;
      case 'community_post':
        newStats.communityPosts += 1;
        break;
    }

    // Update streak
    newStats.streak = getCurrentStreak() || 0;

    // Check for badge unlocks
    const updatedBadges = badges.map(badge => {
      const progress = getBadgeProgress(badge.id, newStats);
      return {
        ...badge,
        currentProgress: progress,
        unlocked: progress >= badge.requirement || badge.unlocked,
      };
    });

    setStats(newStats);
    setBadges(updatedBadges);
    saveGamificationData(newStats, updatedBadges);

    return { xpGained: amount, levelUp: newStats.level > stats.level };
  };

  const getBadgeProgress = (badgeId: string, currentStats: UserStats): number => {
    switch (badgeId) {
      case 'first_mood':
        return localStorage.getItem(`mood_${new Date().toDateString()}`) ? 1 : 0;
      case 'streak_7':
        return currentStats.streak;
      case 'journal_master':
        return currentStats.journalEntries;
      case 'academic_achiever':
        return currentStats.academicTasks;
      case 'community_helper':
        return currentStats.communityPosts;
      default:
        return 0;
    }
  };

  const getCurrentStreak = (): number => {
    const streak = localStorage.getItem('current_streak');
    return streak ? parseInt(streak) : 0;
  };

  const getXPToNextLevel = (): number => {
    return (stats.level * 100) - stats.xp;
  };

  const getLevelProgress = (): number => {
    const currentLevelXP = (stats.level - 1) * 100;
    const nextLevelXP = stats.level * 100;
    return ((stats.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  };

  return {
    stats,
    badges,
    addXP,
    getXPToNextLevel,
    getLevelProgress,
    loadGamificationData,
  };
};