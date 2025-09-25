import React from 'react';
import { Heart, Brain } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-xl' },
    lg: { icon: 36, text: 'text-2xl' }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="w-10 h-10 bg-gradient-to-r from-primary-light to-primary rounded-xl flex items-center justify-center">
        <Heart className="w-6 h-6 text-white" />
      </div>
      
      {showText && (
        <span className={`font-bold text-gradient ${sizes[size].text}`}>
          Mitra
        </span>
      )}
    </div>
  );
};

export default Logo;