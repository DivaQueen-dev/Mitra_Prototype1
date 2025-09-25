import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, BookOpen, MessageCircle, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';
import AuthModal from './AuthModal';

const HeroSection = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const floatingIcons = [
    { Icon: BookOpen, delay: 0, position: 'top-20 left-20' },
    { Icon: MessageCircle, delay: 2, position: 'top-32 right-32' },
    { Icon: Brain, delay: 4, position: 'bottom-40 left-40' },
    { Icon: Heart, delay: 1, position: 'bottom-20 right-20' },
    { Icon: Users, delay: 3, position: 'top-40 left-1/2' },
    { Icon: Shield, delay: 5, position: 'bottom-32 right-1/2' },
  ];

  const handleGetStarted = () => {
    setAuthMode('signup');
    setShowAuth(true);
  };

  const handleTryDemo = () => {
    // Scroll to features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingIcons.map(({ Icon, delay, position }, index) => (
            <motion.div
              key={index}
              className={`absolute ${position} opacity-20`}
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: [-20, 0, -20], 
                opacity: [0, 0.3, 0] 
              }}
              transition={{
                duration: 6,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-12 h-12 text-primary" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Your Student{' '}
              <span className="text-gradient">
                Mental Health
              </span>{' '}
              Companion
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
            >
              Mitra provides{' '}
              <span className="font-semibold text-primary">personalized, stigma-free support</span>.{' '}
              Works in{' '}
              <span className="font-semibold text-primary">any language</span> and{' '}
              <span className="font-semibold text-primary">understands slang</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={handleGetStarted}
                className="btn-hero text-lg px-8 py-4"
              >
                Sign Up Free
              </Button>
              <Button
                onClick={handleTryDemo}
                className="btn-outline-hero text-lg px-8 py-4"
              >
                Try Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-gray-600">Resources</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">5K+</div>
                <div className="text-sm text-gray-600">Students Helped</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={heroImage}
                  alt="Students supporting each other"
                  className="w-full h-auto rounded-2xl"
                />
              </motion.div>
              
              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -left-4 glass-card p-4 flex items-center space-x-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
              >
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold">Privacy First</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 glass-card p-4 flex items-center space-x-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              >
                <Users className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold">Peer Support</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default HeroSection;