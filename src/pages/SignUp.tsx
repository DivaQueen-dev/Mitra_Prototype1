import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, User, Shield, GraduationCap, UserCheck, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'admin'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Student fields
    trustedPersonName: '',
    trustedPersonContact: '',
    // Admin fields
    role: 'moderator' as 'super-admin' | 'moderator',
    institutionCode: '',
  });
  const [showTrustedPerson, setShowTrustedPerson] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp: studentSignUp, user } = useAuth();
  const { signUp: adminSignUp, admin } = useAdminAuth();
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

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (userType === 'student') {
        await studentSignUp(formData.name, formData.email, formData.password);
        toast({
          title: "Welcome to Mitra!",
          description: "Your account has been created successfully.",
        });
        navigate('/app/home');
      } else {
        await adminSignUp(formData.name, formData.email, formData.password, formData.role);
        toast({
          title: "Admin Account Created",
          description: "Welcome to the MITRA Admin Dashboard.",
        });
        navigate('/admin/overview');
      }
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">Join Mitra</h1>
          <p className="text-slate-600 text-lg font-medium">Create your account</p>
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
            <div className="text-xs opacity-80 mt-1">For mental wellness support</div>
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
            <div className="text-xs opacity-80 mt-1">For institution management</div>
          </button>
        </div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-2xl bg-white/70 border border-white/40 rounded-3xl shadow-2xl shadow-slate-900/10 p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="pl-12 h-12 bg-white/60 border-slate-200/50 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 placeholder:text-slate-400 shadow-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
                  className="pl-12 h-12 bg-white/60 border-slate-200/50 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 placeholder:text-slate-400 shadow-sm"
                  placeholder={userType === 'student' ? 'student@university.edu' : 'admin@institution.edu'}
                />
              </div>
            </div>

            {/* Admin-specific fields */}
            {userType === 'admin' && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="role" className="text-sm font-semibold text-slate-700 tracking-wide">
                    Role
                  </Label>
                  <Select value={formData.role} onValueChange={(value: 'super-admin' | 'moderator') => setFormData({...formData, role: value})}>
                    <SelectTrigger className="h-12 bg-white/60 border-slate-200/50 rounded-2xl">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="institutionCode" className="text-sm font-semibold text-slate-700 tracking-wide">
                    Institution Code
                  </Label>
                  <Input
                    id="institutionCode"
                    name="institutionCode"
                    type="text"
                    value={formData.institutionCode}
                    onChange={handleInputChange}
                    className="h-12 bg-white/60 border-slate-200/50 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 placeholder:text-slate-400 shadow-sm"
                    placeholder="Enter institution code"
                    required={userType === 'admin'}
                  />
                </div>
              </>
            )}

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700 tracking-wide">
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-12 pr-12 h-12 bg-white/60 border-slate-200/50 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 placeholder:text-slate-400 shadow-sm"
                  placeholder="Create a secure password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700 tracking-wide">
                Confirm Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-12 pr-12 h-12 bg-white/60 border-slate-200/50 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 placeholder:text-slate-400 shadow-sm"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Student Trusted Guardian Section */}
            {userType === 'student' && (
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
                        className="h-11 bg-white/60 border-slate-200/50 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
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
                        className="h-11 bg-white/60 border-slate-200/50 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        placeholder="Email or phone number"
                      />
                    </div>
                    
                    <div className="text-xs text-slate-500 bg-blue-50/50 p-3 rounded-lg">
                      This person will be contacted only in case of emergency or crisis situations.
                    </div>
                  </motion.div>
                )}
              </div>
            )}

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
                  Creating your account...
                </div>
              ) : (
                `Create ${userType === 'student' ? 'Student' : 'Admin'} Account`
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