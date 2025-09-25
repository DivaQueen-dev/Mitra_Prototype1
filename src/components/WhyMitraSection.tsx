import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Brain, 
  Trophy, 
  Shield, 
  Heart,
  CheckCircle,
  X
} from 'lucide-react';

const WhyMitraSection = () => {
  const mitraFeatures = [
    {
      icon: Users,
      title: 'Student-First Design',
      description: 'Built specifically for students with institution integration',
      highlight: true
    },
    {
      icon: Globe,
      title: 'Regional Language Support',
      description: 'AI that understands local languages and student slang',
      highlight: true
    },
    {
      icon: Brain,
      title: 'Dual AI Personalities',
      description: 'Personal AI for wellness + Mentor AI for academics',
      highlight: true
    },
    {
      icon: Trophy,
      title: 'Gamification System',
      description: 'Streaks, XP, badges to keep you motivated',
      highlight: true
    },
    {
      icon: Shield,
      title: 'Privacy-First Architecture',
      description: 'Confidential booking & data encryption',
      highlight: true
    },
    {
      icon: Heart,
      title: 'Peer Support Community',
      description: 'Moderated by trained student volunteers',
      highlight: true
    }
  ];

  const competitors = [
    {
      feature: 'Institution Integration',
      mitra: true,
      others: false,
      description: 'Direct integration with college systems'
    },
    {
      feature: 'Regional Language AI',
      mitra: true,
      others: false,
      description: 'Understands local context and slang'
    },
    {
      feature: 'Dual AI System',
      mitra: true,
      others: false,
      description: 'Specialized AI for wellness & academics'
    },
    {
      feature: 'Student Volunteer Network',
      mitra: true,
      others: false,
      description: 'Peer support from trained volunteers'
    },
    {
      feature: 'Academic Planning Tools',
      mitra: true,
      others: true,
      description: 'Task management and study planning'
    },
    {
      feature: 'Mental Health Tracking',
      mitra: true,
      others: true,
      description: 'Mood tracking and wellness features'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why <span className="text-gradient">MITRA</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how MITRA stands apart from generic mental health apps with features designed specifically for students.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {mitraFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="luxury-card text-center"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="luxury-card overflow-hidden"
        >
          <div className="bg-gradient-primary p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">MITRA vs Other Apps</h3>
            <p className="text-white/90">Feature comparison with generic mental health platforms</p>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-2 font-semibold">Feature</th>
                    <th className="text-center py-4 px-2 font-semibold text-primary">MITRA</th>
                    <th className="text-center py-4 px-2 font-semibold text-muted-foreground">Other Apps</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-medium">{item.feature}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        {item.mitra ? (
                          <CheckCircle className="w-6 h-6 text-emerald mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-rose mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-2">
                        {item.others ? (
                          <CheckCircle className="w-6 h-6 text-emerald mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground mb-4">
            Experience the difference with MITRA's student-focused approach
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-primary">
            <Trophy className="w-4 h-4" />
            <span>Rated #1 by students across 50+ institutions</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMitraSection;