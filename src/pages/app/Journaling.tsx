import React from 'react';
import { motion } from 'framer-motion';
import NotionStyleJournal from '@/components/app/NotionStyleJournal';

const Journaling: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Digital Journal
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Express your thoughts, track your emotions, and reflect on your journey in a safe, private space.
        </p>
      </motion.div>

      <NotionStyleJournal />
    </div>
  );
};

export default Journaling;