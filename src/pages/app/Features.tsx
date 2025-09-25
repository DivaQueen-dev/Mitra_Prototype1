import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Calendar, 
  BookOpen, 
  Users, 
  School, 
  Shield, 
  Globe, 
  BarChart3,
  X,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Features: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const features = [
    {
      title: 'Personal AI Assistant 🤖',
      description: 'Friendly mental health companion available 24/7',
      icon: Bot,
      color: 'from-blue-400 to-blue-600',
      details: [
        'Available 24/7 for immediate support',
        'Understands slang and natural language',
        'Personalized coping strategies',
        'Crisis intervention capabilities',
        'Multilingual support',
        'Evidence-based interventions'
      ],
      benefits: 'Get instant mental health support in a language that feels natural to you.'
    },
    {
      title: 'Mentor AI 📚',
      description: 'Academic guidance and study support system',
      icon: GraduationCap,
      color: 'from-indigo-400 to-indigo-600',
      details: [
        'Academic task management',
        'Study schedule optimization',
        'Doubt clarification support',
        'Progress tracking',
        'Study technique recommendations',
        'Exam preparation guidance'
      ],
      benefits: 'Get personalized academic guidance to improve your learning experience.'
    },
    {
      title: 'Confidential Booking System',
      description: 'Book sessions with counsellors or helplines, stigma-free.',
      icon: Calendar,
      color: 'from-green-400 to-green-600',
      details: [
        'Anonymous booking options available',
        'Connect with licensed mental health professionals',
        'Flexible scheduling around your classes',
        'In-person or virtual session options',
        'Emergency helpline integration',
        'No judgment, complete confidentiality'
      ],
      benefits: 'Access professional help without fear of stigma or judgment.'
    },
    {
      title: 'Psychoeducational Resource Hub',
      description: 'Videos, relaxation audio, guides in regional languages.',
      icon: BookOpen,
      color: 'from-purple-400 to-purple-600',
      details: [
        'Curated mental health educational content',
        'Guided meditation and relaxation audio',
        'Interactive self-help tools and worksheets',
        'Content available in multiple regional languages',
        'Evidence-based therapeutic techniques',
        'Regular updates with new resources'
      ],
      benefits: 'Learn about mental health and develop coping skills at your own pace.'
    },
    {
      title: 'Peer Support Platform',
      description: 'Moderated, anonymous peer-to-peer support.',
      icon: Users,
      color: 'from-pink-400 to-pink-600',
      details: [
        'Connect with students facing similar challenges',
        'Anonymous sharing and support options',
        'Moderated discussions for safety',
        'Peer mentorship programs',
        'Success story sharing',
        'Crisis support escalation protocols'
      ],
      benefits: 'Find comfort in knowing you\'re not alone in your struggles.'
    },
    {
      title: 'College & Student Groups',
      description: 'Connect with groups in your college or interest areas.',
      icon: School,
      color: 'from-yellow-400 to-yellow-600',
      details: [
        'Institution-specific support groups',
        'Academic stress management groups',
        'Interest-based wellness communities',
        'Study buddy matching',
        'Campus event integration',
        'Local resource recommendations'
      ],
      benefits: 'Build meaningful connections within your academic community.'
    },
    {
      title: 'Admin Dashboard',
      description: 'Anonymous trend analytics for early intervention.',
      icon: BarChart3,
      color: 'from-indigo-400 to-indigo-600',
      details: [
        'Population-level mental health insights',
        'Early warning system for crisis periods',
        'Resource allocation optimization',
        'Anonymous usage analytics',
        'Intervention effectiveness tracking',
        'Institutional reporting capabilities'
      ],
      benefits: 'Help institutions provide better mental health support for all students.'
    },
    {
      title: 'Privacy First',
      description: 'Local storage + encryption; data stays yours.',
      icon: Shield,
      color: 'from-red-400 to-red-600',
      details: [
        'End-to-end encryption for all communications',
        'Local data storage options',
        'Minimal data collection policy',
        'User-controlled data sharing',
        'GDPR and privacy law compliant',
        'Regular security audits and updates'
      ],
      benefits: 'Your mental health journey remains completely private and secure.'
    },
    {
      title: 'Multilingual Support',
      description: 'Works in any language and understands student slang.',
      icon: Globe,
      color: 'from-teal-400 to-teal-600',
      details: [
        'Support for 15+ regional languages',
        'Youth slang and colloquial understanding',
        'Cultural context awareness',
        'Localized mental health resources',
        'Native language counselor matching',
        'Cultural competency in interventions'
      ],
      benefits: 'Get support in the language you think and feel in most naturally.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Mitra Features
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover how Mitra provides comprehensive, student-focused mental health support through innovative technology and human connection.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="group cursor-pointer"
            onClick={() => setSelectedFeature(index)}
          >
            <div className="feature-card group-hover:shadow-2xl">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {feature.description}
              </p>
              <div className="flex items-center text-primary font-medium">
                Learn more <ChevronRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {selectedFeature !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-2xl bg-card rounded-3xl p-8 border border-border shadow-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>

              {selectedFeature !== null && (
                <div>
                  <div className={`w-20 h-20 bg-gradient-to-r ${features[selectedFeature].color} rounded-2xl flex items-center justify-center mb-6`}>
                    {React.createElement(features[selectedFeature].icon, { className: "w-10 h-10 text-white" })}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {features[selectedFeature].title}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {features[selectedFeature].benefits}
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3 mb-6">
                    {features[selectedFeature].details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full btn-luxury"
                    onClick={() => setSelectedFeature(null)}
                  >
                    Got it!
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Features;