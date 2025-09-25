import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Target, 
  Eye, 
  Users, 
  Brain, 
  Shield,
  Globe,
  ArrowRight,
  Award
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      title: 'Student-First',
      description: 'Every feature designed with student needs and challenges in mind',
      icon: Heart,
      color: 'from-red-400 to-red-600'
    },
    {
      title: 'Privacy & Safety',
      description: 'Your data and conversations are always private and secure',
      icon: Shield,
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Inclusive Access',
      description: 'Mental health support for all, regardless of background or language',
      icon: Globe,
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Evidence-Based',
      description: 'All our interventions are backed by scientific research',
      icon: Award,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-primary-light to-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Mitra
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to make mental health support accessible, stigma-free, and effective for students worldwide.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card p-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Empowering students with AI-driven psychological and academic assistance that adapts to their unique needs. We provide stigma-free, accessible mental health support that understands the challenges of student life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To make mental health support accessible, stigma-free, and student-first. We envision a future where every student has the tools and community they need to thrive both mentally and academically.
          </p>
        </motion.div>
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center glass-card p-12 bg-gradient-to-r from-primary-light/10 to-primary/10"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-primary-light to-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Join Our Mission
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Whether you're a student, educator, or mental health professional, there are many ways to contribute to our community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-hero flex items-center">
            Get Involved <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button className="btn-outline-hero">
            Contact Us
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;