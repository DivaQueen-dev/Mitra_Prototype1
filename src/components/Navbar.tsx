import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, signOut } = useAuth();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Why Mitra', href: '#why-mitra' },
    { name: 'Resources', href: '#resources' },
    { name: 'Community', href: '#community' },
  ];

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    if (mode === 'signin') {
      window.location.href = '/signin';
    } else {
      window.location.href = '/signup';
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/30 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <Logo size="md" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* User Section */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-card/20 backdrop-blur-lg rounded-full px-4 py-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {user.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleAuthClick('signin')}
                    className="text-foreground hover:text-primary"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleAuthClick('signup')}
                    className="btn-luxury"
                  >
                    Get Started
                  </Button>
                  <Link to="/admin/signin">
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2 text-xs"
                    >
                      Admin
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-lg rounded-2xl mt-2 p-4 border border-gray-200/30 shadow-lg"
            >
              <div className="space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left py-2 px-3 text-gray-700 hover:text-primary hover:bg-white/50 rounded-lg transition-all duration-200"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-3 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 py-2 px-3">
                        <User className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-gray-700">
                          {user.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={signOut}
                        className="w-full justify-start text-gray-600 hover:text-primary"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleAuthClick('signin')}
                        className="w-full justify-start text-gray-700 hover:text-primary"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => handleAuthClick('signup')}
                        className="w-full btn-luxury"
                      >
                        Get Started
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Navbar;