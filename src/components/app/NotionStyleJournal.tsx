import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Save, Calendar, Clock, Plus, Hash, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useGamification } from '@/hooks/useGamification';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  date: string;
  time: string;
  mood?: string;
}

const NotionStyleJournal: React.FC = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentTags, setCurrentTags] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const { addXP } = useGamification();

  useEffect(() => {
    loadJournalEntries();
  }, []);

  const loadJournalEntries = () => {
    const saved = localStorage.getItem('mitra-journal-entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  };

  const saveJournalEntries = (newEntries: JournalEntry[]) => {
    localStorage.setItem('mitra-journal-entries', JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const handleSaveEntry = () => {
    if (currentEntry.trim()) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title: currentTitle.trim() || 'Untitled Entry',
        content: currentEntry,
        tags: currentTags.split(',').map(tag => tag.trim()).filter(tag => tag),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      const updatedEntries = [newEntry, ...entries];
      saveJournalEntries(updatedEntries);
      
      // Award XP for journaling
      addXP(15, 'journal_entry');
      
      // Reset form
      setCurrentEntry('');
      setCurrentTitle('');
      setCurrentTags('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-violet-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Digital Journal</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </div>
      </div>

      {/* New Entry Card */}
      <div className="luxury-card">
        <div className="p-6 space-y-4">
          <Input
            placeholder="Entry title..."
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            className="text-lg font-medium border-none bg-transparent p-0 focus:ring-0 placeholder:text-muted-foreground"
          />
          
          <Textarea
            placeholder="What's on your mind today? Share your thoughts, feelings, or experiences..."
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            rows={6}
            className="resize-none border-none bg-transparent p-0 focus:ring-0 text-foreground placeholder:text-muted-foreground"
          />
          
          <div className="flex items-center space-x-2">
            <Hash className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tags (comma separated)"
              value={currentTags}
              onChange={(e) => setCurrentTags(e.target.value)}
              className="border-none bg-transparent p-0 focus:ring-0 placeholder:text-muted-foreground text-sm"
            />
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {currentEntry.length} characters
            </div>
            <Button 
              onClick={handleSaveEntry}
              disabled={!currentEntry.trim()}
              className="btn-luxury"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Entry
            </Button>
          </div>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="luxury-card hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(entry.date).toLocaleDateString()}
                  <Clock className="w-4 h-4 ml-3 mr-1" />
                  {entry.time}
                </div>
              </div>
              
              <p className="text-foreground leading-relaxed mb-4 whitespace-pre-wrap">
                {entry.content}
              </p>
              
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {entries.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No journal entries yet</h3>
            <p className="text-muted-foreground">Start writing your first entry above to begin your journaling journey.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotionStyleJournal;