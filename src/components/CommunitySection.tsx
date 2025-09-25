import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Heart, Shield, BookOpen, Smile } from 'lucide-react';
import communityImage from '@/assets/community-image.jpg';

const CommunitySection = () => {
  const communityFeatures = [
    {
      icon: MessageSquare,
      title: 'Peer-to-peer discussion boards',
      description: 'Share experiences and get support from fellow students',
    },
    {
      icon: Users,
      title: 'College groups',
      description: 'Connect with students from your institution',
    },
    {
      icon: Heart,
      title: 'Anonymous help sharing',
      description: 'Students helping students based on lived experiences',
    },
  ];

  const stats = [
    { number: '24/7', label: 'Peer Support', subtitle: 'Always Available' },
    { number: '100%', label: 'Anonymous', subtitle: 'Stigma-Free Space' },
    { number: '50+', label: 'Languages', subtitle: 'Global Support' },
  ];

  return (
    <section id="community" className="py-20 relative bg-gradient-to-b from-blue-50/30 to-white">
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
            Built for{' '}
            <span className="text-gradient">Students, By Students</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Student life brings unique challenges. Mitra helps you navigate exams, stress, 
            and life transitions — together with peers who truly understand your journey.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass-card p-6">
              <img
                src={communityImage}
                alt="Students supporting each other in community"
                className="w-full h-auto rounded-2xl"
              />
            </div>
            
            {/* Floating Community Stats */}
            <motion.div
              className="absolute -top-4 -right-4 glass-card p-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-primary" />
                <div>
                  <div className="text-lg font-bold text-primary">5K+</div>
                  <div className="text-xs text-gray-600">Active Students</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 glass-card p-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-green-500" />
                <div>
                  <div className="text-lg font-bold text-green-600">100%</div>
                  <div className="text-xs text-gray-600">Anonymous</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6">
                A Safe Space for{' '}
                <span className="text-gradient">Student Voices</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Mental health challenges peak during student years. Mitra creates a 
                supportive ecosystem where students can connect, share, and grow together 
                in a judgment-free environment.
              </p>
            </div>

            {/* Community Features */}
            <div className="space-y-6">
              {communityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 glass-card"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card p-8"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Why This Age Group Needs Special Support
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.subtitle}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-8 pt-8 border-t border-white/20"
          >
            <p className="text-gray-600 max-w-2xl mx-auto">
              Academic pressure, career uncertainty, relationship challenges, and identity formation 
              make 15-25 the most mentally demanding years. That's why peer support matters.
            </p>
          </motion.div>
        </motion.div>

        {/* Community CTA - Premium Glassmorphic Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="relative max-w-2xl mx-auto">
            {/* Glassmorphic Card with Premium Styling */}
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-violet/20 to-emerald/20 p-[1px]">
                <div className="h-full w-full rounded-2xl bg-card/95 backdrop-blur-lg" />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-violet flex items-center justify-center shadow-lg">
                  <Smile className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4 text-gradient">
                  Join Our Student Community Today
                </h3>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Connect with thousands of students who support each other through challenges and celebrate victories together.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-luxury px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <span className="flex items-center">
                      Join Community
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </span>
                  </button>
                  
                  <button className="border-2 border-primary/30 text-primary bg-card/20 backdrop-blur-lg px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg">
                    Browse Groups
                  </button>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-emerald to-violet opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-gradient-to-r from-violet to-primary opacity-30"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;