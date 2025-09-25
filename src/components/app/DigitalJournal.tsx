import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Save, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface JournalEntry {
  id: string;
  content: string;
  date: string;
  time: string;
}

const DigitalJournal: React.FC = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      content: 'Today was a good day. I managed to complete my assignment early and had time to relax. Feeling grateful for the support from my friends.',
      date: '2025-01-15',
      time: '18:30'
    },
    {
      id: '2',
      content: 'Feeling a bit overwhelmed with upcoming exams. Need to create a better study schedule and maybe talk to someone about managing stress.',
      date: '2025-01-14',
      time: '22:15'
    }
  ]);

  const handleSaveEntry = () => {
    if (currentEntry.trim()) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        content: currentEntry,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setEntries([newEntry, ...entries]);
      setCurrentEntry('');
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mr-3">
          <PenTool className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Digital Journal</h3>
      </div>

      {/* New Entry */}
      <div className="mb-6">
        <Textarea
          placeholder="How are you feeling today? What's on your mind?"
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          rows={4}
          className="w-full mb-4 bg-white/50 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <Button 
          onClick={handleSaveEntry}
          disabled={!currentEntry.trim()}
          className="btn-hero"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Entry
        </Button>
      </div>

      {/* Recent Entries */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Recent Entries</h4>
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/30 rounded-xl p-4 border border-gray-200/30"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(entry.date).toLocaleDateString()}
                <Clock className="w-4 h-4 ml-3 mr-1" />
                {entry.time}
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{entry.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DigitalJournal;