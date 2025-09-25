import React, { useState, useEffect } from 'react';
import { Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AccessibilityToggle: React.FC = () => {
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mitra-accessibility-mode');
    if (saved) {
      const isEnabled = JSON.parse(saved);
      setAccessibilityMode(isEnabled);
      applyAccessibilityMode(isEnabled);
    }
  }, []);

  const applyAccessibilityMode = (enabled: boolean) => {
    const root = document.documentElement;
    if (enabled) {
      root.style.setProperty('--font-size-scale', '1.2');
      root.classList.add('accessibility-mode');
    } else {
      root.style.removeProperty('--font-size-scale');
      root.classList.remove('accessibility-mode');
    }
  };

  const toggleAccessibilityMode = () => {
    const newMode = !accessibilityMode;
    setAccessibilityMode(newMode);
    localStorage.setItem('mitra-accessibility-mode', JSON.stringify(newMode));
    applyAccessibilityMode(newMode);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleAccessibilityMode}
      className={`w-9 h-9 p-0 hover:bg-muted ${accessibilityMode ? 'text-primary' : 'text-muted-foreground'}`}
      aria-label="Toggle accessibility mode"
    >
      <Accessibility className="h-4 w-4" />
    </Button>
  );
};

export default AccessibilityToggle;