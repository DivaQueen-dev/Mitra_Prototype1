import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';

const CTASection = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const handleJoinNow = () => {
    setAuthMode('signup');
    setShowAuth(true);
  };

  const handleExploreResources = () => {
    // Scroll to resources or open resources modal
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      icon: Heart,
      text: 'Personalized mental health support',
    },
    {
      icon: Users,
      text: 'Connect with understanding peers',
    },
    {
      icon: Sparkles,
      text: 'Access to expert resources',
    },
  ];

  return (
    <>
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-blue-50/30 to-indigo-50/50">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary-light/5" />
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-primary-light/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Join 5,000+ Students</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Take charge of your{' '}
              <span className="text-gradient">mental well-being</span>{' '}
              today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Don't let stress and anxiety hold you back from achieving your dreams. 
              Join Mitra's supportive community and start your journey to better mental health.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3 bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20"
                >
                  <benefit.icon className="w-5 h-5 text-primary" />
                  <span className="text-gray-700 font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="luxury-card bg-gradient-primary p-8 text-center border-0 shadow-lg"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Join Our Student Community Today</h3>
                <p className="text-white/90 mb-6">Connect with like-minded peers and access personalized mental health support designed specifically for students.</p>
                <Button
                  onClick={handleJoinNow}
                  className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 rounded-xl group"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="luxury-card bg-card/80 backdrop-blur-sm p-8 text-center border border-primary/20"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Explore Our Resources</h3>
                <p className="text-muted-foreground mb-6">Discover a comprehensive library of mental health resources, study guides, and wellness tools.</p>
                <Button
                  onClick={handleExploreResources}
                  variant="outline"
                  className="font-semibold px-8 py-3 rounded-xl border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Browse Resources
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <p className="text-sm text-gray-500 mb-4">
                Trusted by students from top institutions
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-gray-400">
                <span className="font-medium">IIT Delhi</span>
                <span className="font-medium">AIIMS</span>
                <span className="font-medium">DU</span>
                <span className="font-medium">JNU</span>
                <span className="font-medium">BHU</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
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

export default CTASection;