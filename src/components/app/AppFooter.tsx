import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-light to-primary rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Mitra</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <Link to="/app/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Guidelines
            </a>
            <Link to="/app/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2025 Mitra. An open-source digital psychological intervention system for students.
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;