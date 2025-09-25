import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, User, Shield, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    trustedPersonName: '',
    trustedPersonContact: '',
  });
  const [showTrustedPerson, setShowTrustedPerson] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/app/home');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signUp(formData.name, formData.email, formData.password);
      toast({
        title: "Welcome to Mitra!",
        description: "Your account has been created successfully.",
      });
      navigate('/app/home');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-8">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/25"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">Join Mitra</h1>
          <p className="text-slate-600 text-lg font-medium">Your trusted companion for mental wellness</p>
        </div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-2xl bg-white/70 border border-white/40 rounded-3xl shadow-2xl shadow-slate-900/10 p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-semibold text-slate-700 tracking-wide">
                Full Name
              </Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-12 h-14 bg-white/60 border-slate-200/50 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 placeholder:text-slate-400 shadow-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700 tracking-wide">
                Email Address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-12 h-14 bg-white/60 border-slate-200/50 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 placeholder:text-slate-400 shadow-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700 tracking-wide">
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-12 h-14 bg-white/60 border-slate-200/50 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 placeholder:text-slate-400 shadow-sm"
                  placeholder="Create a secure password"
                />
              </div>
            </div>

            {/* Trusted Guardian Section */}
            <div className="pt-4 border-t border-slate-200/50">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">Trusted Guardian (Optional)</span>
              </div>
              
              <button
                type="button"
                onClick={() => setShowTrustedPerson(!showTrustedPerson)}
                className="w-full text-left p-4 bg-blue-50/50 border border-blue-200/50 rounded-xl hover:bg-blue-50/80 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-600">Add a trusted guardian for emergency support</span>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">
                    {showTrustedPerson ? 'Hide' : 'Add'}
                  </span>
                </div>
              </button>

              {showTrustedPerson && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="trustedPersonName" className="text-sm font-medium text-slate-600">
                      Guardian's Name
                    </Label>
                    <Input
                      id="trustedPersonName"
                      name="trustedPersonName"
                      type="text"
                      value={formData.trustedPersonName}
                      onChange={handleInputChange}
                      className="h-12 bg-white/60 border-slate-200/50 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Parent, guardian, or trusted adult"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="trustedPersonContact" className="text-sm font-medium text-slate-600">
                      Contact Information
                    </Label>
                    <Input
                      id="trustedPersonContact"
                      name="trustedPersonContact"
                      type="text"
                      value={formData.trustedPersonContact}
                      onChange={handleInputChange}
                      className="h-12 bg-white/60 border-slate-200/50 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Email or phone number"
                    />
                  </div>
                  
                  <div className="text-xs text-slate-500 bg-blue-50/50 p-3 rounded-lg">
                    This person will be contacted only in case of emergency or crisis situations.
                  </div>
                </motion.div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 text-white font-semibold text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating your account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="text-center mt-8">
            <p className="text-slate-600 font-medium">
              Already have an account?
              <Link
                to="/signin"
                className="ml-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <Link 
            to="/" 
            className="text-slate-500 hover:text-blue-600 transition-colors font-medium inline-flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;