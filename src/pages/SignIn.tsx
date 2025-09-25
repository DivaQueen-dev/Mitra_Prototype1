import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, GraduationCap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'admin'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signIn: studentSignIn, user } = useAuth();
  const { signIn: adminSignIn, admin } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/app/home');
    }
    if (admin) {
      navigate('/admin/overview');
    }
  }, [user, admin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (userType === 'student') {
        await studentSignIn(formData.email, formData.password);
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in to Mitra.",
        });
        navigate('/app/home');
      } else {
        await adminSignIn(formData.email, formData.password);
        toast({
          title: "Admin Access Granted",
          description: "Welcome to the MITRA Admin Dashboard.",
        });
        navigate('/admin/overview');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
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

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "Password reset link has been sent to your email.",
    });
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
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/25"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">Welcome back!</h1>
          <p className="text-slate-600 text-lg font-medium">Sign in to your account</p>
        </div>

        {/* User Type Selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setUserType('student')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-300 ${
              userType === 'student'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-500/25 scale-[1.02]'
                : 'bg-white/70 backdrop-blur-sm text-slate-600 border-slate-200 hover:border-blue-300'
            }`}
          >
            <GraduationCap className="w-6 h-6 mx-auto mb-2" />
            <div className="font-semibold">Student</div>
            <div className="text-xs opacity-80 mt-1">Access your wellness dashboard</div>
          </button>
          <button
            onClick={() => setUserType('admin')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-300 ${
              userType === 'admin'
                ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white border-transparent shadow-lg shadow-emerald-500/25 scale-[1.02]'
                : 'bg-white/70 backdrop-blur-sm text-slate-600 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <Shield className="w-6 h-6 mx-auto mb-2" />
            <div className="font-semibold">Admin</div>
            <div className="text-xs opacity-80 mt-1">Manage institution dashboard</div>
          </button>
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
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700 tracking-wide">
                {userType === 'student' ? 'Email Address' : 'Admin Email'}
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
                  placeholder={userType === 'student' ? 'student@university.edu' : 'admin@institution.edu'}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700 tracking-wide">
                  Password
                </Label>
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
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
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full h-14 font-semibold text-lg rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                userType === 'student'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 shadow-blue-500/25 hover:shadow-blue-500/40'
                  : 'bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-700 hover:from-emerald-700 hover:via-blue-700 hover:to-purple-800 shadow-emerald-500/25 hover:shadow-emerald-500/40'
              } text-white`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing you in...
                </div>
              ) : (
                `Sign In as ${userType === 'student' ? 'Student' : 'Admin'}`
              )}
            </Button>
          </form>

          <div className="text-center mt-8">
            <p className="text-slate-600 font-medium">
              Don't have an account?
              <Link
                to="/signup"
                className="ml-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign up
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

export default SignIn;