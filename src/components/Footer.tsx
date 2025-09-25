import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Github, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const footerLinks = {
    'About Mitra': [
      { name: 'Our Mission', href: '#mission' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Success Stories', href: '#stories' },
      { name: 'Research & Evidence', href: '#research' },
    ],
    'Support': [
      { name: 'Contact Us', href: '#contact' },
      { name: 'Help Center', href: '#help' },
      { name: 'Crisis Resources', href: '#crisis' },
      { name: 'Community Guidelines', href: '#guidelines' },
    ],
    'Resources': [
      { name: 'Mental Health Articles', href: '#articles' },
      { name: 'Guided Meditation', href: '#meditation' },
      { name: 'Academic Stress Help', href: '#academic' },
      { name: 'Crisis Helplines', href: '#helplines' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'Data Protection', href: '#data' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'support@mitra.org', href: 'mailto:support@mitra.org' },
    { icon: Phone, text: '+91-800-MITRA-1', href: 'tel:+918006487241' },
    { icon: MapPin, text: 'New Delhi, India', href: '#' },
  ];

  return (
    <footer className="relative bg-gray-50/80 backdrop-blur-lg border-t border-gray-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-light to-primary rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gradient">Mitra</span>
              </div>

              <p className="text-gray-600 leading-relaxed">
                An open-source digital psychological intervention system designed 
                specifically for students aged 15-25. Providing stigma-free, 
                accessible mental health support.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    <contact.icon className="w-4 h-4" />
                    <span className="text-sm">{contact.text}</span>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-white/80 backdrop-blur-lg rounded-lg flex items-center justify-center text-gray-600 hover:text-primary border border-white/20 hover:border-primary/20 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Crisis Support Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                In Crisis? Get Immediate Help
              </h3>
              <p className="text-red-600 text-sm">
                If you're having thoughts of self-harm, please reach out for help immediately.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                Crisis Helpline: 102
              </Button>
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Emergency Resources
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-sm text-gray-500 text-center md:text-left">
            © 2025 Mitra. An open-source digital psychological intervention system for students.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span>Made with ❤️ for students</span>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Open Source on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;