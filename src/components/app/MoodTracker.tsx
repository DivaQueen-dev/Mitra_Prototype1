import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MoodEntry {
  value: number;
  date: string;
  color: string;
  label: string;
}

const MoodTracker: React.FC = () => {
  const [moodValue, setMoodValue] = useState([50]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [todaysMood, setTodaysMood] = useState<MoodEntry | null>(null);

  const getMoodData = (value: number) => {
    if (value >= 80) return { 
      color: 'emerald', 
      label: 'Excellent', 
      icon: TrendingUp,
      gradient: 'from-emerald-400 to-emerald-600'
    };
    if (value >= 60) return { 
      color: 'primary', 
      label: 'Good', 
      icon: TrendingUp,
      gradient: 'from-blue-400 to-blue-600'
    };
    if (value >= 40) return { 
      color: 'violet', 
      label: 'Neutral', 
      icon: Minus,
      gradient: 'from-violet-400 to-violet-600'
    };
    if (value >= 20) return { 
      color: 'gold', 
      label: 'Low', 
      icon: TrendingDown,
      gradient: 'from-yellow-400 to-yellow-600'
    };
    return { 
      color: 'rose', 
      label: 'Critical', 
      icon: TrendingDown,
      gradient: 'from-red-400 to-red-600'
    };
  };

  useEffect(() => {
    const today = new Date().toDateString();
    const savedMood = localStorage.getItem(`mood_${today}`);
    if (savedMood) {
      const mood = JSON.parse(savedMood);
      setTodaysMood(mood);
      setIsSubmitted(true);
      setMoodValue([mood.value]);
    }
  }, []);

  const handleSubmitMood = () => {
    const today = new Date().toDateString();
    const moodData = getMoodData(moodValue[0]);
    const entry: MoodEntry = {
      value: moodValue[0],
      date: today,
      color: moodData.color,
      label: moodData.label,
    };
    
    localStorage.setItem(`mood_${today}`, JSON.stringify(entry));
    setTodaysMood(entry);
    setIsSubmitted(true);
  };

  const resetMood = () => {
    setIsSubmitted(false);
    setTodaysMood(null);
    const today = new Date().toDateString();
    localStorage.removeItem(`mood_${today}`);
  };

  const currentMoodData = getMoodData(moodValue[0]);
  const IconComponent = currentMoodData.icon;

  if (isSubmitted && todaysMood) {
    const submittedMoodData = getMoodData(todaysMood.value);
    const SubmittedIcon = submittedMoodData.icon;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="luxury-card"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-4">Today's Mood Check-in</h3>
          
          <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br ${submittedMoodData.gradient} flex items-center justify-center mb-4 shadow-lg`}>
            <SubmittedIcon className="w-8 h-8 text-white" />
          </div>
          
          <div className="mb-4">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${submittedMoodData.gradient} text-white`}>
              {todaysMood.label} ({todaysMood.value}%)
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Thanks for checking in! Your mood has been recorded.
          </p>
          
          <button
            onClick={resetMood}
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Update mood
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="luxury-card"
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-4">How are you feeling today?</h3>
        
        <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br ${currentMoodData.gradient} flex items-center justify-center mb-6 shadow-lg transition-all duration-300`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>

        <div className="mb-6">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${currentMoodData.gradient} text-white mb-4`}>
            {currentMoodData.label} ({moodValue[0]}%)
          </div>
          
          <div className="px-4">
            <Slider
              value={moodValue}
              onValueChange={setMoodValue}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmitMood}
          className="btn-luxury w-full"
        >
          Record Today's Mood
        </button>
      </div>
    </motion.div>
  );
};

export default MoodTracker;