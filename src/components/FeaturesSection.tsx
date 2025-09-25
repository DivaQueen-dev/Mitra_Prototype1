import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Calendar, 
  BookOpen, 
  Users, 
  GraduationCap, 
  BarChart3, 
  Shield, 
  Heart 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Guided First-Aid Support',
      description: 'Multilingual AI buddy for slang, coping strategies, and offline nudges tailored for students.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Calendar,
      title: 'Confidential Booking System',
      description: 'Book sessions with counsellors or helplines, completely stigma-free and private.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: BookOpen,
      title: 'Psychoeducational Resource Hub',
      description: 'Videos, relaxation audio, and guides available in regional languages.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Users,
      title: 'Peer Support Platform',
      description: 'Moderated, anonymous peer-to-peer support from students who understand.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: GraduationCap,
      title: 'College & Student Groups',
      description: 'Connect with groups in your college or interest areas for community support.',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: BarChart3,
      title: 'Admin Dashboard',
      description: 'Anonymous trend analytics for institutions to enable early intervention.',
      color: 'bg-cyan-100 text-cyan-600',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Local storage with encryption - your data stays yours, always.',
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      icon: Heart,
      title: 'Student-Centered Design',
      description: 'Built for students with intuitive, modern interfaces that understand your needs.',
      color: 'bg-red-100 text-red-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="features" className="py-20 relative bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive{' '}
            <span className="text-gradient">Mental Health Support</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mitra offers a complete ecosystem of mental health tools designed specifically 
            for students, providing support that understands your unique challenges.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card group"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-105 transition-all duration-200`}>
                <feature.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-200">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to start your mental health journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of students who are already using Mitra to improve their well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero">
                Explore All Features
              </button>
              <button className="btn-outline-hero">
                Watch Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;